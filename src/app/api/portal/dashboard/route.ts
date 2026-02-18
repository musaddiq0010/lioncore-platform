import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { verifyToken } from '@/lib/auth/jwt';

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

    const payload = verifyToken(token);

    // Get user with supporter info
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: { supporter: true },
    });

    if (!user || !user.supporter) {
      return NextResponse.json(
        { error: 'Supporter not found' },
        { status: 404 }
      );
    }

    const supporterId = user.supporter.id;

    // Get stats in parallel
    const [
      engagementScore,
      rank,
      totalSupporters,
      wardSupporters,
      eventsAttended,
      referralCount,
      activities,
    ] = await Promise.all([
      // Engagement score
      prisma.supporter.findUnique({
        where: { id: supporterId },
        select: { engagementScore: true },
      }).then(s => s?.engagementScore || 0),

      // Rank (number of supporters with higher score + 1)
      prisma.supporter.count({
        where: {
          engagementScore: {
            gt: user.supporter?.engagementScore || 0,
          },
        },
      }).then(count => count + 1),

      // Total supporters
      prisma.supporter.count(),

      // Ward supporters
      prisma.supporter.count({
        where: { ward: user.supporter?.ward },
      }),

      // Events attended
      prisma.eventRSVP.count({
        where: {
          userId: user.id,
          status: 'attended',
        },
      }),

      // Referral count
      prisma.referral.count({
        where: { referrerId: user.id },
      }),

      // Recent activities
      prisma.activity.findMany({
        where: { supporterId },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
    ]);

    // Calculate next milestone
    const milestones = [100, 200, 500, 1000, 2000, 5000];
    const nextMilestone = milestones.find(m => m > engagementScore) || 10000;

    return NextResponse.json({
      engagementScore,
      rank,
      totalSupporters,
      wardSupporters,
      eventsAttended,
      referralCount,
      nextMilestone,
      activities: activities.map(a => ({
        id: a.id,
        type: a.type,
        points: a.points,
        createdAt: a.createdAt,
        metadata: a.metadata,
      })),
    });
  } catch (error) {
    console.error('Portal dashboard error:', error);
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
}
