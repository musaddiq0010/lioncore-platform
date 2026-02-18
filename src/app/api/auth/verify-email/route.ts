import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { sendWelcomeEmail } from '@/lib/utils/email';
import { verifyEmailSchema } from '@/lib/utils/validation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const result = verifyEmailSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 400 }
      );
    }

    const { token } = result.data;

    // Find user with this verification token
    const user = await prisma.user.findFirst({
      where: { verificationToken: token },
      include: { profile: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      );
    }

    // Update user as verified
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        emailVerifiedAt: new Date(),
        verificationToken: null,
        status: 'ACTIVE',
      },
    });

    // Send welcome email
    try {
      if (user.profile) {
        await sendWelcomeEmail(
          user.email,
          `${user.profile.firstName} ${user.profile.lastName}`
        );
      }
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully. You can now log in.',
    });
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'An error occurred during email verification' },
      { status: 500 }
    );
  }
}

// Resend verification email
export async function PUT(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      // Don't reveal if user exists
      return NextResponse.json({
        success: true,
        message: 'If an account exists, a verification email has been sent.',
      });
    }

    if (user.emailVerified) {
      return NextResponse.json({
        success: true,
        message: 'Your email is already verified. You can log in.',
      });
    }

    // Generate new verification token
    const { generateVerificationToken } = await import('@/lib/auth/password');
    const newToken = generateVerificationToken();

    await prisma.user.update({
      where: { id: user.id },
      data: { verificationToken: newToken },
    });

    // Send verification email
    try {
      const { sendVerificationEmail } = await import('@/lib/utils/email');
      await sendVerificationEmail(email, newToken);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Verification email sent. Please check your inbox.',
    });
  } catch (error) {
    console.error('Resend verification error:', error);
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
}
