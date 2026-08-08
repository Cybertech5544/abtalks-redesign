'use client';

import React, { useEffect, useState } from 'react';

interface ProgressRingProps {
  completed: number;
  total: number;
  size?: number;
}

export default function ProgressRing({ completed, total, size = 160 }: ProgressRingProps) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const percentage = Math.round((completed / total) * 100);
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animated ? (percentage / 100) * circumference : 0);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="rotate-[-90deg]">
          <defs>
            <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--secondary)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={8}
          />

          {/* Progress arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#progress-gradient)"
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            filter="url(#glow)"
            className="progress-ring-circle"
            style={{
              transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-black text-foreground"
            style={{ fontSize: size * 0.22, fontVariantNumeric: 'tabular-nums' }}
          >
            {percentage}%
          </span>
          <span className="text-xs font-semibold text-muted-foreground mt-0.5">
            Complete
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex gap-2 w-full justify-center">
        <div
          className="flex-1 rounded-xl px-3 py-2 text-center"
          style={{ background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.15)' }}
        >
          <p className="text-base font-black text-accent" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {completed}
          </p>
          <p className="text-[10px] font-semibold text-muted-foreground">Done</p>
        </div>
        <div
          className="flex-1 rounded-xl px-3 py-2 text-center"
          style={{ background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.15)' }}
        >
          <p className="text-base font-black text-warning" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {total - completed}
          </p>
          <p className="text-[10px] font-semibold text-muted-foreground">Left</p>
        </div>
        <div
          className="flex-1 rounded-xl px-3 py-2 text-center"
          style={{ background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.15)' }}
        >
          <p className="text-base font-black text-primary" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {total}
          </p>
          <p className="text-[10px] font-semibold text-muted-foreground">Total</p>
        </div>
      </div>
    </div>
  );
}