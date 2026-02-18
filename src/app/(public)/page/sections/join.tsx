'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Users, MessageSquare, Vote } from 'lucide-react';

const benefits = [
  'Get updates on campaign activities',
  'Participate in community events',
  'Connect with fellow supporters',
  'Earn engagement rewards',
  'Access exclusive content',
  'Make your voice heard',
];

export default function JoinSection() {
  return (
    <section className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-lion-red/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-lion-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-lion-red/10 text-lion-red rounded-full text-sm font-medium mb-4">
              Join Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-4">
              Be Part of the{' '}
              <span className="text-lion-red">Movement</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of supporters who are committed to bringing positive 
              change to Estako West LGA. Together, we can make a difference.
            </p>

            {/* Benefits List */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-lion-green flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href="/join">
                <Button 
                  size="xl" 
                  className="bg-lion-red hover:bg-lion-red-dark text-white font-bold group"
                >
                  Join Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/portal">
                <Button 
                  size="xl" 
                  variant="outline"
                  className="border-lion-red text-lion-red hover:bg-lion-red/5"
                >
                  Supporter Login
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Column - Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-lion-red/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-lion-red" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">10,000+</h3>
                <p className="text-muted-foreground">Active Supporters</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-lion-gold/10 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-lion-gold" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">500+</h3>
                <p className="text-muted-foreground">Community Events</p>
              </motion.div>
            </div>

            <div className="space-y-6 sm:mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                  <Vote className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">12</h3>
                <p className="text-muted-foreground">Wards Covered</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-lion-red to-lion-red-dark text-white"
              >
                <h3 className="text-xl font-bold mb-2">Ready to Join?</h3>
                <p className="text-white/80 text-sm mb-4">
                  Take the first step towards positive change.
                </p>
                <Link href="/join">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    className="w-full bg-white text-lion-red hover:bg-white/90"
                  >
                    Get Started
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
