import { z } from 'zod';

// Auth validation
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
      'Password must contain at least one special character'
    ),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  phone: z.string().optional(),
});

export const verifyEmailSchema = z.object({
  token: z.string().min(1, 'Verification token is required'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
      'Password must contain at least one special character'
    ),
});

// Supporter/Membership validation
export const membershipSchema = z.object({
  fullName: z.string().min(3, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(10, 'Please enter a valid phone number')
    .regex(/^[0-9+\-\s()]*$/, 'Please enter a valid phone number'),
  address: z.string().min(5, 'Address is required'),
  ward: z.string().min(1, 'Please select your ward'),
  lga: z.string().default('Estako West'),
  state: z.string().default('Edo'),
  topIssues: z.array(z.string()).min(1, 'Please select at least one issue'),
  volunteerInterest: z.array(z.string()).optional(),
  consentGiven: z.literal(true, {
    errorMap: () => ({ message: 'You must consent to join the campaign' }),
  }),
  referralCode: z.string().optional(),
});

// Blog post validation
export const blogPostSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z
    .string()
    .min(3, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  excerpt: z.string().max(300, 'Excerpt must be less than 300 characters').optional(),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  featuredImage: z.string().url().optional().or(z.literal('')),
  tags: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published', 'scheduled']),
  scheduledAt: z.string().datetime().optional().or(z.literal('')),
});

// Event validation
export const eventSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  location: z.string().min(5, 'Location is required'),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional().or(z.literal('')),
  ward: z.string().optional(),
  lga: z.string().optional(),
  maxAttendees: z.number().int().positive().optional(),
});

export const eventRSVPSchema = z.object({
  eventId: z.string(),
  status: z.enum(['going', 'maybe', 'not_going']),
  guests: z.number().int().min(0).max(5),
  notes: z.string().max(500).optional(),
});

// Issue report validation
export const issueReportSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.string().min(1, 'Please select a category'),
  ward: z.string().min(1, 'Please select your ward'),
  lga: z.string().default('Estako West'),
});

// Profile update validation
export const profileUpdateSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  phone: z.string().optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
});

// Campaign settings validation
export const campaignSettingsSchema = z.object({
  bannerText: z.string().max(200, 'Banner text must be less than 200 characters'),
  videoUrl: z.string().url().optional().or(z.literal('')),
  electionDate: z.string().datetime(),
});

// Feature flags validation
export const featureFlagsSchema = z.object({
  enablePhoneLogin: z.boolean(),
  enableMultiCandidate: z.boolean(),
  enableDebate: z.boolean(),
  enableDonations: z.boolean(),
});

// Query parameters validation
export const paginationSchema = z.object({
  page: z.string().transform(Number).default('1'),
  limit: z.string().transform(Number).default('10'),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().optional(),
});

export const supporterFilterSchema = z.object({
  ward: z.string().optional(),
  status: z.enum(['active', 'inactive', 'pending']).optional(),
  minEngagement: z.string().transform(Number).optional(),
  maxEngagement: z.string().transform(Number).optional(),
  tags: z.string().transform((val) => val.split(',')).optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
});

// Type exports
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type MembershipInput = z.infer<typeof membershipSchema>;
export type BlogPostInput = z.infer<typeof blogPostSchema>;
export type EventInput = z.infer<typeof eventSchema>;
export type EventRSVPInput = z.infer<typeof eventRSVPSchema>;
export type IssueReportInput = z.infer<typeof issueReportSchema>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
export type CampaignSettingsInput = z.infer<typeof campaignSettingsSchema>;
export type FeatureFlagsInput = z.infer<typeof featureFlagsSchema>;
