import jwt from 'jsonwebtoken';
import { JWTPayload, AuthUser } from '@/types';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '30d';

export function generateToken(user: AuthUser): string {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export function generateRefreshToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
  });
}

export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, JWT_SECRET) as JWTPayload;
}

export function decodeToken(token: string): JWTPayload | null {
  try {
    return jwt.decode(token) as JWTPayload;
  } catch {
    return null;
  }
}

export function setAuthCookie(token: string): string {
  const isProduction = process.env.NODE_ENV === 'production';
  return `token=${token}; HttpOnly; Secure=${isProduction}; SameSite=Strict; Path=/; Max-Age=${7 * 24 * 60 * 60}`;
}

export function clearAuthCookie(): string {
  return 'token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0';
}

// Role-based access control
export const ROLE_HIERARCHY: Record<string, number> = {
  SUPPORTER: 1,
  WARD_COORDINATOR: 2,
  MEDIA_ADMIN: 3,
  LGA_ADMIN: 4,
  SUPER_ADMIN: 5,
};

export function hasRequiredRole(userRole: string, requiredRole: string): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

export function canAccess(userRole: string, allowedRoles: string[]): boolean {
  return allowedRoles.some(role => hasRequiredRole(userRole, role));
}

// Permission checks
export const PERMISSIONS = {
  // User management
  VIEW_USERS: ['SUPER_ADMIN', 'LGA_ADMIN'],
  CREATE_USER: ['SUPER_ADMIN', 'LGA_ADMIN'],
  EDIT_USER: ['SUPER_ADMIN', 'LGA_ADMIN'],
  DELETE_USER: ['SUPER_ADMIN'],
  
  // Supporter management
  VIEW_SUPPORTERS: ['SUPER_ADMIN', 'LGA_ADMIN', 'WARD_COORDINATOR'],
  EXPORT_SUPPORTERS: ['SUPER_ADMIN', 'LGA_ADMIN'],
  TAG_SUPPORTERS: ['SUPER_ADMIN', 'LGA_ADMIN', 'WARD_COORDINATOR'],
  
  // Blog management
  VIEW_BLOG: ['SUPER_ADMIN', 'LGA_ADMIN', 'MEDIA_ADMIN'],
  CREATE_BLOG: ['SUPER_ADMIN', 'LGA_ADMIN', 'MEDIA_ADMIN'],
  EDIT_BLOG: ['SUPER_ADMIN', 'LGA_ADMIN', 'MEDIA_ADMIN'],
  DELETE_BLOG: ['SUPER_ADMIN', 'MEDIA_ADMIN'],
  
  // Event management
  VIEW_EVENTS: ['SUPER_ADMIN', 'LGA_ADMIN', 'WARD_COORDINATOR'],
  CREATE_EVENT: ['SUPER_ADMIN', 'LGA_ADMIN'],
  EDIT_EVENT: ['SUPER_ADMIN', 'LGA_ADMIN'],
  DELETE_EVENT: ['SUPER_ADMIN'],
  
  // Analytics
  VIEW_ANALYTICS: ['SUPER_ADMIN', 'LGA_ADMIN'],
  VIEW_ALL_ANALYTICS: ['SUPER_ADMIN'],
  
  // Settings
  VIEW_SETTINGS: ['SUPER_ADMIN'],
  EDIT_SETTINGS: ['SUPER_ADMIN'],
  MANAGE_FEATURE_FLAGS: ['SUPER_ADMIN'],
} as const;

export function hasPermission(
  userRole: string,
  permission: keyof typeof PERMISSIONS
): boolean {
  const allowedRoles = PERMISSIONS[permission];
  return allowedRoles.includes(userRole as any);
}
