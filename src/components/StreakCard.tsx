'use client';

import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';

interface StreakCardProps {
  currentStreak: number;
  longestStreak: number;
  streakHistory: boolean[];
  todaySubmitted: boolean;
  streakShields: number;
  currentDay: number;
}

export default function StreakCard({
  currentStreak,
  longestStreak,
  streakHistory,
  todaySubmitted,
  streakShields,
  currentDay,
}: StreakCardProps) {
  const isFirstDay = currentDay === 1 && currentStreak === 0;
  const isStreakBroken = currentStreak === 0 && currentDay > 1;

  return (
    <div
      className="relative rounded-2xl p-5 overflow-hidden animate-pulse-glow-green"
      style={{
        background: 'linear-gradient(135deg, rgba(0,255,136,0.08) 0%, rgba(0,212,255,0.05) 50%, rgba(108,99,255,0.08) 100%)',
        border: '1px solid rgba(0,255,136,0.2)',
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(0,255,136,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div>
          {isFirstDay ? (
            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-1">Start Your Streak!</p>
              <div className="flex items-center gap-2">
                <span className="text-4xl font-black text-foreground">🚀</span>
                <span className="text-xl font-bold text-foreground">Day 1</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Every legend starts at Day 1</p>
            </div>
          ) : isStreakBroken ? (
            <div>
              <p className="text-sm font-semibold text-warning mb-1">Streak Reset</p>
              <div className="flex items-center gap-3">
                <span className="text-4xl" style={{ filter: 'grayscale(0.5)' }}>💔</span>
                <div>
                  <p className="text-2xl font-black text-foreground">Start Fresh</p>
                  <p className="text-xs text-muted-foreground">Prev best: {longestStreak} days 💪</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">
                Current Streak
              </p>
              <div className="flex items-center gap-3">
                <span className="text-5xl animate-pulse-flame">🔥</span>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black text-foreground" style={{ fontVariantNumeric: 'tabular-nums' }}>
                      {currentStreak}
                    </span>
                    <span className="text-lg font-semibold text-muted-foreground">days</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Best: <span className="text-accent font-semibold">{longestStreak}</span> days
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Streak Shield */}
        <div className="shield-badge rounded-xl px-3 py-2 flex flex-col items-center gap-1">
          <div className="flex items-center gap-1">
            <Shield size={14} className="text-secondary" />
            <span className="text-secondary font-bold text-sm">{streakShields}</span>
          </div>
          <span className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wider">
            Shield{streakShields !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* 14-day history */}
      <div className="relative z-10">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">
          Last 14 days
        </p>
        <div className="flex gap-1.5 flex-wrap">
          {streakHistory.map((done, i) => (
            <div
              key={`streak-day-${i + 1}`}
              className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] transition-transform hover:scale-110"
              style={{
                background: done
                  ? 'rgba(0,255,136,0.25)'
                  : 'rgba(255,107,53,0.2)',
                border: done
                  ? '1px solid rgba(0,255,136,0.4)'
                  : '1px solid rgba(255,107,53,0.3)',
              }}
              title={done ? `Day ${i + 1}: ✓` : `Day ${i + 1}: Missed`}
            >
              {done ? (
                <span className="text-accent text-[9px] font-bold">✓</span>
              ) : (
                <span className="text-warning text-[9px]">✕</span>
              )}
            </div>
          ))}
          {/* Future days */}
          {Array.from({ length: Math.max(0, 14 - streakHistory.length) }).map((_, i) => (
            <div
              key={`streak-future-${i + 1}`}
              className="w-6 h-6 rounded-md"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Today warning */}
      {!todaySubmitted && !isFirstDay && !isStreakBroken && (
        <div
          className="mt-4 relative z-10 flex items-center gap-2 rounded-xl px-3 py-2"
          style={{
            background: 'rgba(255,107,53,0.1)',
            border: '1px solid rgba(255,107,53,0.25)',
          }}
        >
          <AlertTriangle size={14} className="text-warning flex-shrink-0" />
          <p className="text-xs font-semibold text-warning">
            Submit today to keep your streak alive!
          </p>
        </div>
      )}

      {todaySubmitted && (
        <div
          className="mt-4 relative z-10 flex items-center gap-2 rounded-xl px-3 py-2"
          style={{
            background: 'rgba(0,255,136,0.1)',
            border: '1px solid rgba(0,255,136,0.25)',
          }}
        >
          <span className="text-sm">✅</span>
          <p className="text-xs font-semibold text-accent">Today's submission complete!</p>
        </div>
      )}
    </div>
  );
}