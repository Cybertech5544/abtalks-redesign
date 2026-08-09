'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const floatingSnippets = [
  { id: 'snip-1', text: 'git commit -m "Day 12 ✓"', top: '18%', left: '3%', delay: '0s', layer: 0.3 },
  { id: 'snip-2', text: 'streak += 1', top: '25%', right: '4%', delay: '1.2s', layer: 0.6 },
  { id: 'snip-3', text: '{ build: daily }', top: '65%', left: '2%', delay: '0.6s', layer: 0.4 },
  { id: 'snip-4', text: 'npm run ship', top: '72%', right: '3%', delay: '1.8s', layer: 0.8 },
  { id: 'snip-5', text: 'const future = now + work', top: '40%', right: '1%', delay: '2.4s', layer: 0.5 },
];

const stats = [
  { id: 'stat-students', value: '10,000+', label: 'Students' },
  { id: 'stat-projects', value: '500+', label: 'Projects Built' },
  { id: 'stat-partners', value: '100+', label: 'Hiring Partners' },
];

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setMousePos({
        x: (e.clientX - cx) / cx,
        y: (e.clientY - cy) / cy,
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Parallax layers: deeper = slower
  const bgParallax = scrollY * 0.25;
  const orbParallax1 = scrollY * 0.15;
  const orbParallax2 = scrollY * 0.35;
  const orbParallax3 = scrollY * 0.5;
  const contentParallax = scrollY * 0.08;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-bg pt-20"
      style={{ perspective: '1000px' }}
    >
      {/* Deep background layer — slowest */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translateY(${bgParallax}px)`,
          willChange: 'transform',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(108,99,255,0.07) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Orb layer 1 — slow */}
      <div
        className="absolute w-96 h-96 rounded-full pointer-events-none animate-orb-drift"
        style={{
          top: '10%',
          left: '-10%',
          background: 'radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
          transform: `translateY(${orbParallax1}px) translateX(${mousePos.x * -12}px)`,
          willChange: 'transform',
        }}
      />
      <div
        className="absolute w-80 h-80 rounded-full pointer-events-none"
        style={{
          top: '30%',
          right: '-8%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
          transform: `translateY(${orbParallax2}px) translateX(${mousePos.x * 10}px)`,
          willChange: 'transform',
          animation: 'orb-drift 14s ease-in-out infinite reverse',
        }}
      />
      <div
        className="absolute w-64 h-64 rounded-full pointer-events-none"
        style={{
          bottom: '15%',
          left: '20%',
          background: 'radial-gradient(circle, rgba(0,255,136,0.08) 0%, transparent 70%)',
          filter: 'blur(50px)',
          transform: `translateY(${orbParallax3}px) translateX(${mousePos.x * 8}px)`,
          willChange: 'transform',
          animation: 'orb-drift 18s ease-in-out infinite',
        }}
      />

      {/* Floating code snippets — mid layer with depth-based parallax */}
      {floatingSnippets?.map((snip) => (
        <div
          key={snip?.id}
          className="code-float animate-float-slow hidden md:block absolute"
          style={{
            top: snip?.top,
            left: snip?.left,
            right: snip?.right,
            animationDelay: snip?.delay,
            fontFamily: 'JetBrains Mono, Fira Code, monospace',
            fontSize: '12px',
            color: `rgba(108,99,255,${0.25 + snip.layer * 0.35})`,
            transform: `translateY(${scrollY * snip.layer * 0.4}px) translateX(${mousePos.x * snip.layer * -15}px)`,
            willChange: 'transform',
            filter: `blur(${(1 - snip.layer) * 1.5}px)`,
            transition: 'filter 0.1s',
          }}
        >
          {snip?.text}
        </div>
      ))}

      {/* Main content — near layer */}
      <div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{
          transform: `translateY(${contentParallax}px)`,
          willChange: 'transform',
        }}
      >
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{
            background: 'rgba(108,99,255,0.15)',
            border: '1px solid rgba(108,99,255,0.35)',
            color: 'var(--primary)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          India&apos;s #1 Coding Challenge for College Students
        </div>

        {/* Headline */}
        <h1
          className={`font-black leading-none mb-5 transition-all duration-700 delay-100 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ fontSize: 'clamp(2.8rem, 10vw, 6rem)' }}
        >
          <span className="text-foreground block">60 Days.</span>
          <span className="text-gradient-animated block">One Commit.</span>
          <span className="text-foreground block">Your Future.</span>
        </h1>

        {/* Sub */}
        <p
          className={`text-base md:text-xl font-medium text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          India&apos;s most consistent coding community for college students. Build daily. Post publicly. Get noticed.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-700 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Link
            href="/dashboard"
            className="btn-primary px-8 py-4 rounded-2xl font-black text-base text-center"
            style={{
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              boxShadow: '0 0 30px rgba(108,99,255,0.4)',
            }}
          >
            Start the Challenge →
          </Link>
          <a
            href="#how-it-works"
            className="btn-ghost px-8 py-4 rounded-2xl font-bold text-base text-center"
          >
            See How It Works
          </a>
        </div>

        {/* Stats */}
        <div
          className={`flex flex-wrap justify-center gap-4 md:gap-8 transition-all duration-700 delay-400 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {stats?.map((stat, i) => (
            <div key={stat?.id} className="flex items-center gap-3">
              {i > 0 && (
                <div className="hidden md:block w-px h-8 bg-white/10" />
              )}
              <div className="text-center">
                <p
                  className="font-black text-2xl text-gradient-primary"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {stat?.value}
                </p>
                <p className="text-xs font-semibold text-muted-foreground">{stat?.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="w-full flex flex-col items-center justify-center gap-2 animate-float mt-24 pb-10">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Scroll</p>
        <div
          className="w-5 h-9 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: '1.5px solid rgba(255,255,255,0.15)' }}
        >
          <div className="w-1 h-2 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
}