'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/lib/auth/auth-context';
import { 
  Trophy, 
  Users, 
  Calendar, 
  Share2, 
  TrendingUp,
  MapPin,
  Award,
  ArrowRight,
  Star
} from 'lucide-react';

interface DashboardStats {
  engagementScore: number;
  rank: number;
  totalSupporters: number;
  wardSupporters: number;
  eventsAttended: number;
  referralCount: number;
  nextMilestone: number;
  activities: Activity[];
}

interface Activity {
  id: string;
  type: string;
  points: number;
  createdAt: string;
  metadata?: any;
}

export default function PortalDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/portal/dashboard');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback stats for demo
  const fallbackStats: DashboardStats = {
    engagementScore: 150,
    rank: 42,
    totalSupporters: 10000,
    wardSupporters: 850,
    eventsAttended: 5,
    referralCount: 3,
    nextMilestone: 200,
    activities: [
      { id: '1', type: 'login', points: 5, createdAt: new Date().toISOString() },
      { id: '2', type: 'event_rsvp', points: 20, createdAt: new Date(Date.now() - 86400000).toISOString() },
      { id: '3', type: 'referral', points: 50, createdAt: new Date(Date.now() - 172800000).toISOString() },
    ],
  };

  const displayStats = stats || fallbackStats;
  const progressToNext = (displayStats.engagementScore / displayStats.nextMilestone) * 100;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login': return '🎯';
      case 'event_rsvp': return '📅';
      case 'referral': return '👥';
      case 'share': return '📤';
      case 'post_view': return '👁️';
      default: return '⭐';
    }
  };

  const getActivityLabel = (type: string) => {
    switch (type) {
      case 'login': return 'Daily Login';
      case 'event_rsvp': return 'Event RSVP';
      case 'referral': return 'New Referral';
      case 'share': return 'Social Share';
      case 'post_view': return 'Blog View';
      default: return 'Activity';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold font-heading text-foreground">
          Welcome back, {user?.profile?.firstName || 'Supporter'}! 👋
        </h1>
        <p className="text-muted-foreground mt-2">
          Here's what's happening in your supporter journey.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Engagement Score</p>
                  <p className="text-3xl font-bold text-lion-red">{displayStats.engagementScore}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-lion-red/10 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-lion-red" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Next milestone</span>
                  <span className="font-medium">{displayStats.nextMilestone}</span>
                </div>
                <Progress value={progressToNext} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Your Rank</p>
                  <p className="text-3xl font-bold text-lion-gold">#{displayStats.rank}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-lion-gold/10 flex items-center justify-center">
                  <Award className="h-6 w-6 text-lion-gold" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Out of {displayStats.totalSupporters.toLocaleString()} supporters
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Events Attended</p>
                  <p className="text-3xl font-bold text-blue-500">{displayStats.eventsAttended}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <Link href="/portal/events" className="text-sm text-blue-500 hover:underline mt-4 inline-flex items-center">
                View upcoming events
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Referrals</p>
                  <p className="text-3xl font-bold text-green-500">{displayStats.referralCount}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Share2 className="h-6 w-6 text-green-500" />
                </div>
              </div>
              <Link href="/portal/share" className="text-sm text-green-500 hover:underline mt-4 inline-flex items-center">
                Invite friends
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Ward Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-lion-red" />
                Your Ward: {user?.supporter?.ward || 'Ward 5'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Users className="h-8 w-8 mx-auto mb-2 text-lion-red" />
                  <p className="text-2xl font-bold">{displayStats.wardSupporters}</p>
                  <p className="text-sm text-muted-foreground">Supporters</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-lion-gold" />
                  <p className="text-2xl font-bold">85%</p>
                  <p className="text-sm text-muted-foreground">Engagement</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Star className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <p className="text-2xl font-bold">#3</p>
                  <p className="text-sm text-muted-foreground">Ward Rank</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-lion-red/5 rounded-lg border border-lion-red/20">
                <h4 className="font-medium text-lion-red mb-2">Top Issues in Your Ward</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Infrastructure</Badge>
                  <Badge variant="secondary">Education</Badge>
                  <Badge variant="secondary">Healthcare</Badge>
                  <Badge variant="secondary">Employment</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {displayStats.activities.map((activity, index) => (
                  <div key={activity.id} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-lion-gold/10 flex items-center justify-center text-lg">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{getActivityLabel(activity.type)}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(activity.createdAt).toLocaleDateString('en-NG', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <Badge variant="lion" className="bg-lion-gold text-lion-dark">
                      +{activity.points}
                    </Badge>
                  </div>
                ))}
              </div>

              <Link 
                href="/portal/activities"
                className="text-sm text-lion-red hover:underline mt-4 inline-flex items-center"
              >
                View all activity
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/portal/events">
            <Button variant="outline" className="w-full h-auto py-4 justify-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-500" />
              </div>
              <div className="text-left">
                <p className="font-medium">RSVP to Events</p>
                <p className="text-sm text-muted-foreground">Join upcoming events</p>
              </div>
            </Button>
          </Link>

          <Link href="/portal/share">
            <Button variant="outline" className="w-full h-auto py-4 justify-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <Share2 className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-left">
                <p className="font-medium">Share Campaign</p>
                <p className="text-sm text-muted-foreground">Invite friends</p>
              </div>
            </Button>
          </Link>

          <Link href="/portal/issues">
            <Button variant="outline" className="w-full h-auto py-4 justify-start gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-orange-500" />
              </div>
              <div className="text-left">
                <p className="font-medium">Report Issue</p>
                <p className="text-sm text-muted-foreground">Share concerns</p>
              </div>
            </Button>
          </Link>

          <Link href="/portal/profile">
            <Button variant="outline" className="w-full h-auto py-4 justify-start gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-purple-500" />
              </div>
              <div className="text-left">
                <p className="font-medium">Update Profile</p>
                <p className="text-sm text-muted-foreground">Manage settings</p>
              </div>
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
