import React from 'react';
import HeroSection from './components/HeroSection';
import TracksSection from './components/TracksSection';
import HowItWorksSection from './components/HowItWorksSection';
import StreakWallSection from './components/StreakWallSection';
import TestimonialsSection from './components/TestimonialsSection';
import FinalCTASection from './components/FinalCTASection';
import LandingFooter from './components/LandingFooter';
import LandingTopBar from './components/LandingTopBar';

export default function LandingPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--background)' }}>
      <LandingTopBar />
      <HeroSection />
      <TracksSection />
      <HowItWorksSection />
      <StreakWallSection />
      <TestimonialsSection />
      <FinalCTASection />
      <LandingFooter />
    </main>
  );
}