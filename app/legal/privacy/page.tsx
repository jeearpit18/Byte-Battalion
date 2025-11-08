import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-muted hover:text-text"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <article className="prose prose-invert max-w-none">
          <h1>Privacy Policy</h1>
          <p className="text-muted">Last updated: November 8, 2024</p>

          <h2>Introduction</h2>
          <p>
            DevOrbit (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is
            committed to protecting your privacy. This Privacy Policy explains
            how we collect, use, and safeguard your information.
          </p>

          <h2>Information We Collect</h2>
          <p>We collect information that you provide directly to us:</p>
          <ul>
            <li>Account information (name, email, handle)</li>
            <li>Profile data (bio, avatar, timeline entries)</li>
            <li>Event participation records</li>
            <li>Location data (when Sworn Mode is enabled, fuzzed to ~200m)</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide and maintain our services</li>
            <li>Verify event participation</li>
            <li>Connect you with nearby developers (with your consent)</li>
            <li>Improve our platform</li>
          </ul>

          <h2>Data Sharing</h2>
          <p>
            We do not sell your personal information. We may share your data
            with event organizers for verification purposes, only with your
            explicit consent.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Delete your account</li>
            <li>Control visibility of your timeline entries</li>
            <li>Opt out of hyperlocal discovery</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us
            at privacy@devorbit.dev
          </p>
        </article>
      </div>
    </div>
  );
}
