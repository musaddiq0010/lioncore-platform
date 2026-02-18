'use client';

import { motion } from 'framer-motion';
import { Eye, Heart, Lightbulb, Shield, Users, Zap } from 'lucide-react';

const visionPoints = [
  {
    icon: Eye,
    title: 'Clear Vision',
    description: 'A comprehensive roadmap for sustainable development across all 12 wards of Estako West LGA.',
    color: 'bg-blue-500',
  },
  {
    icon: Shield,
    title: 'Unwavering Courage',
    description: 'Standing firm for the rights and aspirations of our people, even in the face of challenges.',
    color: 'bg-lion-red',
  },
  {
    icon: Zap,
    title: 'Progressive Action',
    description: 'Implementing practical solutions that deliver measurable results for our communities.',
    color: 'bg-lion-gold',
  },
  {
    icon: Users,
    title: 'Inclusive Leadership',
    description: 'Bringing everyone along - youth, women, elders, and all stakeholders in our journey.',
    color: 'bg-green-500',
  },
  {
    icon: Heart,
    title: 'People First',
    description: 'Every decision made with the welfare and prosperity of our people as the top priority.',
    color: 'bg-pink-500',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Driven',
    description: 'Embracing modern technology and innovative approaches to solve local challenges.',
    color: 'bg-purple-500',
  },
];

export default function VisionSection() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-lion-red/10 text-lion-red rounded-full text-sm font-medium mb-4">
            Our Vision
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-4">
            Building a Better{' '}
            <span className="text-lion-red">Estako West</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our vision is rooted in the belief that every citizen deserves access 
            to quality infrastructure, education, healthcare, and economic opportunities.
          </p>
        </motion.div>

        {/* Vision Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visionPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              <div className="relative p-8 rounded-2xl bg-card border border-border hover:border-lion-red/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl ${point.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <point.icon className="h-7 w-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {point.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {point.description}
                </p>

                {/* Hover accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-lion-red to-lion-gold rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <blockquote className="relative">
            <div className="text-6xl text-lion-red/20 absolute -top-8 left-1/2 -translate-x-1/2">"</div>
            <p className="text-2xl sm:text-3xl font-heading italic text-foreground max-w-4xl mx-auto pt-8">
              The strength of the lion is not in its roar, but in its ability to 
              protect and provide for its pride. Together, we will roar with purpose 
              and act with conviction.
            </p>
            <footer className="mt-6">
              <cite className="not-italic">
                <span className="font-bold text-lion-red">Hon. (T-DR) Abdulazeez Izuafa</span>
                <span className="text-muted-foreground block">APC Candidate, Estako West LGA</span>
              </cite>
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
