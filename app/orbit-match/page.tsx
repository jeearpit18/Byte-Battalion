'use client';

import { Sparkles, Users, Zap, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OrbitMatchPage() {
  return (
    <div className="min-h-screen px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orbit-2/30 bg-orbit-2/10 px-4 py-2 text-sm">
            <Sparkles className="h-4 w-4 text-orbit-2" />
            AI-Powered Connections
          </div>
          <h1 className="mb-4 text-step-3 font-bold">OrbitMatch</h1>
          <p className="text-lg text-muted">
            Find developers who complement your skills, share your interests,
            and align with your journey
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-outline bg-surface/50 p-6 backdrop-blur-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orbit-1 to-orbit-2">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-semibold">Skill Synergy</h3>
            <p className="text-sm text-muted">
              Match with developers whose skills complement yours for potential
              collaborations
            </p>
          </div>

          <div className="rounded-xl border border-outline bg-surface/50 p-6 backdrop-blur-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orbit-2 to-orbit-3">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-semibold">Interest Alignment</h3>
            <p className="text-sm text-muted">
              Connect with people attending similar events and hackathons
            </p>
          </div>

          <div className="rounded-xl border border-outline bg-surface/50 p-6 backdrop-blur-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orbit-3 to-orbit-4">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-semibold">Community Fit</h3>
            <p className="text-sm text-muted">
              Discover communities where you&apos;ll thrive based on your
              profile
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-xl border border-outline bg-surface/50 p-8 text-center backdrop-blur-sm">
          <p className="mb-4 text-muted">
            OrbitMatch uses AI to analyze your tech journey and suggest
            meaningful connections
          </p>
          <Button size="lg" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Start Matching
          </Button>
        </div>
      </div>
    </div>
  );
}
