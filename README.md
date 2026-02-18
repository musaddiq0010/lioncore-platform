# LionCore Platform

A comprehensive political campaign web application for Hon. (T-DR) Abdulazeez Izuafa (APC, Estako West LGA, Edo State).

## Features

### Public Website
- Hero section with campaign messaging
- Vision and mission statement
- Achievements showcase
- Blog/News section
- Election countdown timer
- Social sharing (WhatsApp & Facebook)
- Dark/Light mode toggle
- Mobile-optimized and PWA-enabled

### Membership System
- Multi-step registration form
- Input validation and duplicate prevention
- Ward-based organization
- Issue tracking and volunteer interest

### Supporter Portal
- Personal dashboard with engagement score
- Ward statistics
- Event RSVP system
- Issue reporting
- Referral system with gamification
- Profile management

### Admin Dashboard
- Overview with analytics charts
- Supporter management (CRUD, filtering, tagging)
- Blog CMS (create, edit, schedule posts)
- Event management
- Analytics and reporting
- Feature flags and settings

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcrypt
- **Charts**: Recharts
- **PWA**: next-pwa

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- SMTP server for emails

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lioncore-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` with your configuration.

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `SMTP_HOST` | SMTP server host |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA site key |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA secret key |

## Project Structure

```
lioncore-platform/
├── src/
│   ├── app/              # Next.js app router
│   │   ├── (public)/     # Public routes
│   │   ├── (auth)/       # Authentication routes
│   │   ├── api/          # API routes
│   │   ├── dashboard/    # Admin dashboard
│   │   └── portal/       # Supporter portal
│   ├── components/       # React components
│   │   └── ui/           # UI components (shadcn)
│   ├── lib/              # Utility functions
│   │   ├── auth/         # Authentication
│   │   ├── db/           # Database client
│   │   └── utils/        # Helpers
│   ├── hooks/            # Custom React hooks
│   └── types/            # TypeScript types
├── prisma/               # Database schema
├── public/               # Static assets
└── package.json
```

## User Roles

- **Super Admin**: Full access to all features
- **LGA Admin**: Manage supporters, events, and content
- **Media Admin**: Manage blog posts and media
- **Ward Coordinator**: Manage supporters in their ward
- **Supporter**: Access portal features

## Feature Flags

The following features can be enabled/disabled via the database:

- `enable_phone_login`: Phone OTP authentication
- `enable_multi_candidate`: Multi-candidate support
- `enable_debate`: Debate engine
- `enable_donations`: Donation system

## Security

- bcrypt password hashing
- JWT authentication with expiry
- Role-based access control
- Rate limiting on API routes
- Input validation with Zod
- reCAPTCHA on public forms
- Audit logging for admin actions

## Deployment

### Build for production:

```bash
npm run build
```

### Start production server:

```bash
npm start
```

## License

This project is proprietary and confidential.

## Support

For support, contact the development team.
