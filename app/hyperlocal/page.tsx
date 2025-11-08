'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  MessageCircle,
  Share2,
  UserPlus,
  Eye,
  X,
  Zap,
  Trophy,
  Flame,
  Star,
  Coffee,
  Code,
  Rocket,
  Heart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { mockNearbyDevs } from '@/data/seed';

interface Developer {
  id: string;
  name: string;
  handle: string;
  distance: number;
  skills: string[];
  status: 'online' | 'busy' | 'away';
  badges: string[];
  openForCollab: boolean;
}

const mockDevelopers: Developer[] = [
  {
    id: '1',
    name: 'Alex Chen',
    handle: 'alexchen',
    distance: 0.8,
    skills: ['React', 'TypeScript', 'Node.js'],
    status: 'online',
    badges: ['🏆', '⭐', '🚀', '💎'],
    openForCollab: true,
  },
  {
    id: '2',
    name: 'Sarah Park',
    handle: 'sarahp',
    distance: 1.2,
    skills: ['Python', 'AI/ML', 'TensorFlow'],
    status: 'online',
    badges: ['🔥', '☕', '⚡', '☀️'],
    openForCollab: false,
  },
  {
    id: '3',
    name: 'Marcus Johnson',
    handle: 'marcusj',
    distance: 2.1,
    skills: ['Next.js', 'Security', 'React'],
    status: 'busy',
    badges: ['💻', '🎯', '🌟'],
    openForCollab: true,
  },
];

const skillColors: Record<string, string> = {
  React: 'from-blue-500 to-cyan-500',
  TypeScript: 'from-blue-600 to-blue-400',
  'Node.js': 'from-green-600 to-green-400',
  Python: 'from-yellow-500 to-blue-500',
  'AI/ML': 'from-purple-500 to-pink-500',
  TensorFlow: 'from-orange-500 to-red-500',
  'Next.js': 'from-gray-800 to-gray-600',
  Security: 'from-red-600 to-orange-500',
};

