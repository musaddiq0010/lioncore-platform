import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { verifyToken, canAccess } from '@/lib/auth/jwt';

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

    // Check authorization
    if (!canAccess(payload.role, ['SUPER_ADMIN', 'LGA_ADMIN', 'WARD_COORDINATOR'])) {
      return NextResponse.json(
        { error: 'Not authorized' },
        { status: 403 }
      );
    }

    // Get date ranges
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Fetch all dashboard data in parallel
    const [
      totalSupporters,
      activeSupporters,
      newThisWeek,
      totalEvents,
      upcomingEvents,
      totalBlogPosts,
      totalIssueReports,
      supportersByWard,
      dailyRegistrations,
      topIssues,
    ] = await Promise.all([
      // Total supporters
      prisma.supporter.count(),

      // Active supporters
      prisma.supporter.count({
        where: {
          status: 'active',
        },
      }),

      // New supporters this week
      prisma.supporter.count({
        where: {
          createdAt: {
            gte: oneWeekAgo,
          },
        },
      }),

      // Total events
      prisma.event.count(),

      // Upcoming events
      prisma.event.count({
        where: {
          startDate: {
            gte: now,
          },
          status: 'upcoming',
        },
      }),

      // Total blog posts
      prisma.blogPost.count(),

      // Total issue reports
      prisma.issueReport.count(),

      // Supporters by ward
      prisma.supporter.groupBy({
        by: ['ward'],
        _count: {
          id: true,
        },
        orderBy: {
          ward: 'asc',
        },
      }),

      // Daily registrations (last 7 days)
      prisma.dailyStats.findMany({
        where: {
          date: {
            gte: oneWeekAgo,
          },
        },
        orderBy: {
          date: 'asc',
        },
        take: 7,
      }),

      // Top issues
      getTopIssues(),
    ]);

    // Calculate weekly growth percentage
    const supportersLastWeek = await prisma.supporter.count({
      where: {
        createdAt: {
          gte: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000),
          lt: oneWeekAgo,
        },
      },
    });

    const weeklyGrowth = supportersLastWeek > 0
      ? ((newThisWeek - supportersLastWeek) / supportersLastWeek) * 100
      : 0;

    return NextResponse.json({
  upcomingEvents,
  totalBlogPosts,
  totalIssueReports,
  supportersByWard: supportersByWard.map((s: any) => ({
  ward: s.ward,
  count: s._count.id,
})),
})
      dailyRegistrations: dailyRegistrations.map(d => ({
        date: d.date.toLocaleDateString('en-US', { weekday: 'short' }),
        count: d.newRegistrations,
      })),
      topIssues,
    });
  } catch (error) {
    console.error('Dashboard overview error:', error);
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
}

async function getTopIssues() {
  // Get all supporters and their top issues
  const supporters = await prisma.supporter.findMany({
    select: {
      topIssues: true,
    },
  });

  // Count occurrences of each issue
  const issueCounts: Record<string, number> = {};
  
  supporters.forEach(supporter => {
    supporter.topIssues.forEach(issue => {
      issueCounts[issue] = (issueCounts[issue] || 0) + 1;
    });
  });

  // Convert to array and sort
  const sortedIssues = Object.entries(issueCounts)
    .map(([issue, count]) => ({ issue, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return sortedIssues;
}
