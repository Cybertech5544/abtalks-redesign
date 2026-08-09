'use client';

import React, { useState, useEffect } from 'react'; // <-- useEffect ইমপোর্ট করা হয়েছে
import { CheckCircle2, Loader2, Shield } from 'lucide-react';
import Link from 'next/link';
import ConfettiExplosion from './ConfettiExplosion';

function GithubIcon({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18, style = {} }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

interface SubmissionFormProps {
  dayNumber: number;
  currentStreak: number;
  streakShields: number;
  onSuccess?: () => void;
  demoTrigger?: number;
}

function isValidGithubUrl(url: string): boolean {
  return /^https?:\/\/(www\.)?github\.com\/.+/.test(url.trim());
}

function isValidLinkedinUrl(url: string): boolean {
  return /^https?:\/\/(www\.)?linkedin\.com\/(posts|in|feed)\/.+/.test(url.trim());
}

export default function SubmissionForm({
  dayNumber,
  currentStreak,
  streakShields,
  onSuccess,
  demoTrigger
}: SubmissionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [useShield, setUseShield] = useState(false);
  const [githubValue, setGithubValue] = useState('');
  const [linkedinValue, setLinkedinValue] = useState('');
  const [githubError, setGithubError] = useState('');
  const [linkedinError, setLinkedinError] = useState('');

  const githubValid = isValidGithubUrl(githubValue);
  const linkedinValid = isValidLinkedinUrl(linkedinValue);
  const canSubmit = githubValid && linkedinValid;

  // ✨ ডেমো ডেটা ফিল করার লজিক ✨
  useEffect(() => {
    if (demoTrigger && demoTrigger > 0) {
      setGithubValue('https://github.com/Cybertech5544/abtalks-challenge-day12');
      setLinkedinValue('https://linkedin.com/posts/ritesh-saha-a8881126b/my-abtalks-submission');
      setGithubError('');
      setLinkedinError('');
    }
  }, [demoTrigger]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    
    if (!githubValue) {
      setGithubError('GitHub URL is required');
      hasError = true;
    } else if (!githubValid) {
      setGithubError('Must be a valid github.com URL');
      hasError = true;
    } else setGithubError('');

    if (!linkedinValue) {
      setLinkedinError('LinkedIn URL is required');
      hasError = true;
    } else if (!linkedinValid) {
      setLinkedinError('Must be a valid linkedin.com URL');
      hasError = true;
    } else setLinkedinError('');

    if (hasError) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1800));
    setIsSubmitting(false);

    // Trigger confetti
    setShowConfetti(true);
    setTimeout(() => {
      setSubmitted(true);
      onSuccess?.();
    }, 600);
  };

  return (
    <>
      <ConfettiExplosion active={showConfetti} onComplete={() => setShowConfetti(false)} />

      {submitted ? (
        <div
          className="rounded-2xl p-8 flex flex-col items-center gap-4 text-center animate-in zoom-in-95 duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(0,255,136,0.1), rgba(0,212,255,0.05))',
            border: '1px solid rgba(0,255,136,0.3)',
          }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center animate-bounce"
            style={{ background: 'rgba(0,255,136,0.2)' }}
          >
            <CheckCircle2 size={32} className="text-green-400" />
          </div>
          <div>
            <p className="text-xl font-black text-white">Day {dayNumber} Complete!</p>
            <p className="text-sm text-gray-400 mt-1">
              Streak: {currentStreak + 1} days 🔥 · +250 XP earned
            </p>
          </div>
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-xl font-bold text-sm text-white mt-2 transition-transform hover:scale-105 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)' }}
          >
            Back to Dashboard →
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div
            className="rounded-2xl p-4 transition-all duration-300"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: githubValid
                ? '1px solid rgba(0,255,136,0.35)'
                : githubError 
                  ? '1px solid rgba(251,146,60,0.4)' 
                  : '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <GithubIcon size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">GitHub Repository / Commit</p>
                <p className="text-[11px] text-gray-400">Link to your repo or specific commit</p>
              </div>
              {githubValid && (
                <CheckCircle2 size={18} className="text-green-400 ml-auto flex-shrink-0 animate-in zoom-in duration-300" />
              )}
            </div>
            <input
              type="url"
              value={githubValue}
              onChange={(e) => {
                setGithubValue(e.target.value);
                setGithubError('');
              }}
              placeholder="https://github.com/username/repo/commit/..."
              className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 outline-none transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: githubValid
                  ? '1px solid rgba(0,255,136,0.4)'
                  : '1px solid rgba(255,255,255,0.1)',
              }}
            />
            {githubError && (
              <p className="text-[11px] text-orange-400 mt-1.5 flex items-center gap-1 animate-in slide-in-from-top-1">
                <span>⚠</span> {githubError}
              </p>
            )}
          </div>

          <div
            className="rounded-2xl p-4 transition-all duration-300"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: linkedinValid
                ? '1px solid rgba(0,255,136,0.35)'
                : linkedinError 
                  ? '1px solid rgba(251,146,60,0.4)'
                  : '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(10,102,194,0.2)',
                  border: '1px solid rgba(10,102,194,0.3)',
                }}
              >
                <LinkedinIcon size={18} style={{ color: '#0A66C2' }} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">LinkedIn Post</p>
                <p className="text-[11px] text-gray-400">Share what you built publicly</p>
              </div>
              {linkedinValid && (
                <CheckCircle2 size={18} className="text-green-400 ml-auto flex-shrink-0 animate-in zoom-in duration-300" />
              )}
            </div>
            <input
              type="url"
              value={linkedinValue}
              onChange={(e) => {
                setLinkedinValue(e.target.value);
                setLinkedinError('');
              }}
              placeholder="https://linkedin.com/posts/..."
              className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 outline-none transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: linkedinValid
                  ? '1px solid rgba(0,255,136,0.4)'
                  : '1px solid rgba(255,255,255,0.1)',
              }}
            />
            {linkedinError && (
              <p className="text-[11px] text-orange-400 mt-1.5 flex items-center gap-1 animate-in slide-in-from-top-1">
                <span>⚠</span> {linkedinError}
              </p>
            )}
          </div>

          {streakShields > 0 && (
            <div
              className="rounded-2xl p-4 flex items-center gap-3 cursor-pointer transition-all hover:bg-white/5"
              style={{
                background: useShield ? 'rgba(0,212,255,0.08)' : 'rgba(255,255,255,0.02)',
                border: useShield
                  ? '1px solid rgba(0,212,255,0.35)'
                  : '1px solid rgba(255,255,255,0.06)',
              }}
              onClick={() => setUseShield(!useShield)}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-cyan-400"
                style={{ background: 'rgba(0,212,255,0.15)' }}
              >
                <Shield size={18} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">Use Streak Shield</p>
                <p className="text-[11px] text-gray-400">
                  {streakShields} shield{streakShields !== 1 ? 's' : ''} available — protects 1
                  missed day
                </p>
              </div>
              <div
                className="w-5 h-5 rounded-md flex items-center justify-center transition-colors"
                style={{
                  background: useShield ? '#00D4FF' : 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                {useShield && <span className="text-[10px] font-bold text-black animate-in zoom-in">✓</span>}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="w-full py-4 rounded-2xl font-black text-base tracking-wide transition-all duration-300 active:scale-[0.98]"
            style={{
              background: canSubmit
                ? 'linear-gradient(135deg, #6C63FF, #00D4FF)'
                : 'rgba(255,255,255,0.06)',
              color: canSubmit ? '#fff' : '#666',
              cursor: canSubmit ? 'pointer' : 'not-allowed',
              boxShadow: canSubmit ? '0 8px 25px rgba(108,99,255,0.4)' : 'none',
            }}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 size={18} className="animate-spin" />
                Submitting proof...
              </span>
            ) : canSubmit ? (
              '🚀 Submit Day ' + dayNumber
            ) : (
              'Add both URLs to submit'
            )}
          </button>

          {canSubmit && !isSubmitting && (
            <p className="text-center text-[11px] text-gray-500 animate-in fade-in duration-500">
              Both GitHub + LinkedIn verified ✓ — ready to lock in Day {dayNumber}
            </p>
          )}
        </form>
      )}
    </>
  );
}