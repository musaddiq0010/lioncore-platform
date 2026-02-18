'use client';

import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Heart, 
  Briefcase, 
  Home, 
  Droplets, 
  Lightbulb,
  ArrowUpRight
} from 'lucide-react';

const achievements = [
  {
    icon: GraduationCap,
    title: 'Education Support',
    value: '2,500+',
    description: 'Scholarships awarded to deserving students across all wards',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Heart,
    title: 'Healthcare Access',
    value: '15',
    description: 'Community health centers upgraded and equipped',
    color: 'from-red-500 to-red-600',
  },
  {
    icon: Briefcase,
    title: 'Youth Employment',
    value: '1,200+',
    description: 'Young people trained and placed in meaningful jobs',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Home,
    title: 'Infrastructure',
    value: '45km',
    description: 'Roads constructed and rehabilitated across the LGA',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: Droplets,
    title: 'Water Projects',
    value: '28',
    description: 'Boreholes drilled providing clean water access',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    icon: Lightbulb,
    title: 'Electrification',
    value: '8',
    description: 'Communities connected to the national grid',
    color: 'from-yellow-500 to-yellow-600',
  },
];

export default function AchievementsSection() {
  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-lion-gold/10 text-lion-gold-dark rounded-full text-sm font-medium mb-4">
            Track Record
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-4">
            Proven <span className="text-lion-red">Achievements</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our commitment to service delivery is demonstrated through tangible results 
            that have improved the lives of thousands in Estako West.
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:shadow-xl transition-all duration-300"
            >
              {/* Gradient Header */}
              <div className={`h-2 bg-gradient-to-r ${achievement.color}`} />
              
              <div className="p-6">
                {/* Icon and Value Row */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center`}>
                    <achievement.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-3xl font-bold text-foreground">
                    {achievement.value}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-lion-red transition-colors">
                  {achievement.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {achievement.description}
                </p>

                {/* Link */}
                <div className="mt-4 pt-4 border-t border-border">
                  <button className="inline-flex items-center text-sm font-medium text-lion-red hover:text-lion-red-dark transition-colors">
                    Learn more
                    <ArrowUpRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 p-6 rounded-2xl bg-lion-red/5 border border-lion-red/20">
            <div className="text-left">
              <p className="font-bold text-foreground">Want to see more?</p>
              <p className="text-sm text-muted-foreground">Explore our detailed impact report</p>
            </div>
            <button className="px-6 py-3 bg-lion-red text-white rounded-lg font-medium hover:bg-lion-red-dark transition-colors">
              View Full Report
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
