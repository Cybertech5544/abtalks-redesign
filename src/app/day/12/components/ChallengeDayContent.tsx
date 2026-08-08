'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { challengeDay12, studentData } from '@/data/mockData';
import SubmissionForm from '@/components/SubmissionForm';
import BottomNav from '@/components/BottomNav';
import {
  ArrowLeft,
  Clock,
  Star,
  ChevronDown,
  ExternalLink,
  FileText,
  Package,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Zap,
} from 'lucide-react';

function getTimeUntilMidnight(): { hours: string; minutes: string; seconds: string } {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(23, 59, 59, 999);
  const diff = midnight.getTime() - now.getTime();
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return {
    hours: String(h).padStart(2, '0'),
    minutes: String(m).padStart(2, '0'),
    seconds: String(s).padStart(2, '0'),
  };
}

export default function ChallengeDayContent() {
  const { day } = challengeDay12;
  const { student } = studentData;

  const [checkedObjectives, setCheckedObjectives] = useState<Set<string>>(new Set());
  const [hintsOpen, setHintsOpen] = useState(false);
  const [countdown, setCountdown] = useState({ hours: '00', minutes: '00', seconds: '00' });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setCountdown(getTimeUntilMidnight());
    const t = setTimeout(() => setVisible(true), 100);
    const interval = setInterval(() => {
      setCountdown(getTimeUntilMidnight());
    }, 1000);
    return () => {
      clearTimeout(t);
      clearInterval(interval);
    };
  }, []);

  const toggleObjective = (id: string) => {
    setCheckedObjectives((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const objectivesProgress = Math.round((checkedObjectives.size / day.objectives.length) * 100);
  const isUrgent = parseInt(countdown.hours) < 3;

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--background)' }}>
      {/* Background orb */}
      <div
        className="fixed top-0 right-0 w-72 h-72 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Countdown banner */}
      {!student.todaySubmitted && (
        <div
          className="sticky top-0 z-50 px-4 py-2.5 flex items-center justify-between gap-3"
          style={{
            background: isUrgent ? 'rgba(255,107,53,0.15)' : 'rgba(255,107,53,0.08)',
            borderBottom: `1px solid ${isUrgent ? 'rgba(255,107,53,0.4)' : 'rgba(255,107,53,0.2)'}`,
          }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <AlertTriangle size={14} className="text-warning flex-shrink-0" />
            <span className="text-xs font-bold text-warning truncate">
              ⚡ Submit before midnight — {student.currentStreak}-day streak at risk!
            </span>
          </div>
          <div
            className="flex items-center gap-0.5 flex-shrink-0"
            style={{ fontVariantNumeric: 'tabular-nums', fontFamily: 'monospace' }}
          >
            <span className="text-xs font-black text-warning countdown-digit">{countdown.hours}</span>
            <span className="text-warning text-xs font-black">:</span>
            <span className="text-xs font-black text-warning countdown-digit">{countdown.minutes}</span>
            <span className="text-warning text-xs font-black">:</span>
            <span className="text-xs font-black text-warning countdown-digit animate-countdown">{countdown.seconds}</span>
          </div>
        </div>
      )}

      {/* Top Nav */}
      <header
        className="glass-dark px-5 py-3"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-semibold">Day {day.number}</span>
          </Link>
          <div className="flex items-center gap-2">
            <div
              className="px-2.5 py-1 rounded-lg text-xs font-bold"
              style={{
                background: 'rgba(108,99,255,0.15)',
                color: 'var(--primary)',
                border: '1px solid rgba(108,99,255,0.25)',
              }}
            >
              {day.track}
            </div>
            <div className="xp-badge px-3 py-1 rounded-lg text-xs font-black flex items-center gap-1">
              <Zap size={11} />
              +{day.xpReward} XP
            </div>
          </div>
        </div>
      </header>

      <div className="px-5 pt-5 max-w-lg mx-auto space-y-4">

        {/* Day Header Card */}
        <div
          className={`rounded-2xl p-5 relative overflow-hidden transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{
            background: 'linear-gradient(135deg, rgba(108,99,255,0.12), rgba(0,212,255,0.06))',
            border: '1px solid rgba(108,99,255,0.25)',
          }}
        >
          <div
            className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at top right, rgba(0,212,255,0.1), transparent 70%)',
            }}
          />
          <div
            className="inline-flex items-center px-3 py-1 rounded-xl mb-3 relative z-10"
            style={{ background: 'rgba(108,99,255,0.2)', border: '1px solid rgba(108,99,255,0.4)' }}
          >
            <span className="font-black text-xs tracking-widest text-primary uppercase">
              DAY {day.number}
            </span>
          </div>
          <h1 className="font-black text-xl text-foreground leading-tight mb-3 relative z-10">
            {day.title}
          </h1>
          <div className="flex flex-wrap gap-3 mb-3 relative z-10">
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((s) => (
                <Star key={`hdr-star-${s}`} size={12} style={{ color: 'var(--gold)', fill: 'var(--gold)' }} />
              ))}
              <span className="text-xs font-semibold text-muted-foreground ml-1">{day.difficulty}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={12} className="text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">{day.estimatedTime}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 relative z-10">
            {day.tags.map((tag) => (
              <span
                key={`hdr-tag-${tag}`}
                className="px-2.5 py-0.5 rounded-lg text-[11px] font-bold"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div
          className={`rounded-2xl p-5 transition-all duration-500 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
            The Challenge
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {day.description}
          </p>
        </div>

        {/* Objectives */}
        <div
          className={`rounded-2xl p-5 transition-all duration-500 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              What to Build
            </p>
            <span
              className="text-xs font-black px-2 py-0.5 rounded-full"
              style={{
                background: checkedObjectives.size === day.objectives.length
                  ? 'rgba(0,255,136,0.15)'
                  : 'rgba(108,99,255,0.15)',
                color: checkedObjectives.size === day.objectives.length
                  ? 'var(--accent)'
                  : 'var(--primary)',
              }}
            >
              {checkedObjectives.size}/{day.objectives.length}
            </span>
          </div>

          {/* Progress bar */}
          <div
            className="h-1.5 rounded-full mb-4 overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${objectivesProgress}%`,
                background: objectivesProgress === 100
                  ? 'linear-gradient(90deg, var(--accent), var(--secondary))'
                  : 'linear-gradient(90deg, var(--primary), var(--secondary))',
              }}
            />
          </div>

          {/* Objectives list */}
          <div className="space-y-2">
            {day.objectives.map((obj) => {
              const checked = checkedObjectives.has(obj.id);
              return (
                <button
                  key={obj.id}
                  onClick={() => toggleObjective(obj.id)}
                  className="w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all duration-200"
                  style={{
                    background: checked ? 'rgba(0,255,136,0.06)' : 'rgba(255,255,255,0.02)',
                    border: checked
                      ? '1px solid rgba(0,255,136,0.2)'
                      : '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200"
                    style={{
                      background: checked ? 'var(--accent)' : 'rgba(255,255,255,0.06)',
                      border: checked ? '1px solid var(--accent)' : '1px solid rgba(255,255,255,0.15)',
                    }}
                  >
                    {checked && (
                      <span className="text-background text-[11px] font-black">✓</span>
                    )}
                  </div>
                  <p
                    className="text-sm font-medium leading-relaxed transition-all duration-200"
                    style={{
                      color: checked ? 'var(--muted-foreground)' : 'var(--foreground)',
                      textDecoration: checked ? 'line-through' : 'none',
                    }}
                  >
                    {obj.text}
                  </p>
                </button>
              );
            })}
          </div>

          {checkedObjectives.size === day.objectives.length && (
            <div
              className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl animate-fade-in"
              style={{
                background: 'rgba(0,255,136,0.1)',
                border: '1px solid rgba(0,255,136,0.25)',
              }}
            >
              <span className="text-base">🎉</span>
              <p className="text-xs font-bold text-accent">
                All objectives done! Time to submit your proof.
              </p>
            </div>
          )}
        </div>

        {/* Resources */}
        <div
          className={`rounded-2xl p-5 transition-all duration-500 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
            Resources
          </p>
          <div className="space-y-2">
            {day.resources.map((res) => (
              <a
                key={res.id}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:border-white/20 group"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: res.type === 'docs'
                      ? 'rgba(108,99,255,0.15)' :'rgba(0,212,255,0.15)',
                    border: res.type === 'docs' ?'1px solid rgba(108,99,255,0.25)' :'1px solid rgba(0,212,255,0.25)',
                  }}
                >
                  {res.type === 'docs' ? (
                    <FileText size={14} style={{ color: 'var(--primary)' }} />
                  ) : (
                    <Package size={14} style={{ color: 'var(--secondary)' }} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                    {res.title}
                  </p>
                  <p className="text-[11px] font-medium text-muted-foreground capitalize">{res.type}</p>
                </div>
                <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>

        {/* Hints (collapsible) */}
        <div
          className={`rounded-2xl overflow-hidden transition-all duration-500 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{
            background: 'rgba(255,215,0,0.04)',
            border: '1px solid rgba(255,215,0,0.15)',
          }}
        >
          <button
            onClick={() => setHintsOpen(!hintsOpen)}
            className="w-full flex items-center justify-between px-5 py-4 transition-colors hover:bg-white/5"
          >
            <div className="flex items-center gap-2">
              <span className="text-base">💡</span>
              <p className="text-sm font-bold text-foreground">Need a hint?</p>
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                style={{ background: 'rgba(255,215,0,0.15)', color: 'var(--gold)' }}
              >
                {day.hints.length} hints
              </span>
            </div>
            <ChevronDown
              size={16}
              className="text-muted-foreground transition-transform duration-300"
              style={{ transform: hintsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>

          {hintsOpen && (
            <div className="px-5 pb-4 space-y-2 animate-fade-in">
              {day.hints.map((hint, i) => (
                <div
                  key={`hint-${i + 1}`}
                  className="flex items-start gap-3 p-3 rounded-xl"
                  style={{
                    background: 'rgba(255,215,0,0.06)',
                    border: '1px solid rgba(255,215,0,0.1)',
                  }}
                >
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(255,215,0,0.2)', color: 'var(--gold)' }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed">{hint}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submission Section */}
        <div
          className={`rounded-2xl p-5 transition-all duration-500 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{
            background: 'linear-gradient(135deg, rgba(108,99,255,0.08), rgba(0,212,255,0.04))',
            border: '1px solid rgba(108,99,255,0.2)',
          }}
        >
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
              Proof of Work
            </p>
            <h2 className="font-black text-lg text-foreground">Submit Your Proof</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Push to GitHub + post on LinkedIn to lock in your streak
            </p>
          </div>

          <SubmissionForm
            dayNumber={day.number}
            currentStreak={student.currentStreak}
            streakShields={student.streakShields}
          />
        </div>

        {/* Day Navigation */}
        <div
          className={`flex gap-3 transition-all duration-500 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <Link
            href="/day/12"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm btn-ghost"
          >
            <ChevronLeft size={16} />
            Day {day.number - 1}
          </Link>
          <Link
            href="/day/12"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm btn-ghost"
          >
            Day {day.number + 1}
            <ChevronRight size={16} />
          </Link>
        </div>

      </div>

      <BottomNav />
    </div>
  );
}