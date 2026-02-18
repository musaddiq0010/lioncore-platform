'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  campaign: [
    { label: 'About', href: '/about' },
    { label: 'Vision', href: '/#vision' },
    { label: 'Achievements', href: '/#achievements' },
    { label: 'Events', href: '/events' },
  ],
  getInvolved: [
    { label: 'Join Now', href: '/join' },
    { label: 'Volunteer', href: '/volunteer' },
    { label: 'Donate', href: '/donate' },
    { label: 'Share', href: '/share' },
  ],
  resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'News', href: '/news' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Downloads', href: '/downloads' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-lion-dark text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-lion-red flex items-center justify-center">
                <span className="text-2xl">🦁</span>
              </div>
              <div>
                <span className="font-bold text-xl font-heading">LionCore</span>
                <span className="text-xs block text-white/60">Platform</span>
              </div>
            </Link>
            <p className="text-white/70 mb-6 max-w-sm">
              The Fearless Lion: Vision, Courage, Progress. Join us in building 
              a brighter future for Estako West LGA, Edo State.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a 
                href="mailto:contact@lioncore.com" 
                className="flex items-center gap-3 text-white/70 hover:text-lion-gold transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span>contact@lioncore.com</span>
              </a>
              <a 
                href="tel:+2348000000000" 
                className="flex items-center gap-3 text-white/70 hover:text-lion-gold transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span>+234 800 000 0000</span>
              </a>
              <div className="flex items-start gap-3 text-white/70">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>APC Secretariat, Estako West LGA, Edo State, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Campaign Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Campaign</h3>
            <ul className="space-y-3">
              {footerLinks.campaign.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-white/70 hover:text-lion-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Get Involved</h3>
            <ul className="space-y-3">
              {footerLinks.getInvolved.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-white/70 hover:text-lion-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-white/70 hover:text-lion-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-white/70 hover:text-lion-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm text-center md:text-left">
              © {new Date().getFullYear()} LionCore Platform. All rights reserved. 
              Hon. Abdulazeez Izuafa Campaign - APC, Estako West LGA, Edo State.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-lion-red hover:text-white transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
