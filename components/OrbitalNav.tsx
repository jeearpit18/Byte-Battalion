'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { usePageWarp } from '@/hooks/usePageWarp';
import { useAppStore } from '@/lib/state';

interface Planet {
  id: string;
  label: string;
  href: string;
  colorVar: string;
  description: string;
}

interface OrbitalNavProps {
  planets: Planet[];
}

export function OrbitalNav({ planets }: OrbitalNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const reducedMotion = useAppStore((s) => s.reducedMotion);
  const warp = usePageWarp();

  useEffect(() => {
    if (!canvasRef.current || reducedMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Animation state
    let animationId: number;
    let time = 0;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const baseRadius = Math.min(canvas.width, canvas.height) * 0.25;

    // Draw function
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw center emblem
      ctx.beginPath();
      ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
      ctx.fillStyle = getComputedStyle(
        document.documentElement
      ).getPropertyValue('--orbit-2');
      ctx.shadowBlur = 20;
      ctx.shadowColor = ctx.fillStyle;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw orbits and planets
      planets.forEach((planet, i) => {
        const angle = (time + (i * Math.PI * 2) / planets.length) * 0.3;
        const radius = baseRadius + i * 30;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        // Draw orbit path
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle =
          hoveredPlanet === planet.id
            ? getComputedStyle(document.documentElement).getPropertyValue(
                planet.colorVar
              )
            : 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = hoveredPlanet === planet.id ? 2 : 1;
        ctx.stroke();

        // Draw planet
        const planetRadius = hoveredPlanet === planet.id ? 16 : 12;
        ctx.beginPath();
        ctx.arc(x, y, planetRadius, 0, Math.PI * 2);
        ctx.fillStyle = getComputedStyle(
          document.documentElement
        ).getPropertyValue(planet.colorVar);
        ctx.shadowBlur = hoveredPlanet === planet.id ? 20 : 10;
        ctx.shadowColor = ctx.fillStyle;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      time += 0.01;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [planets, hoveredPlanet, reducedMotion]);

  const handlePlanetClick = (planet: Planet) => {
    const color = getComputedStyle(document.documentElement).getPropertyValue(
      planet.colorVar
    );
    warp(planet.href, color);
  };

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />

      {/* Accessible overlay with clickable planets */}
      <div className="absolute inset-0 flex items-center justify-center">
        <nav
          aria-label="Orbital navigation"
          className="relative"
          style={{ width: '600px', height: '600px' }}
        >
          {planets.map((planet, i) => {
            const angle = (i * 360) / planets.length;
            const radius = 200;
            const x =
              Math.round(Math.cos((angle * Math.PI) / 180) * radius * 100) /
              100;
            const y =
              Math.round(Math.sin((angle * Math.PI) / 180) * radius * 100) /
              100;

            return (
              <Tooltip key={planet.id}>
                <TooltipTrigger asChild>
                  <motion.button
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-4 focus-orbit"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => setHoveredPlanet(planet.id)}
                    onMouseLeave={() => setHoveredPlanet(null)}
                    onClick={() => handlePlanetClick(planet)}
                    aria-label={`Navigate to ${planet.label}`}
                  >
                    <span className="sr-only">{planet.label}</span>
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <div className="space-y-1">
                    <p className="font-semibold">{planet.label}</p>
                    <p className="text-xs text-muted">{planet.description}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
      </div>

      {/* Fallback navigation for reduced motion */}
      {reducedMotion && (
        <div className="absolute inset-0 flex items-center justify-center">
          <nav className="flex flex-wrap gap-4 p-8">
            {planets.map((planet) => (
              <Link
                key={planet.id}
                href={planet.href}
                className="rounded-lg border border-outline bg-surface/50 px-6 py-3 backdrop-blur-sm transition-colors hover:bg-elev focus-orbit"
              >
                {planet.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
