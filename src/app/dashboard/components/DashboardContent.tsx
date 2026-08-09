'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { studentData, allBadges, leaderboardData } from '@/data/mockData';
import StreakCard from '@/components/StreakCard';
import ProgressRing from '@/components/ProgressRing';
import BadgeCard from '@/components/BadgeCard';
import BottomNav from '@/components/BottomNav';
import {
  Bell,
  Clock,
  Star,
  Trophy,
  GitCommit,
  Calendar,
  ChevronRight,
  TrendingUp,
  Zap,
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';

function LinkedinIcon({ size = 16, style = {} }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function getGreeting() {
  const hour = new Date()?.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  if (hour < 21) return 'Good evening';
  return 'Late night grind';
}

export default function DashboardContent() {
  const { student } = studentData;
  const [greeting, setGreeting] = useState('Good evening');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setGreeting(getGreeting());
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const progressPercent = Math.round((student?.completedDays / student?.totalDays) * 100);

  return (
    <div className="min-h-screen pb-24 relative" style={{ background: 'var(--background)' }}>
      {/* Background orbs */}
      <div
        className="fixed top-0 left-0 w-80 h-80 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="fixed top-20 right-0 w-64 h-64 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      {/* Top Bar */}
      <header
        className="sticky top-0 z-40 glass-dark px-5 py-3"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs"
              style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
            >
              AB
            </div>
            <span className="font-black text-sm text-foreground">ABTalks</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-white/5"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <Bell size={16} className="text-muted-foreground" />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ background: 'var(--warning)' }}
              />
            </button>
            <Link
              href="/profile"
              className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs cursor-pointer transition-opacity hover:opacity-80 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, var(--primary), #8B83FF)',
                color: '#fff',
              }}
            >
              {student?.avatar}
            </Link>
          </div>
        </div>
      </header>
      <div className="px-5 pt-5 max-w-lg mx-auto space-y-4">
        {/* Greeting Card */}
        <div
          className={`rounded-2xl p-4 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{
            background: 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(0,212,255,0.05))',
            border: '1px solid rgba(108,99,255,0.2)',
          }}
        >
          <p className="text-lg font-black text-foreground">
            {greeting}, {student?.name?.split(' ')?.[0]} 👋
          </p>
          <p className="text-sm font-semibold text-muted-foreground mt-0.5">
            Day {student?.currentDay} of {student?.totalDays} · {student?.track}
          </p>
        </div>

        {/* Streak Hero */}
        <div
          className={`transition-all duration-500 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <StreakCard
            currentStreak={student?.currentStreak}
            longestStreak={student?.longestStreak}
            streakHistory={student?.streakHistory}
            todaySubmitted={student?.todaySubmitted}
            streakShields={student?.streakShields}
            currentDay={student?.currentDay}
          />
        </div>

        {/* Today's Task */}
        <div
          className={`rounded-2xl p-5 transition-all duration-500 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{
                  background: 'rgba(255,107,53,0.15)',
                  border: '1px solid rgba(255,107,53,0.25)',
                }}
              >
                <Zap size={14} className="text-warning" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Day {student?.currentDay} · Today
                </p>
              </div>
            </div>
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
              style={{
                background: 'rgba(255,107,53,0.1)',
                border: '1px solid rgba(255,107,53,0.2)',
              }}
            >
              <Clock size={11} className="text-warning" />
              <span className="text-[10px] font-bold text-warning">Due midnight</span>
            </div>
          </div>

          <h3 className="text-base font-black text-foreground mb-2">
            Build a REST API with Authentication
          </h3>

          {/* Meta row */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3]?.map((s) => (
                <Star
                  key={`task-star-${s}`}
                  size={11}
                  style={{ color: 'var(--gold)', fill: 'var(--gold)' }}
                />
              ))}
              <span className="text-[11px] font-semibold text-muted-foreground ml-1">Medium</span>
            </div>
            <span className="text-muted-foreground text-xs">·</span>
            <div className="flex items-center gap-1">
              <Clock size={11} className="text-muted-foreground" />
              <span className="text-[11px] text-muted-foreground font-medium">~3 hours</span>
            </div>
            <span className="text-muted-foreground text-xs">·</span>
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-bold xp-badge px-2 py-0.5 rounded-full">
                +250 XP
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {['NodeJS', 'Express', 'JWT']?.map((tag) => (
              <span
                key={`task-tag-${tag}`}
                className="px-2 py-0.5 rounded-lg text-[11px] font-bold"
                style={{
                  background: 'rgba(108,99,255,0.12)',
                  color: 'var(--primary)',
                  border: '1px solid rgba(108,99,255,0.2)',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Link
              href="/day/12"
              className="flex-1 py-3 rounded-xl font-bold text-sm text-center transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                color: '#fff',
                boxShadow: '0 4px 15px rgba(108,99,255,0.3)',
              }}
            >
              View Task →
            </Link>
            <Link
              href="/day/12"
              className="flex-1 py-3 rounded-xl font-bold text-sm text-center btn-ghost"
            >
              Submit Proof ✓
            </Link>
          </div>
        </div>

        {/* Progress Overview */}
        <div
          className={`rounded-2xl p-5 transition-all duration-500 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={16} className="text-primary" />
            <p className="text-sm font-black text-foreground">Your Journey</p>
          </div>
          <ProgressRing completed={student?.completedDays} total={student?.totalDays} />
        </div>

        {/* Quick Stats 2x2 */}
        <div
          className={`grid grid-cols-2 gap-3 transition-all duration-500 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {[
            {
              id: 'qs-commits',
              icon: GitCommit,
              label: 'GitHub Commits',
              value: '47',
              color: 'var(--accent)',
              bg: 'rgba(0,255,136,0.08)',
              border: 'rgba(0,255,136,0.15)',
            },
            {
              id: 'qs-posts',
              icon: LinkedinIcon,
              label: 'LinkedIn Posts',
              value: '11',
              color: '#0A66C2',
              bg: 'rgba(10,102,194,0.1)',
              border: 'rgba(10,102,194,0.2)',
            },
            {
              id: 'qs-remaining',
              icon: Calendar,
              label: 'Days Remaining',
              value: '48',
              color: 'var(--secondary)',
              bg: 'rgba(0,212,255,0.08)',
              border: 'rgba(0,212,255,0.15)',
            },
            {
              id: 'qs-completion',
              icon: Star,
              label: 'Completion',
              value: `${progressPercent}%`,
              color: 'var(--primary)',
              bg: 'rgba(108,99,255,0.08)',
              border: 'rgba(108,99,255,0.15)',
            },
          ]?.map((stat) => {
            const Icon = stat?.icon;
            return (
              <div
                key={stat?.id}
                className="rounded-2xl p-4"
                style={{ background: stat?.bg, border: `1px solid ${stat?.border}` }}
              >
                <Icon size={16} style={{ color: stat?.color }} className="mb-2" />
                <p
                  className="text-2xl font-black"
                  style={{ color: stat?.color, fontVariantNumeric: 'tabular-nums' }}
                >
                  {stat?.value}
                </p>
                <p className="text-[11px] font-semibold text-muted-foreground mt-0.5">
                  {stat?.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Leaderboard Teaser */}
        <div
          id="leaderboard" // <--- ঠিক এখানে id টা বসিয়ে দিন
          className={`rounded-2xl p-5 transition-all duration-500 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy size={16} className="text-gold" />
              <p className="text-sm font-black text-foreground">Your Standing</p>
            </div>
            <div
              className="px-2.5 py-1 rounded-full text-[10px] font-bold"
              style={{
                background: 'rgba(0,255,136,0.12)',
                color: 'var(--accent)',
                border: '1px solid rgba(0,255,136,0.2)',
              }}
            >
              Top 4% this week
            </div>
          </div>

          {/* Rank card */}
          <div
            className="rounded-xl p-3 mb-4 flex items-center gap-3"
            style={{
              background: 'rgba(108,99,255,0.12)',
              border: '1px solid rgba(108,99,255,0.25)',
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-base"
              style={{
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                color: '#fff',
              }}
            >
              #{student?.rank}
            </div>
            <div className="flex-1">
              <p className="text-sm font-black text-foreground">
                Rank {student?.rank} of {student?.totalStudents?.toLocaleString()}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div
                  className="flex-1 h-1.5 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${((student?.totalStudents - student?.rank) / student?.totalStudents) * 100}%`,
                      background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                    }}
                  />
                </div>
                <span className="text-[10px] font-bold text-muted-foreground">
                  {student?.xp?.toLocaleString()} XP
                </span>
              </div>
            </div>
            <div
              className="px-2 py-1 rounded-lg text-xs font-bold"
              style={{
                background: 'rgba(255,215,0,0.15)',
                color: 'var(--gold)',
                border: '1px solid rgba(255,215,0,0.2)',
              }}
            >
              {student?.level}
            </div>
          </div>

          {/* Mini leaderboard */}
          <div className="space-y-2">
            {leaderboardData?.topStudents?.map((s) => (
              <div
                key={s?.id}
                className="flex items-center gap-3 rounded-xl px-3 py-2 transition-colors"
                style={{
                  background: s?.isCurrentUser ? 'rgba(108,99,255,0.1)' : 'transparent',
                  border: s?.isCurrentUser
                    ? '1px solid rgba(108,99,255,0.2)'
                    : '1px solid transparent',
                }}
              >
                <span
                  className="text-xs font-black w-6 text-right"
                  style={{
                    color:
                      s?.rank <= 3
                        ? 'var(--gold)'
                        : s?.isCurrentUser
                          ? 'var(--primary)'
                          : 'var(--muted-foreground)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  #{s?.rank}
                </span>
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[11px] flex-shrink-0"
                  style={{
                    background: s?.isCurrentUser
                      ? 'linear-gradient(135deg, var(--primary), var(--secondary))'
                      : 'rgba(255,255,255,0.08)',
                    color: '#fff',
                  }}
                >
                  {s?.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-xs font-bold truncate ${s?.isCurrentUser ? 'text-primary' : 'text-foreground'}`}
                  >
                    {s?.name} {s?.isCurrentUser ? '(You)' : ''}
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">{s?.college}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p
                    className="text-xs font-bold text-foreground"
                    style={{ fontVariantNumeric: 'tabular-nums' }}
                  >
                    {s?.xp?.toLocaleString()}
                  </p>
                  <p className="text-[9px] text-muted-foreground">XP</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-1.5 mt-4 text-xs font-bold text-primary hover:opacity-80 transition-opacity"
          >
            Full Leaderboard <ChevronRight size={13} />
          </Link>
        </div>

        {/* Badges */}
        <div
          className={`rounded-2xl p-5 transition-all duration-500 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-black text-foreground">Badges Earned</p>
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-bold"
              style={{ background: 'rgba(108,99,255,0.15)', color: 'var(--primary)' }}
            >
              {allBadges?.filter((b) => b?.earned)?.length}/{allBadges?.length}
            </span>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            {allBadges?.map((badge) => (
              <BadgeCard
                key={badge?.id}
                emoji={badge?.emoji}
                name={badge?.name}
                description={badge?.description}
                earned={badge?.earned}
              />
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
