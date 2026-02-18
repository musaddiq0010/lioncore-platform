import { NextRequest, NextResponse } from 'next/server';
import { prisma, updateDailyStats } from '@/lib/db/prisma';
import { membershipSchema } from '@/lib/utils/validation';
import { generateReferralCode } from '@/lib/auth/password';

// Create a new supporter (public endpoint)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const result = membershipSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;

    // Check for duplicate email
    const existingSupporter = await prisma.supporter.findUnique({
      where: { email: data.email.toLowerCase() },
    });

    if (existingSupporter) {
      return NextResponse.json(
        { error: 'You are already registered as a supporter' },
        { status: 409 }
      );
    }

    // Check for duplicate phone
    const existingPhone = await prisma.supporter.findUnique({
      where: { phone: data.phone },
    });

    if (existingPhone) {
      return NextResponse.json(
        { error: 'This phone number is already registered' },
        { status: 409 }
      );
    }

    // Generate unique referral code
    let referralCode = generateReferralCode();
    let codeExists = await prisma.supporter.findUnique({
      where: { referralCode },
    });
    
    // Ensure unique referral code
    while (codeExists) {
      referralCode = generateReferralCode();
      codeExists = await prisma.supporter.findUnique({
        where: { referralCode },
      });
    }

    // Handle referral
    let referredBy = null;
    if (data.referralCode) {
      const referrer = await prisma.supporter.findUnique({
        where: { referralCode: data.referralCode },
      });
      if (referrer) {
        referredBy = referrer.id;
        // Award points to referrer
        await prisma.supporter.update({
          where: { id: referrer.id },
          data: {
            engagementScore: { increment: 50 },
          },
        });
      }
    }

    // Create supporter
    const supporter = await prisma.supporter.create({
      data: {
        fullName: data.fullName,
        email: data.email.toLowerCase(),
        phone: data.phone,
        address: data.address,
        ward: data.ward,
        lga: data.lga,
        state: data.state,
        topIssues: data.topIssues,
        volunteerInterest: data.volunteerInterest || [],
        consentGiven: data.consentGiven,
        referralCode,
        referredBy,
        status: 'active',
        engagementScore: 10, // Initial points for joining
      },
    });

    // Update ward stats
    await prisma.wardStats.upsert({
      where: { ward: data.ward },
      update: {
        totalSupporters: { increment: 1 },
        activeSupporters: { increment: 1 },
      },
      create: {
        ward: data.ward,
        lga: data.lga,
        totalSupporters: 1,
        activeSupporters: 1,
      },
    });

    // Update daily stats
    await updateDailyStats(new Date(), {
      newRegistrations: { increment: 1 },
    });

    return NextResponse.json({
      success: true,
      message: 'Welcome to the movement! Your registration is complete.',
      supporter: {
        id: supporter.id,
        fullName: supporter.fullName,
        referralCode: supporter.referralCode,
      },
    });
  } catch (error) {
    console.error('Create supporter error:', error);
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}

// Get supporters (admin only)
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { verifyToken } = await import('@/lib/auth/jwt');
    const payload = verifyToken(token);

    // Check authorization
    const allowedRoles = ['SUPER_ADMIN', 'LGA_ADMIN', 'WARD_COORDINATOR'];
    if (!allowedRoles.includes(payload.role)) {
      return NextResponse.json(
        { error: 'Not authorized' },
        { status: 403 }
      );
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const ward = searchParams.get('ward') || '';
    const status = searchParams.get('status') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Build where clause
    const where: any = {};
    
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
      ];
    }

    if (ward) {
      where.ward = ward;
    }

    if (status) {
      where.status = status;
    }

    // Ward coordinators can only see their ward
    if (payload.role === 'WARD_COORDINATOR') {
      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        include: { supporter: true },
      });
      if (user?.supporter?.ward) {
        where.ward = user.supporter.ward;
      }
    }

    // Get supporters
    const [supporters, total] = await Promise.all([
      prisma.supporter.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          activities: {
            orderBy: { createdAt: 'desc' },
            take: 5,
          },
        },
      }),
      prisma.supporter.count({ where }),
    ]);

    return NextResponse.json({
      supporters,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Get supporters error:', error);
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
}
