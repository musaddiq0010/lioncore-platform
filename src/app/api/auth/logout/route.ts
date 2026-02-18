import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { clearAuthCookie } from '@/lib/auth/jwt';

export async function POST(request: NextRequest) {
  try {
    // Get token from cookie
    const token = request.cookies.get('token')?.value;

    if (token) {
      // Delete session
      await prisma.session.deleteMany({
        where: { token },
      });
    }

    // Clear cookie
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });

    response.headers.set('Set-Cookie', clearAuthCookie());

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'An error occurred during logout' },
      { status: 500 }
    );
  }
}
