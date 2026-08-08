import React from 'react';
import { Lock } from 'lucide-react';

interface BadgeCardProps {
  emoji: string;
  name: string;
  description: string;
  earned: boolean;
}

export default function BadgeCard({ emoji, name, description, earned }: BadgeCardProps) {
  return (
    <div
      className="flex-shrink-0 rounded-2xl p-4 flex flex-col items-center gap-2 transition-all duration-300"
      style={{
        width: '120px',
        background: earned
          ? 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(0,212,255,0.08))'
          : 'rgba(255,255,255,0.03)',
        border: earned
          ? '1px solid rgba(108,99,255,0.3)'
          : '1px solid rgba(255,255,255,0.06)',
        opacity: earned ? 1 : 0.5,
        filter: earned ? 'none' : 'grayscale(1)',
      }}
    >
      <div className="relative">
        <span className="text-3xl">{emoji}</span>
        {!earned && (
          <div
            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(20,20,30,0.9)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <Lock size={10} className="text-muted-foreground" />
          </div>
        )}
      </div>
      <p className="text-xs font-bold text-foreground text-center leading-tight">{name}</p>
      <p className="text-[10px] text-muted-foreground text-center leading-tight">{description}</p>
      {earned && (
        <div
          className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
          style={{ background: 'rgba(0,255,136,0.15)', color: 'var(--accent)' }}
        >
          Earned
        </div>
      )}
    </div>
  );
}