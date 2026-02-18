import { Metadata } from 'next';
import HeroSection from './(public)/page/sections/hero';
import VisionSection from './(public)/page/sections/vision';
import AchievementsSection from './(public)/page/sections/achievements';
import BlogSection from './(public)/page/sections/blog';
import CountdownSection from './(public)/page/sections/countdown';
import JoinSection from './(public)/page/sections/join';
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';

export const metadata: Metadata = {
  title: 'LionCore Platform - The Fearless Lion',
  description: 'Join Hon. Abdulazeez Izuafa\'s campaign for Vision, Courage, and Progress in Estako West LGA, Edo State.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <VisionSection />
      <AchievementsSection />
      <CountdownSection />
      <BlogSection />
      <JoinSection />
      <Footer />
    </main>
  );
}
