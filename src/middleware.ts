import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken, canAccess } from './lib/auth/jwt';

// Public routes that don't require authentication
const publicRoutes = [
  '/',
  '/join',
  '/blog',
  '/events',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/login',
  '/register',
  '/verify-email',
  '/forgot-password',
  '/reset-password',
];

// Routes that require authentication
const protectedRoutes = {
  '/portal': ['SUPPORTER', 'WARD_COORDINATOR', 'LGA_ADMIN', 'MEDIA_ADMIN', 'SUPER_ADMIN'],
  '/dashboard': ['WARD_COORDINATOR', 'LGA_ADMIN', 'MEDIA_ADMIN', 'SUPER_ADMIN'],
};

// Admin-only routes
const adminRoutes = ['/dashboard/settings'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if it's a public route
  if (publicRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`))) {
    return NextResponse.next();
  }

  // Check if it's an API route
  if (pathname.startsWith('/api/')) {
    // Add security headers for API routes
    const response = NextResponse.next();
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    return response;
  }

  // Get token from cookie
  const token = request.cookies.get('token')?.value;

  // If no token, redirect to login
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Verify token
    const payload = verifyToken(token);

    // Check route-specific permissions
    for (const [route, allowedRoles] of Object.entries(protectedRoutes)) {
      if (pathname.startsWith(route)) {
        if (!canAccess(payload.role, allowedRoles)) {
          // User doesn't have permission
          return NextResponse.redirect(new URL('/unauthorized', request.url));
        }
      }
    }

    // Check admin-only routes
    if (adminRoutes.some(route => pathname.startsWith(route))) {
      if (payload.role !== 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    }

    // Add user info to headers for API routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.userId);
    requestHeaders.set('x-user-role', payload.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch {
    // Invalid token, redirect to login
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token');
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
