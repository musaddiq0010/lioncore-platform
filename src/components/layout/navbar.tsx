'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/lib/utils/theme-provider';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Vision', href: '/#vision' },
  { label: 'Achievements', href: '/#achievements' },
  { label: 'Blog', href: '/blog' },
  { label: 'Events', href: '/events' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href.startsWith('/#')) {
      return pathname === '/';
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isScrolled ? 'bg-lion-red' : 'bg-white/20'
              }`}>
                <span className="text-xl">🦁</span>
              </div>
              <div className="hidden sm:block">
                <span className={`font-bold text-lg font-heading transition-colors ${
                  isScrolled ? 'text-foreground' : 'text-white'
                }`}>
                  LionCore
                </span>
                <span className={`text-xs block transition-colors ${
                  isScrolled ? 'text-muted-foreground' : 'text-white/70'
                }`}>
                  Estako West
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? isScrolled
                        ? 'text-lion-red bg-lion-red/10'
                        : 'text-white bg-white/20'
                      : isScrolled
                      ? 'text-foreground hover:text-lion-red hover:bg-muted'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              <div className={isScrolled ? '' : 'hidden'}>
                <ThemeToggle />
              </div>
              
              <Link href="/join" className="hidden sm:block">
                <Button 
                  size="sm"
                  className={isScrolled ? 'bg-lion-red hover:bg-lion-red-dark' : 'bg-white text-lion-red hover:bg-white/90'}
                >
                  Join Now
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  isScrolled
                    ? 'text-foreground hover:bg-muted'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 lg:hidden"
          >
            <div className="bg-background/95 backdrop-blur-md border-b shadow-lg">
              <nav className="flex flex-col p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive(link.href)
                        ? 'text-lion-red bg-lion-red/10'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 pt-4 border-t">
                  <Link href="/join" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-lion-red hover:bg-lion-red-dark">
                      Join the Movement
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
