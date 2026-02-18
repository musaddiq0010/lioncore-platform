# LionCore Platform - Project Summary

## Overview
A comprehensive, production-ready political campaign web application built for Hon. (T-DR) Abdulazeez Izuafa (APC, Estako West LGA, Edo State).

**Tagline**: "The Fearless Lion: Vision, Courage, Progress"

---

## Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4
- **UI Components**: shadcn/ui + Radix UI
- **Database**: PostgreSQL with Prisma ORM 5.16
- **Authentication**: JWT with bcryptjs
- **Charts**: Recharts
- **Animation**: Framer Motion
- **PWA**: next-pwa

---

## Application Structure

### 1. Public Website (`/`)
**Pages & Components:**
- **Hero Section**: Full-screen hero with campaign messaging, stats, and CTA buttons
- **Vision Section**: 6-point vision grid with animated cards
- **Achievements Section**: 6 achievement cards with metrics
- **Countdown Section**: Election countdown timer with social share buttons
- **Blog Section**: Latest blog posts with featured images
- **Join Section**: Call-to-action with benefits and quick stats

**Features:**
- Responsive design (mobile-first)
- Dark/Light mode toggle
- PWA-enabled with manifest.json
- Social sharing (WhatsApp & Facebook)
- Animated UI with Framer Motion

### 2. Membership Form (`/join`)
**4-Step Multi-step Form:**
1. Personal Information (name, email, phone)
2. Location Details (address, ward, LGA)
3. Top Issues (multi-select)
4. Volunteer Interest & Consent

**Validation:**
- Zod schema validation
- Duplicate email/phone detection
- Required field validation
- Consent checkbox validation

### 3. Authentication System
**Routes:**
- `/login` - Email + Password login
- `/register` - User registration with email verification
- `/verify-email` - Email verification page

**Security:**
- bcrypt password hashing (12 rounds)
- JWT tokens with 7-day expiry
- Email verification required
- Role-based access control
- Session management

### 4. Supporter Portal (`/portal`)
**Layout:**
- Sidebar navigation
- User profile dropdown
- Theme toggle

**Dashboard Features:**
- Engagement score with progress bar
- Rank among supporters
- Ward statistics
- Events attended counter
- Referral count
- Recent activity feed
- Quick action buttons

### 5. Admin Dashboard (`/dashboard`)
**Layout:**
- Sidebar with role-based navigation
- User info header
- Mobile-responsive

**Overview Page:**
- 4 stat cards (Total/Active Supporters, Events, Issues)
- Supporters by Ward bar chart
- Daily registrations line chart
- Top issues pie chart
- Recent blog posts list

**Management Sections:**
- Supporters (CRUD, filtering, CSV export)
- Blog CMS (create, edit, schedule)
- Events (create, assign wards, RSVP tracking)
- Analytics (detailed metrics)
- Settings (feature flags, campaign config)

---

## Database Schema (Prisma)

### Core Models
1. **User** - Authentication & roles
2. **Profile** - User profile information
3. **Session** - JWT session tracking
4. **Supporter** - Campaign members
5. **Referral** - Referral system
6. **Activity** - Gamification tracking
7. **BlogPost** - CMS content
8. **Event** - Campaign events
9. **EventRSVP** - Event attendance
10. **IssueReport** - Community issues
11. **AuditLog** - Admin action logging
12. **FeatureFlag** - Feature toggles
13. **CampaignSetting** - Configuration

### Hidden Models (Future Expansion)
- **Candidate** - Multi-candidate support
- **Debate** - Debate engine
- **Donation** - Donation system

---

## Security Features

### Implemented
- ✅ bcrypt password hashing
- ✅ JWT authentication with expiry
- ✅ Role-based access control middleware
- ✅ Input validation with Zod
- ✅ Session management
- ✅ Audit logging
- ✅ Security headers (XSS, CSRF protection)

### Prepared (Feature Flags)
- ⏸️ Phone OTP login (`enable_phone_login = false`)
- ⏸️ reCAPTCHA integration
- ⏸️ Rate limiting middleware

