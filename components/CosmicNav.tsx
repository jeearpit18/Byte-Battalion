'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Sparkles,
  Trophy,
  Calendar,
  Users,
  MapPin,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/lib/state';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const navItems: NavItem[] = [
  {
    id: 'orbit-match',
    label: 'OrbitMatch',
    href: '/orbit-match',
    icon: Sparkles,
    color: 'from-orbit-2 to-orbit-3',
  },
  {
    id: 'hackathons',
    label: 'Hackathons',
    href: '/hackathons',
    icon: Trophy,
    color: 'from-orbit-3 to-orbit-4',
  },
  {
    id: 'events',
    label: 'Events',
    href: '/events',
    icon: Calendar,
    color: 'from-orbit-4 to-orbit-1',
  },
  {
    id: 'communities',
    label: 'Communities',
    href: '/communities',
    icon: Users,
    color: 'from-orbit-1 to-orbit-3',
  },
  {
    id: 'hyperlocal',
    label: 'Hyperlocal',
    href: '/hyperlocal',
    icon: MapPin,
    color: 'from-orbit-2 to-orbit-4',
  },
];

export function CosmicNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const user = useAppStore((s) => s.user);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getProfileHref = () => {
    if (user?.devId) {
      return `/profile/${user.devId}`;
    }
    return '/create-id';
  };

  const activeItem = navItems.find((item) => pathname.startsWith(item.href));

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-outline/50'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Desktop Navigation - Orbital Ring */}
        <div className="hidden md:flex items-center justify-between py-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-orbit-1 to-orbit-2 bg-clip-text text-transparent"
          >
            DevOrbit
          </Link>

          {/* Orbital Navigation Ring */}
          <div className="flex items-center gap-1 rounded-full border border-outline/50 bg-surface/30 p-1 backdrop-blur-sm">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link key={item.id} href={item.href} className="relative">
                  <motion.div
                    className={cn(
                      'relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                      isActive ? 'text-text' : 'text-muted hover:text-text'
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className={cn(
                          'absolute inset-0 rounded-full bg-gradient-to-r',
                          item.color
                        )}
                        style={{ opacity: 0.15 }}
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                    <Icon className="h-4 w-4" />
                    <span className="relative">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* User Avatar */}
          <Link
            href={getProfileHref()}
            className="h-10 w-10 rounded-full bg-gradient-to-br from-orbit-1 to-orbit-2 p-[2px]"
          >
            <div className="flex h-full w-full items-center justify-center rounded-full bg-background">
              <User className="h-5 w-5 text-orbit-1" />
            </div>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center justify-between py-4">
          <Link
            href="/"
            className="text-lg font-bold bg-gradient-to-r from-orbit-1 to-orbit-2 bg-clip-text text-transparent"
          >
            DevOrbit
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 hover:bg-elev"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-outline/50 bg-background/95 backdrop-blur-xl"
          >
            <div className="mx-auto max-w-7xl px-4 py-4">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-4 py-3 transition-colors',
                        isActive
                          ? 'bg-gradient-to-r ' +
                              item.color +
                              ' bg-opacity-10 text-text'
                          : 'text-muted hover:bg-elev hover:text-text'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Item Indicator - Floating Orb */}
      {activeItem && (
        <motion.div
          className="pointer-events-none fixed left-1/2 top-20 hidden md:block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div
            className={cn(
              'h-2 w-2 rounded-full bg-gradient-to-r blur-sm',
              activeItem.color
            )}
          />
        </motion.div>
      )}
    </nav>
  );
}
