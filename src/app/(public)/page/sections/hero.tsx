'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Users, Target, TrendingUp } from 'lucide-react';

export default function HeroSection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const stats = [
    { icon: Users, value: '10,000+', label: 'Supporters' },
    { icon: Target, value: '12', label: 'Wards Covered' },
    { icon: TrendingUp, value: '85%', label: 'Approval Rating' },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-lion-red via-lion-red-dark to-red-950" />
      
      {/* Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-20 pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
              >
                <span className="w-2 h-2 bg-lion-gold rounded-full animate-pulse" />
                <span className="text-sm font-medium">APC Candidate - Estako West LGA</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-heading leading-tight mb-6"
              >
                The{' '}
                <span className="text-lion-gold">Fearless</span>{' '}
                Lion
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl sm:text-2xl text-white/90 mb-4 font-heading italic"
              >
                Vision, Courage, Progress
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-lg text-white/80 mb-8 max-w-xl"
              >
                Join Hon. (T-DR) Abdulazeez Izuafa in building a brighter future for 
                Estako West LGA. Together, we can achieve sustainable development, 
                empower our youth, and create opportunities for all.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/join">
                  <Button 
                    size="xl" 
                    className="bg-lion-gold hover:bg-lion-gold-light text-lion-dark font-bold group"
                  >
                    Join the Movement
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button
                  size="xl"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                  onClick={() => setIsVideoModalOpen(true)}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Vision
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center sm:text-left">
                    <stat.icon className="h-6 w-6 text-lion-gold mb-2 mx-auto sm:mx-0" />
                    <div className="text-2xl sm:text-3xl font-bold">{stat.value}</div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Image/Graphic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="hidden lg:block relative"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Decorative circles */}
                <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-pulse-slow" />
                <div className="absolute inset-4 rounded-full border-2 border-white/10" />
                <div className="absolute inset-8 rounded-full border-2 border-lion-gold/30" />
                
                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-lion-gold to-yellow-600 flex items-center justify-center">
                      <span className="text-6xl font-bold">🦁</span>
                    </div>
                    <h3 className="text-2xl font-bold font-heading">LionCore</h3>
                    <p className="text-white/70">Estako West</p>
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute top-10 right-0 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2"
                >
                  <span className="text-lion-gold font-bold">APC</span>
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute bottom-20 left-0 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2"
                >
                  <span className="text-white font-medium">Edo State</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div className="relative w-full max-w-4xl aspect-video">
            <iframe
              src={process.env.NEXT_PUBLIC_CAMPAIGN_VIDEO_URL || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}
              title="Campaign Vision Video"
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-lion-gold"
            >
              Close ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
