import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Helper functions for common queries
export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: { profile: true, supporter: true },
  });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: { profile: true, supporter: true },
  });
}

export async function getSupporterByEmail(email: string) {
  return prisma.supporter.findUnique({
    where: { email },
    include: { user: true, activities: true },
  });
}

export async function getSupporterStats() {
  const [total, byWard, active, recent] = await Promise.all([
    prisma.supporter.count(),
    prisma.supporter.groupBy({
      by: ['ward'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
    }),
    prisma.supporter.count({ where: { status: 'active' } }),
    prisma.supporter.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    }),
  ]);

  return { total, byWard, active, recent };
}

export async function getFeatureFlag(key: string): Promise<boolean> {
  const flag = await prisma.featureFlag.findUnique({
    where: { key },
  });
  return flag?.value ?? false;
}

export async function updateFeatureFlag(key: string, value: boolean, userId?: string) {
  return prisma.featureFlag.upsert({
    where: { key },
    update: { value, updatedBy: userId },
    create: { key, value, updatedBy: userId },
  });
}

export async function logAuditEvent(
  userId: string,
  action: string,
  entity: string,
  entityId?: string,
  oldValue?: unknown,
  newValue?: unknown,
  ipAddress?: string,
  userAgent?: string
) {
  return prisma.auditLog.create({
    data: {
      userId,
      action,
      entity,
      entityId,
      oldValue: oldValue ? JSON.parse(JSON.stringify(oldValue)) : null,
      newValue: newValue ? JSON.parse(JSON.stringify(newValue)) : null,
      ipAddress,
      userAgent,
    },
  });
}

export async function recordActivity(
  supporterId: string,
  type: string,
  points: number = 0,
  metadata?: Record<string, unknown>
) {
  return prisma.$transaction(async (tx) => {
    // Create activity record
    const activity = await tx.activity.create({
      data: {
        supporterId,
        type,
        points,
        metadata: metadata ? JSON.parse(JSON.stringify(metadata)) : null,
      },
    });

    // Update engagement score
    await tx.supporter.update({
      where: { id: supporterId },
      data: {
        engagementScore: {
          increment: points,
        },
      },
    });

    return activity;
  });
}

export async function getDailyStats(date: Date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return prisma.dailyStats.findUnique({
    where: { date: startOfDay },
  });
}

export async function updateDailyStats(date: Date, data: Partial<{
  newRegistrations: number;
  activeLogins: number;
  newReferrals: number;
  blogViews: number;
  eventRSVPs: number;
  issueReports: number;
}>) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  return prisma.dailyStats.upsert({
    where: { date: startOfDay },
    update: data,
    create: {
      date: startOfDay,
      ...data,
    },
  });
}
