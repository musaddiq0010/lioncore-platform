import { Metadata } from 'next';
import HeroSection from './sections/hero';
import VisionSection from './sections/vision';
import AchievementsSection from './sections/achievements';
import BlogSection from './sections/blog';
import CountdownSection from './sections/countdown';
import JoinSection from './sections/join';
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
