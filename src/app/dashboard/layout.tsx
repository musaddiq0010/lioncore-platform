'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/lib/utils/theme-provider';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Calendar, 
  BarChart3, 
  Settings,
  LogOut,
  Menu,
  X,
  Shield
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Supporters', href: '/dashboard/supporters', icon: Users },
  { label: 'Blog', href: '/dashboard/blog', icon: FileText },
  { label: 'Events', href: '/dashboard/events', icon: Calendar },
  { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
        <div className="flex items-center justify-between h-16 px-4 lg:px-8">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-lion-red flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg font-heading hidden sm:block">Admin Dashboard</span>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {/* User Menu */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium">
                  {user?.profile?.firstName} {user?.profile?.lastName}
                </p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role?.toLowerCase().replace('_', ' ')}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-lion-red/10 flex items-center justify-center">
                <span className="text-lg font-bold text-lion-red">
                  {user?.profile?.firstName?.[0]}
                </span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-16 left-0 z-40
          w-64 h-[calc(100vh-4rem)] 
          bg-background border-r
          transform transition-transform duration-300
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-colors
                    ${isActive 
                      ? 'bg-lion-red text-white' 
                      : 'text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <div className="pt-4 mt-4 border-t">
              <button
                onClick={logout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 w-full transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)] p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
