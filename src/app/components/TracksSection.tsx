'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { tracks } from '@/data/mockData';
import { ArrowRight, Users, Star } from 'lucide-react';

export default function TracksSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="tracks" className="py-20 px-5 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
          Pick Your Path
        </p>
        <h2 className="font-black text-3xl md:text-4xl text-foreground mb-3">
          Choose Your Track
        </h2>
        <p className="text-muted-foreground text-base max-w-md mx-auto">
          60 days of real, focused challenges. Pick one track and go deep.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tracks?.map((track) => (
          <div
            key={track?.id}
            className="track-card rounded-2xl p-6 relative overflow-hidden"
            style={{
              background: hoveredId === track?.id
                ? `linear-gradient(135deg, ${track?.accentColor}, rgba(255,255,255,0.03))`
                : 'rgba(255,255,255,0.03)',
              border: `1px solid ${hoveredId === track?.id ? track?.borderColor : 'rgba(255,255,255,0.08)'}`,
            }}
            onMouseEnter={() => setHoveredId(track?.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Glow top */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: hoveredId === track?.id
                  ? `linear-gradient(90deg, transparent, ${track?.borderColor}, transparent)`
                  : 'transparent',
                transition: 'background 0.3s ease',
              }}
            />

            <div className="text-4xl mb-4">{track?.emoji}</div>

            <h3 className="font-black text-lg text-foreground mb-1">{track?.name}</h3>
            <p className="text-sm font-semibold text-muted-foreground mb-3">{track?.tagline}</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">{track?.description}</p>

            {/* Difficulty */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {Array.from({ length: 5 })?.map((_, i) => (
                  <Star
                    key={`star-${track?.id}-${i + 1}`}
                    size={12}
                    className={i < track?.difficulty ? 'text-gold fill-gold' : 'text-muted-foreground'}
                    style={{ color: i < track?.difficulty ? 'var(--gold)' : undefined, fill: i < track?.difficulty ? 'var(--gold)' : 'transparent' }}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground font-medium">
                {track?.difficulty === 4 ? 'Advanced' : 'Intermediate'}
              </span>
            </div>

            {/* Students */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Users size={13} className="text-muted-foreground" />
                <span className="text-xs font-semibold text-muted-foreground">
                  {track?.students?.toLocaleString()} students
                </span>
              </div>
              <Link
                href="/dashboard"
                className="flex items-center gap-1 text-xs font-bold transition-all duration-200 hover:gap-2"
                style={{ color: 'var(--primary)' }}
              >
                Explore <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}