export default function HyperlocalPage() {
  const [swarmActive, setSwarmActive] = useState(false);
  const [selectedDev, setSelectedDev] = useState<Developer | null>(null);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [isMounted, setIsMounted] = useState(false);
  const radarRef = useRef<HTMLDivElement>(null);

  // Generate particle positions once on client side only
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      })),
    []
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!swarmActive) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [swarmActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCommonSkills = () => {
    const allSkills = mockDevelopers.flatMap((d) => d.skills);
    const skillCount = allSkills.reduce(
      (acc, skill) => {
        acc[skill] = (acc[skill] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
    return Object.entries(skillCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([skill]) => skill);
  };

  if (!swarmActive) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-orbit-4/5 to-orbit-2/10" />

        {/* Animated particles */}
        {isMounted && (
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-orbit-2"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                }}
              />
            ))}
          </div>
        )}

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mb-4 text-step-4 font-bold bg-gradient-to-r from-orbit-1 via-orbit-2 to-orbit-3 bg-clip-text text-transparent">
              Hyperlocal Swarm Mode
            </h1>
            <p className="mb-12 text-lg text-muted">
              Discover & connect with developers in your vicinity
            </p>

            <Button
              size="lg"
              onClick={() => setSwarmActive(true)}
              className="gap-2 text-lg px-8 py-6"
            >
              <Zap className="h-5 w-5" />
              Trigger Swarm Activation
            </Button>

            <p className="mt-6 text-sm text-muted max-w-md">
              Your location is fuzzed to ~200m. Active for 30 minutes.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-orbit-4/10 to-orbit-2/10" />

      {/* Header */}
      <div className="relative z-10 border-b border-outline/50 bg-background/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-orbit-1 to-orbit-2 bg-clip-text text-transparent">
              Hyperlocal Swarm Mode
            </h1>
            <p className="text-sm text-muted">
              {mockDevelopers.length} developers detected
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSwarmActive(false)}
          >
            Deactivate ({formatTime(timeLeft)})
          </Button>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr,380px]">
          {/* Radar View */}
          <div className="relative flex items-center justify-center min-h-[600px]">
            <motion.div
              ref={radarRef}
              className="relative w-[600px] h-[600px] rounded-full border border-orbit-2/30 bg-gradient-to-br from-orbit-4/5 to-orbit-2/10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {/* Radar rings */}
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orbit-2/20"
                  style={{
                    width: `${i * 30}%`,
                    height: `${i * 30}%`,
                  }}
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}

              {/* Radar sweep line */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <div
                  className="h-[300px] w-[2px]"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(138, 124, 255, 0.8), transparent)',
                  }}
                />
              </motion.div>

              {/* Radar sweep glow */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <div
                  className="h-[300px] w-[60px]"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(138, 124, 255, 0.3), transparent)',
                    filter: 'blur(20px)',
                  }}
                />
              </motion.div>

              {/* Center info */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-[280px] z-0">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-orbit-1 to-orbit-2 bg-clip-text text-transparent leading-tight">
                  Hyperlocal Swarm
                  <br />
                  Activated
                </h2>
                <p className="mt-3 text-sm text-muted">
                  {mockDevelopers.length} Developers Nearby
                </p>

                {/* Common skills */}
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {getCommonSkills().map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-surface/80 px-3 py-1 text-xs backdrop-blur-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="mt-6 flex flex-col gap-2">
                  <Button size="sm" className="gap-2 w-full">
                    <MessageCircle className="h-3 w-3" />
                    Join Swarm Chat
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2 w-full">
                    <Users className="h-3 w-3" />
                    Form Instant Team
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2 w-full">
                    <Share2 className="h-3 w-3" />
                    Share with All
                  </Button>
                </div>

                <button className="mt-4 text-xs text-muted hover:text-text">
                  Close Overlay
                </button>
              </div>
            </motion.div>
          </div>

          {/* Developers List */}
          <div className="space-y-4">
            <h3 className="font-semibold">Developers Nearby</h3>
            <p className="text-sm text-muted">
              {mockDevelopers.length} dev-swarm detected
            </p>

            <div className="space-y-3">
              {mockDevelopers.map((dev) => (
                <motion.div
                  key={dev.id}
                  className="rounded-lg border border-outline bg-surface/50 p-4 backdrop-blur-sm cursor-pointer hover:bg-surface/80 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedDev(dev)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orbit-1 to-orbit-2 flex items-center justify-center text-lg font-bold">
                        {dev.name[0]}
                      </div>
                      <div
                        className={cn(
                          'absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-surface',
                          dev.status === 'online' && 'bg-green-500',
                          dev.status === 'busy' && 'bg-yellow-500'
                        )}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-semibold truncate">{dev.name}</h4>
                        <span className="text-xs text-muted whitespace-nowrap">
                          {dev.distance}km
                        </span>
                      </div>
                      <p className="text-sm text-muted">@{dev.handle}</p>

                      <div className="mt-2 flex flex-wrap gap-1">
                        {dev.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-elev px-2 py-0.5 text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {dev.openForCollab && (
                        <p className="mt-2 text-xs text-orbit-2">
                          Open for collab
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-3">
          <Button variant="outline" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            Start Micro Meetup
          </Button>
          <Button variant="outline" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Ping to Co-work
          </Button>
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share My Highlights
          </Button>
          <Button variant="outline" className="gap-2">
            <Users className="h-4 w-4" />
            Find Co-organizer
          </Button>
          <Button variant="outline" className="gap-2">
            <Eye className="h-4 w-4" />
            Stealth Mode
          </Button>
        </div>
      </div>

      {/* Developer Detail Modal */}
      <AnimatePresence>
        {selectedDev && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDev(null)}
          >
            <motion.div
              className="relative w-full max-w-md rounded-xl border border-outline bg-surface p-6"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedDev(null)}
                className="absolute right-4 top-4 rounded-lg p-1 hover:bg-elev"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="text-center">
                <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-gradient-to-br from-orbit-1 to-orbit-2 flex items-center justify-center text-3xl font-bold">
                  {selectedDev.name[0]}
                </div>

                <h3 className="text-xl font-bold">{selectedDev.name}</h3>
                <p className="text-muted">@{selectedDev.handle}</p>
                <p className="mt-1 text-sm text-orbit-2">
                  {selectedDev.distance}km away
                </p>

                {/* Top Skills */}
                <div className="mt-4">
                  <p className="mb-2 text-sm font-semibold">Top Skills</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {selectedDev.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-elev px-3 py-1 text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* DevOrbit Badges */}
                <div className="mt-4">
                  <p className="mb-2 text-sm font-semibold">DevOrbit Badges</p>
                  <div className="grid grid-cols-4 gap-2">
                    {selectedDev.badges.map((badge, i) => (
                      <div
                        key={i}
                        className="flex h-12 w-12 items-center justify-center rounded-lg bg-elev text-2xl mx-auto"
                      >
                        {badge}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div className="mt-4 flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-muted">Browsing</span>
                    <span className="font-mono">12:09</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted">Open for collab</span>
                    <span className="text-orbit-2">
                      {selectedDev.openForCollab ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 grid grid-cols-3 gap-2">
                  <Button className="gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Connect
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
