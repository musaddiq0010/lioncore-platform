'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  FileText, 
  Flag,
  ArrowRight,
  Download,
  Eye
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface DashboardData {
  totalSupporters: number;
  weeklyGrowth: number;
  activeSupporters: number;
  totalEvents: number;
  upcomingEvents: number;
  totalBlogPosts: number;
  totalIssueReports: number;
  supportersByWard: { ward: string; count: number }[];
  dailyRegistrations: { date: string; count: number }[];
  topIssues: { issue: string; count: number }[];
}

const COLORS = ['#B91C1C', '#F59E0B', '#059669', '#3B82F6', '#8B5CF6', '#EC4899'];

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard/overview');
      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback data for demo
  const fallbackData: DashboardData = {
    totalSupporters: 10456,
    weeklyGrowth: 12.5,
    activeSupporters: 8234,
    totalEvents: 48,
    upcomingEvents: 8,
    totalBlogPosts: 24,
    totalIssueReports: 156,
    supportersByWard: [
      { ward: 'Ward 1', count: 1200 },
      { ward: 'Ward 2', count: 980 },
      { ward: 'Ward 3', count: 1150 },
      { ward: 'Ward 4', count: 890 },
      { ward: 'Ward 5', count: 1050 },
      { ward: 'Ward 6', count: 920 },
      { ward: 'Ward 7', count: 1100 },
      { ward: 'Ward 8', count: 850 },
      { ward: 'Ward 9', count: 980 },
      { ward: 'Ward 10', count: 780 },
      { ward: 'Ward 11', count: 890 },
      { ward: 'Ward 12', count: 668 },
    ],
    dailyRegistrations: [
      { date: 'Mon', count: 45 },
      { date: 'Tue', count: 52 },
      { date: 'Wed', count: 38 },
      { date: 'Thu', count: 65 },
      { date: 'Fri', count: 48 },
      { date: 'Sat', count: 72 },
      { date: 'Sun', count: 55 },
    ],
    topIssues: [
      { issue: 'Infrastructure', count: 3500 },
      { issue: 'Education', count: 2800 },
      { issue: 'Healthcare', count: 2400 },
      { issue: 'Employment', count: 2100 },
      { issue: 'Security', count: 1800 },
    ],
  };

  const displayData = data || fallbackData;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening with your campaign.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Link href="/dashboard/supporters">
            <Button className="bg-lion-red hover:bg-lion-red-dark gap-2">
              <Eye className="h-4 w-4" />
              View Supporters
            </Button>
          </Link>
        </div>
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
                  <p className="text-sm text-muted-foreground">Total Supporters</p>
                  <p className="text-3xl font-bold">{displayData.totalSupporters.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-lion-red/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-lion-red" />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Badge variant="success" className="bg-green-100 text-green-700">
                  +{displayData.weeklyGrowth}%
                </Badge>
                <span className="text-sm text-muted-foreground">this week</span>
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
                  <p className="text-sm text-muted-foreground">Active Supporters</p>
                  <p className="text-3xl font-bold">{displayData.activeSupporters.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-lion-gold/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-lion-gold" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                {Math.round((displayData.activeSupporters / displayData.totalSupporters) * 100)}% engagement rate
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
                  <p className="text-sm text-muted-foreground">Events</p>
                  <p className="text-3xl font-bold">{displayData.totalEvents}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                {displayData.upcomingEvents} upcoming
              </p>
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
                  <p className="text-sm text-muted-foreground">Issue Reports</p>
                  <p className="text-3xl font-bold">{displayData.totalIssueReports}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Flag className="h-6 w-6 text-orange-500" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                42 resolved this month
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Supporters by Ward Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Supporters by Ward</CardTitle>
              <Link href="/dashboard/supporters">
                <Button variant="ghost" size="sm" className="gap-1">
                  View all
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={displayData.supportersByWard}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ward" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#B91C1C" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Daily Registrations Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Daily Registrations (This Week)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={displayData.dailyRegistrations}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="count" 
                      stroke="#B91C1C" 
                      strokeWidth={2}
                      dot={{ fill: '#B91C1C' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Top Issues */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={displayData.topIssues}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="count"
                    >
                      {displayData.topIssues.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {displayData.topIssues.map((issue, index) => (
                  <div key={issue.issue} className="flex items-center gap-1">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-xs">{issue.issue}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Blog Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Blog Posts</CardTitle>
              <Link href="/dashboard/blog">
                <Button variant="ghost" size="sm" className="gap-1">
                  Manage
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: 'Empowering Youth Through Skills Development', views: 1250, date: '2 days ago' },
                  { title: 'Healthcare Outreach: Reaching Every Ward', views: 980, date: '5 days ago' },
                  { title: 'Infrastructure Development Update', views: 1500, date: '1 week ago' },
                ].map((post, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-lion-red/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-lion-red" />
                      </div>
                      <div>
                        <p className="font-medium">{post.title}</p>
                        <p className="text-sm text-muted-foreground">{post.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary">{post.views} views</Badge>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
