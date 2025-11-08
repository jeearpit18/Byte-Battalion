'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertCircle, MapPin } from 'lucide-react';
import { NearbyRadar } from '@/components/NearbyRadar';
import { Button } from '@/components/ui/button';
import { mockNearbyDevs } from '@/data/seed';

export default function HyperlocalPage() {
  const [swornMode, setSwornMode] = useState(false);

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-muted hover:text-text"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="mb-8">
          <h1 className="text-step-3 font-bold">Hyperlocal</h1>
          <p className="text-muted">Discover developers nearby</p>
        </div>

        {/* Privacy Notice */}
        <div className="mb-8 rounded-lg border border-warning/30 bg-warning/10 p-4">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-warning flex-shrink-0" />
            <div className="text-sm">
              <p className="font-semibold text-warning">Sworn Mode Privacy</p>
              <p className="mt-1 text-muted">
                Sworn Mode shares an approximate location for 30 minutes. Your
                exact location is fuzzed to ~200m. You&apos;re in control.
                Toggle anytime.
              </p>
            </div>
          </div>
        </div>

        {!swornMode ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-outline p-12 text-center">
            <MapPin className="mb-4 h-12 w-12 text-muted" />
            <h2 className="mb-2 text-xl font-semibold">Enable Sworn Mode</h2>
            <p className="mb-6 max-w-md text-muted">
              Activate Sworn Mode to see nearby developers and let others
              discover you. Your privacy is protected with location fuzzing.
            </p>
            <Button onClick={() => setSwornMode(true)}>
              Enable Sworn Mode
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted">
                Sworn Mode active • Expires in 29:45
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSwornMode(false)}
              >
                Disable
              </Button>
            </div>

            <NearbyRadar devs={mockNearbyDevs} />
          </div>
        )}
      </div>
    </div>
  );
}
