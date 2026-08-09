'use client';

import React, { useEffect, useRef, useState } from 'react';
import { testimonials } from '@/data/mockData';
import { Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const [scrollY, setScrollY] = useState(0);
  const [viewportH, setViewportH] = useState(800);
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionTop, setSectionTop] = useState(9999);
  const ticking = useRef(false);

  useEffect(() => {
    setViewportH(window.innerHeight);
    const updateSectionTop = () => {
      if (sectionRef?.current) {
        setSectionTop(sectionRef?.current?.getBoundingClientRect()?.top + window.scrollY);
      }
    };
    updateSectionTop();
    window.addEventListener('resize', () => {
      setViewportH(window.innerHeight);
      updateSectionTop();
    });
    return () => window.removeEventListener('resize', updateSectionTop);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking?.current) {
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

  const relativeScroll = Math.max(0, scrollY - sectionTop + viewportH * 0.5);

  // Each card gets a different parallax speed
  const cardSpeeds = [0.06, 0.03, 0.09];

  return (
    <section ref={sectionRef} className="py-20 px-5 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
          Real Students, Real Outcomes
        </p>
        <h2 className="font-black text-3xl md:text-4xl text-foreground">
          What Builders Say
        </h2>
      </div>
      <div className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide py-12 md:py-0 md:grid md:grid-cols-3 md:overflow-visible">
        {testimonials?.map((t, idx) => {
          const speed = cardSpeeds?.[idx % cardSpeeds?.length];
          const direction = idx % 2 === 0 ? 1 : -1;
          const parallaxOffset = relativeScroll * speed * direction;

          return (
            <div
              key={t?.id}
              className="flex-shrink-0 w-72 md:w-auto rounded-2xl p-6 flex flex-col gap-4 card-hover"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                transform: `translateY(${parallaxOffset}px)`,
                willChange: 'transform',
                transition: 'box-shadow 0.3s ease',
              }}
            >
              <Quote size={20} className="text-primary opacity-60" />
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                &ldquo;{t?.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                    color: '#fff',
                  }}
                >
                  {t?.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{t?.name}</p>
                  <p className="text-xs text-muted-foreground">{t?.college}</p>
                </div>
                {t?.daysCompleted === 60 && (
                  <div
                    className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold"
                    style={{ background: 'rgba(0,255,136,0.15)', color: 'var(--accent)', border: '1px solid rgba(0,255,136,0.25)' }}
                  >
                    60/60 ✓
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}