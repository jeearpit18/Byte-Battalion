import type { Metadata } from 'next';
import { Inter, Sora, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import { Toaster } from '@/components/ui/toaster';
import { SearchCommand } from '@/components/SearchCommand';
import { LayoutWrapper } from '@/components/LayoutWrapper';
import { generateSEO } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'optional',
});

const sora = Sora({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-sora',
  display: 'optional',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-jetbrains',
  display: 'optional',
});

export const metadata: Metadata = generateSEO({
  title: 'DevOrbit — Your unified developer identity',
  description:
    'Claim your Dev ID and watch your tech journey map itself — events, hackathons, communities, all verifiable.',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${sora.variable} ${jetbrains.variable}`}
      >
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Providers>
          <SearchCommand />
          <LayoutWrapper>
            <main id="main-content">{children}</main>
          </LayoutWrapper>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
