'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { OrbitalNav } from '@/components/OrbitalNav';
import { useOrbitAnimation } from '@/hooks/useOrbitAnimation';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useAppStore } from '@/lib/state';

const planets = [
  {
    id: 'profile',
    label: 'Profile',
    href: '/profile/DEV-ankit-4271',
    colorVar: '--orbit-1',
    description: 'Your Tech Janam Kundli',
  },
  {
    id: 'events',
    label: 'Events',
    href: '/events',
    colorVar: '--orbit-2',
    description: 'Unified events feed',
  },
  {
    id: 'hackathons',
    label: 'Hackathons',
    href: '/hackathons',
    colorVar: '--orbit-3',
    description: 'Browse & verify participation',
  },
  {
    id: 'hyperlocal',
    label: 'Hyperlocal',
    href: '/hyperlocal',
    colorVar: '--orbit-4',
    description: 'Nearby devs radar',
  },
  {
    id: 'communities',
    label: 'Communities',
    href: '/communities',
    colorVar: '--orbit-5',
    description: 'Partner directory',
  },
  {
    id: 'create',
    label: 'Create ID',
    href: '/create-id',
    colorVar: '--orbit-1',
    description: 'Claim your Dev ID',
  },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const simpleNav = useAppStore((s) => s.simpleNav);
  useOrbitAnimation(heroRef);

  useEffect(() => {
    // Easter egg: typing "ORBIT" spawns comet
    let buffer = '';
    const handleKeyPress = (e: KeyboardEvent) => {
      buffer += e.key.toUpperCase();
      if (buffer.length > 5) buffer = buffer.slice(-5);
      if (buffer === 'ORBIT') {
        const comet = document.createElement('div');
        comet.className =
          'fixed top-0 left-0 w-2 h-2 rounded-full bg-orbit-3 pointer-events-none z-50';
        comet.style.boxShadow = '0 0 20px var(--orbit-3)';
        document.body.appendChild(comet);
        comet.animate(
          [
            { transform: 'translate(-100px, -100px)', opacity: 0 },
            { transform: 'translate(50vw, 50vh)', opacity: 1, offset: 0.3 },
            {
              transform: 'translate(calc(100vw + 100px), calc(100vh + 100px))',
              opacity: 0,
            },
          ],
          { duration: 2000, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
        ).onfinish = () => comet.remove();
        buffer = '';
      }
    };
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20"
      >
        <div className="hero-content z-10 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-outline bg-surface/50 px-4 py-2 text-sm backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-orbit-2" />
            <span className="text-muted">Unified developer identity</span>
          </div>

          <h1 className="hero-title mb-6 text-step-4 font-bold leading-tight text-balance">
            Everything you build,
            <br />
            <span className="bg-gradient-to-r from-orbit-1 via-orbit-2 to-orbit-3 bg-clip-text text-transparent">
              in one orbit
            </span>
          </h1>

          <p className="hero-subtitle mx-auto mb-10 max-w-2xl text-step-1 text-muted text-balance">
            Claim your Dev ID and watch your tech journey map itself — events,
            hackathons, communities, all verifiable.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="/create-id">
                Create your Dev ID
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/profile/DEV-ankit-4271">Explore Profiles</Link>
            </Button>
          </div>
        </div>

        {/* Orbital Navigation */}
        {!simpleNav && (
          <div className="orbit-container absolute inset-0 z-0">
            <OrbitalNav planets={planets} />
          </div>
        )}
      </section>
    </div>
  );
}