---

## Feature Flags

All disabled by default:
- `enable_phone_login` - Phone authentication
- `enable_multi_candidate` - Multi-candidate support
- `enable_debate` - Debate engine
- `enable_donations` - Donation system

---

## User Roles & Permissions

| Role | Permissions |
|------|-------------|
| **Super Admin** | Full access to all features |
| **LGA Admin** | Manage supporters, events, blog, analytics |
| **Media Admin** | Manage blog posts and media content |
| **Ward Coordinator** | View/manage supporters in their ward |
| **Supporter** | Access portal, RSVP events, report issues |

---

## API Routes

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/verify-email` - Email verification
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Supporters
- `POST /api/supporters` - Create supporter (public)
- `GET /api/supporters` - List supporters (admin)

### Dashboard
- `GET /api/dashboard/overview` - Dashboard stats (admin)

### Portal
- `GET /api/portal/dashboard` - Portal stats (supporter)

---

## Gamification System

### Activity Types & Points
- Daily Login: 5 points
- Event RSVP: 20 points
- Event Attendance: 30 points
- Referral: 50 points
- Social Share: 10 points
- Blog View: 2 points

### Milestones
- 100 points - Bronze
- 200 points - Silver
- 500 points - Gold
- 1000 points - Platinum
- 2000 points - Diamond
- 5000+ points - Legend

---

## PWA Configuration

### Manifest
- App name: "LionCore Platform"
- Short name: "LionCore"
- Theme color: #B91C1C (Lion Red)
- Background color: #FFFFFF
- Display mode: standalone
- Icons: 72x72 to 512x512

### Features
- Offline support (via next-pwa)
- Add to home screen
- Push notification ready
- Shortcuts for quick actions

---

## Mobile Optimization

### Performance
- Lazy loading for images
- Code splitting
- Optimized bundle size
- Service worker caching

### UX
- Touch-friendly buttons (min 44px)
- Responsive typography
- Mobile-first CSS
- Swipe gestures ready

---

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# JWT
JWT_SECRET="your-secret"
JWT_EXPIRES_IN="7d"

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_USER="..."
SMTP_PASS="..."

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="..."
RECAPTCHA_SECRET_KEY="..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
ELECTION_DATE="2024-09-21T00:00:00Z"
```

---

## File Structure

```
lioncore-platform/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (public)/           # Public routes group
│   │   │   ├── page/           # Homepage sections
│   │   │   └── join/           # Membership form
│   │   ├── (auth)/             # Auth routes group
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── api/                # API routes
│   │   ├── dashboard/          # Admin dashboard
│   │   └── portal/             # Supporter portal
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   └── layout/             # Layout components
│   ├── lib/
│   │   ├── auth/               # Authentication utilities
│   │   ├── db/                 # Database client
│   │   └── utils/              # Helper functions
│   ├── hooks/                  # Custom React hooks
│   └── types/                  # TypeScript types
├── prisma/
│   └── schema.prisma           # Database schema
├── public/
│   └── manifest.json           # PWA manifest
└── package.json
```

---

## Installation & Setup

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# 3. Set up database
npx prisma generate
npx prisma db push

# 4. Run development server
npm run dev

# 5. Build for production
npm run build
npm start
```

---

## Future Enhancements

### Phase 2 (Post-Launch)
- [ ] Phone OTP authentication
- [ ] Push notifications
- [ ] Real-time chat
- [ ] Advanced analytics
- [ ] A/B testing framework

### Phase 3 (Expansion)
- [ ] Multi-candidate support
- [ ] Debate engine
- [ ] Donation system
- [ ] SMS campaigns
- [ ] Mobile app (React Native)

---

## Credits

**Developed for**: Hon. (T-DR) Abdulazeez Izuafa  
**Party**: APC (All Progressives Congress)  
**Constituency**: Estako West LGA, Edo State, Nigeria  
**Platform**: LionCore Platform v1.0.0

---

## License

Proprietary and Confidential - All Rights Reserved.
