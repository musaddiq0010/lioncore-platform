'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  readTime: string;
  tags: string[];
}

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch blog posts
    fetch('/api/blog?status=published&limit=3')
      .then(res => res.json())
      .then(data => {
        if (data.posts) {
          setPosts(data.posts);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  // Fallback posts for demo
  const fallbackPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Empowering Youth Through Skills Development',
      slug: 'empowering-youth-skills-development',
      excerpt: 'Our comprehensive skills acquisition program has trained over 500 young people in various vocational trades...',
      featuredImage: '/images/blog-1.jpg',
      author: { name: 'Campaign Team' },
      publishedAt: '2024-01-15',
      readTime: '5 min read',
      tags: ['Youth', 'Development'],
    },
    {
      id: '2',
      title: 'Healthcare Outreach: Reaching Every Ward',
      slug: 'healthcare-outreach-every-ward',
      excerpt: 'The recent medical outreach program provided free health screenings and medications to over 2,000 residents...',
      featuredImage: '/images/blog-2.jpg',
      author: { name: 'Health Team' },
      publishedAt: '2024-01-10',
      readTime: '4 min read',
      tags: ['Healthcare', 'Community'],
    },
    {
      id: '3',
      title: 'Infrastructure Development: Building Tomorrow Today',
      slug: 'infrastructure-development',
      excerpt: 'Road construction projects across 8 wards are nearing completion, improving connectivity and trade...',
      featuredImage: '/images/blog-3.jpg',
      author: { name: 'Projects Team' },
      publishedAt: '2024-01-05',
      readTime: '6 min read',
      tags: ['Infrastructure', 'Progress'],
    },
  ];

  const displayPosts = posts.length > 0 ? posts : fallbackPosts;

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div>
            <span className="inline-block px-4 py-2 bg-lion-red/10 text-lion-red rounded-full text-sm font-medium mb-4">
              Latest News
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground">
              From the <span className="text-lion-red">Campaign Trail</span>
            </h2>
          </div>
          <Link 
            href="/blog"
            className="inline-flex items-center text-lion-red font-medium hover:text-lion-red-dark transition-colors group"
          >
            View all articles
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Blog Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded-t-2xl" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-muted rounded w-1/4" />
                  <div className="h-6 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-lion-red/30 hover:shadow-xl transition-all duration-300">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-lion-red/20 to-lion-gold/20" />
                      {post.featuredImage ? (
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-lion-red to-lion-red-dark flex items-center justify-center">
                          <span className="text-6xl">📰</span>
                        </div>
                      )}
                      {/* Tags */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-white/90 text-foreground">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.publishedAt).toLocaleDateString('en-NG', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-lion-red transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-muted-foreground line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-lion-red/10 flex items-center justify-center">
                            <User className="h-4 w-4 text-lion-red" />
                          </div>
                          <span className="text-sm font-medium">{post.author.name}</span>
                        </div>
                        <span className="text-lion-red font-medium text-sm group-hover:translate-x-1 transition-transform">
                          Read more →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
