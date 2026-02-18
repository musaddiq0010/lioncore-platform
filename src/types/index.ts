import { UserRole, UserStatus } from '@prisma/client';

// Auth Types
export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  profile?: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

// Supporter Types
export interface SupporterData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  ward: string;
  lga: string;
  state: string;
  topIssues: string[];
  volunteerInterest: string[];
  consentGiven: boolean;
  referralCode?: string;
}

export interface SupporterProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  ward: string;
  lga: string;
  engagementScore: number;
  referralCode: string;
  status: string;
  tags: string[];
  createdAt: string;
}

// Ward Types
export interface WardData {
  name: string;
  lga: string;
  totalSupporters: number;
  activeSupporters: number;
  engagementScore: number;
}

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: {
    name: string;
    avatar?: string;
  };
  status: string;
  publishedAt?: string;
  tags: string[];
  viewCount: number;
  createdAt: string;
}

// Event Types
export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate?: string;
  ward?: string;
  lga?: string;
  maxAttendees?: number;
  rsvpCount: number;
  status: string;
  createdAt: string;
}

export interface EventRSVP {
  id: string;
  eventId: string;
  status: 'going' | 'maybe' | 'not_going' | 'attended';
  guests: number;
  notes?: string;
}

// Issue Report Types
export interface IssueReport {
  id: string;
  title: string;
  description: string;
  category: string;
  ward: string;
  lga: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string;
}

// Analytics Types
export interface DashboardStats {
  totalSupporters: number;
  activeSupporters: number;
  weeklyGrowth: number;
  totalEvents: number;
  upcomingEvents: number;
  totalBlogPosts: number;
  totalIssueReports: number;
}

export interface WardStats {
  ward: string;
  count: number;
  percentage: number;
}

export interface DailyStat {
  date: string;
  newRegistrations: number;
  activeLogins: number;
  newReferrals: number;
  blogViews: number;
  eventRSVPs: number;
}

// Feature Flags
export interface FeatureFlags {
  enablePhoneLogin: boolean;
  enableMultiCandidate: boolean;
  enableDebate: boolean;
  enableDonations: boolean;
}

// Campaign Settings
export interface CampaignSettings {
  bannerText: string;
  videoUrl: string;
  electionDate: string;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Activity Types for Gamification
export interface Activity {
  id: string;
  type: string;
  points: number;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface EngagementMetrics {
  totalPoints: number;
  rank: number;
  activitiesThisWeek: number;
  referralCount: number;
  eventAttendance: number;
}

// Form Types
export interface MembershipFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  ward: string;
  lga: string;
  topIssues: string[];
  volunteerInterest: string[];
  consentGiven: boolean;
}

// UI Types
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  roles?: UserRole[];
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}
