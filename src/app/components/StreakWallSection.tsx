'use client';

import React, { useState } from 'react';

// Deterministic mock pattern for 60 days — no Math.random()
const streakPattern = [
  true, true, false, true, true, true, true,
  true, true, true, false, true, true, true,
  true, true, true, true, true, false, true,
  true, true, true, true, true, true, true,
  false, true, true, true, true, true, true,
  true, true, false, true, true, true, true,
  true, true, true, true, true, false, true,
  true, true, true, true, true, true, true,
  true, false, true, true,
];

const milestones = new Set([7, 14, 21, 30, 45, 60]);

export default function StreakWallSection() {
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  return (
    <section className="py-20 px-5 max-w-3xl mx-auto text-center">
      <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
        Community Progress
      </p>
      <h2 className="font-black text-3xl md:text-4xl text-foreground mb-3">
        The Streak Wall
      </h2>
      <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">
        Every square is a day someone chose to show up. 60 squares. 60 choices.
      </p>
      <div
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="flex flex-wrap gap-1.5 justify-center">
          {Array.from({ length: 60 })?.map((_, i) => {
            const dayNum = i + 1;
            const done = streakPattern?.[i] ?? false;
            const isMilestone = milestones?.has(dayNum);
            const isHovered = hoveredDay === dayNum;

            return (
              <div
                key={`wall-day-${dayNum}`}
                className="streak-square relative cursor-pointer"
                style={{
                  background: done
                    ? isMilestone
                      ? 'linear-gradient(135deg, var(--accent), var(--secondary))'
                      : 'rgba(0,255,136,0.35)' :'rgba(255,255,255,0.04)',
                  border: done
                    ? isMilestone
                      ? '1px solid rgba(0,255,136,0.6)'
                      : '1px solid rgba(0,255,136,0.3)' :'1px solid rgba(255,255,255,0.06)',
                  width: '14px',
                  height: '14px',
                  borderRadius: '3px',
                  boxShadow: isHovered && done ? '0 0 8px rgba(0,255,136,0.5)' : 'none',
                  transform: isHovered ? 'scale(1.4)' : 'scale(1)',
                  transition: 'all 0.15s ease',
                  zIndex: isHovered ? 10 : 1,
                }}
                onMouseEnter={() => setHoveredDay(dayNum)}
                onMouseLeave={() => setHoveredDay(null)}
                title={`Day ${dayNum}${isMilestone ? ' 🔥 Milestone' : ''}: ${done ? '✓ Completed' : '○ Open'}`}
              >
                {isMilestone && done && (
                  <span
                    className="absolute inset-0 flex items-center justify-center text-[6px]"
                    style={{ pointerEvents: 'none' }}
                  >
                    🔥
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-5 flex-wrap">
          {[
            { id: 'legend-done', color: 'rgba(0,255,136,0.35)', label: 'Completed' },
            { id: 'legend-milestone', color: 'linear-gradient(135deg, var(--accent), var(--secondary))', label: 'Milestone' },
            { id: 'legend-open', color: 'rgba(255,255,255,0.04)', label: 'Open' },
          ]?.map((item) => (
            <div key={item?.id} className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ background: item?.color, border: '1px solid rgba(255,255,255,0.1)' }}
              />
              <span className="text-[11px] font-semibold text-muted-foreground">{item?.label}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-4">
        Hover over any square to see the day number
      </p>
    </section>
  );
}