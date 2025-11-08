import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="mb-8">
        <h1 className="mb-4 text-9xl font-bold font-mono text-orbit-2">404</h1>
        <h2 className="mb-2 text-step-2 font-bold">Lost in space</h2>
        <p className="text-muted">
          This page has drifted out of orbit. Let&apos;s get you back on track.
        </p>
      </div>

      <div className="flex gap-4">
        <Button asChild variant="outline" className="gap-2">
          <Link href="javascript:history.back()">
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Link>
        </Button>
        <Button asChild className="gap-2">
          <Link href="/">
            <Home className="h-4 w-4" />
            Home
          </Link>
        </Button>
      </div>

      {/* Decorative floating elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-orbit-1 opacity-10 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-40 w-40 rounded-full bg-orbit-3 opacity-10 blur-3xl" />
      </div>
    </div>
  );
}
