'use client';

import React, { useEffect, useRef, useCallback } from 'react';

import { createPortal } from 'react-dom';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  color: string;
  width: number;
  height: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  isRibbon: boolean;
  ribbonPoints: { x: number; y: number }[];
  gravity: number;
  wobble: number;
  wobbleSpeed: number;
  wobbleAngle: number;
  depth: number; // parallax depth layer 0-1
}

const COLORS = [
  '#6C63FF',
  '#00D4FF',
  '#00FF88',
  '#FF6B35',
  '#FFD700',
  '#FF3CAC',
  '#784BA0',
  '#2B86C5',
  '#00F5FF',
  '#FF6B6B',
  '#FFF176',
  '#B9FBC0',
];

interface ConfettiExplosionProps {
  active: boolean;
  onComplete?: () => void;
}

export default function ConfettiExplosion({ active, onComplete }: ConfettiExplosionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  const createParticles = useCallback((canvas: HTMLCanvasElement) => {
    const cx = canvas.width / 2;
    const cy = canvas.height * 0.45;
    const particles: Particle[] = [];
    const count = 180;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
      const speed = 4 + Math.random() * 10;
      const depth = Math.random(); // 0 = far, 1 = near
      const depthScale = 0.4 + depth * 0.6;
      const isRibbon = Math.random() > 0.55;

      particles.push({
        x: cx + (Math.random() - 0.5) * 20,
        y: cy + (Math.random() - 0.5) * 20,
        z: depth,
        vx: Math.cos(angle) * speed * depthScale * (0.7 + Math.random() * 0.6),
        vy: Math.sin(angle) * speed * depthScale * (0.7 + Math.random() * 0.6) - 3,
        vz: 0,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        width: isRibbon
          ? (2 + Math.random() * 3) * depthScale
          : (4 + Math.random() * 6) * depthScale,
        height: isRibbon
          ? (12 + Math.random() * 20) * depthScale
          : (4 + Math.random() * 6) * depthScale,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.25,
        opacity: 1,
        isRibbon,
        ribbonPoints: [],
        gravity: (0.12 + Math.random() * 0.08) * depthScale,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.05 + Math.random() * 0.08,
        wobbleAngle: 0,
        depth,
      });
    }

    // Sort by depth so far particles render first
    particles.sort((a, b) => a.depth - b.depth);
    return particles;
  }, []);

  const drawRibbon = useCallback((ctx: CanvasRenderingContext2D, p: Particle) => {
    if (p.ribbonPoints.length < 2) return;
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.strokeStyle = p.color;
    ctx.lineWidth = p.width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 4 * p.depth;
    ctx.beginPath();
    ctx.moveTo(p.ribbonPoints[0].x, p.ribbonPoints[0].y);
    for (let i = 1; i < p.ribbonPoints.length; i++) {
      const prev = p.ribbonPoints[i - 1];
      const curr = p.ribbonPoints[i];
      const mx = (prev.x + curr.x) / 2;
      const my = (prev.y + curr.y) / 2;
      ctx.quadraticCurveTo(prev.x, prev.y, mx, my);
    }
    ctx.stroke();
    ctx.restore();
  }, []);

  const drawConfetti = useCallback((ctx: CanvasRenderingContext2D, p: Particle) => {
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 6 * p.depth;
    ctx.fillStyle = p.color;
    // Depth-based scale for parallax feel
    const scale = 0.5 + p.depth * 0.5;
    ctx.scale(scale, scale);
    ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
    ctx.restore();
  }, []);

  const animate = useCallback(
    (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      const elapsed = Date.now() - startTimeRef.current;
      const duration = 5000;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      let allDone = true;

      particlesRef.current.forEach((p) => {
        if (p.opacity <= 0) return;
        allDone = false;

        // Parallax offset based on mouse position and depth
        const parallaxX = (mx - cx) * (1 - p.depth) * 0.04;
        const parallaxY = (my - cy) * (1 - p.depth) * 0.02;

        p.wobbleAngle += p.wobbleSpeed;
        p.vx += Math.sin(p.wobbleAngle) * 0.08;
        p.vy += p.gravity;
        p.x += p.vx + parallaxX * 0.01;
        p.y += p.vy + parallaxY * 0.01;
        p.rotation += p.rotationSpeed;

        if (p.isRibbon) {
          p.ribbonPoints.unshift({ x: p.x, y: p.y });
          if (p.ribbonPoints.length > 12) p.ribbonPoints.pop();
        }

        // Fade out in last 40% of duration
        const fadeStart = duration * 0.6;
        if (elapsed > fadeStart) {
          p.opacity = Math.max(0, 1 - (elapsed - fadeStart) / (duration * 0.4));
        }

        if (p.isRibbon) {
          drawRibbon(ctx, p);
        } else {
          drawConfetti(ctx, p);
        }
      });

      if (elapsed < duration && !allDone) {
        animFrameRef.current = requestAnimationFrame(() => animate(canvas, ctx));
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onComplete?.();
      }
    },
    [drawRibbon, drawConfetti, onComplete]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    particlesRef.current = createParticles(canvas);
    startTimeRef.current = Date.now();

    cancelAnimationFrame(animFrameRef.current);
    animate(canvas, ctx);

    return () => cancelAnimationFrame(animFrameRef.current);
  }, [active]);

  if (!active || typeof document === 'undefined') return null;

  return createPortal(
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        pointerEvents: 'none',
      }}
    />,
    document.body
  );
}
