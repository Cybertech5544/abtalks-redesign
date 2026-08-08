'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import { studentData } from '@/data/mockData';
import { Bell, Shield, Moon, Smartphone, Mail, Check, Palette, User, ArrowLeft, Zap, Star,  } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const AVATARS = ['AS', 'AB', 'RK', 'PV', 'MN', 'DK', 'SK', 'VR', 'NP', 'KS'];

const THEME_COLORS = [
  { id: 'purple-cyan', name: 'Neon Pulse', primary: '#6C63FF', secondary: '#00D4FF', accent: '#00FF88' },
  { id: 'orange-pink', name: 'Sunset Fire', primary: '#FF6B35', secondary: '#FF3CAC', accent: '#FFD700' },
  { id: 'green-teal', name: 'Matrix Green', primary: '#00FF88', secondary: '#00D4FF', accent: '#6C63FF' },
  { id: 'gold-amber', name: 'Golden Hour', primary: '#FFD700', secondary: '#FF6B35', accent: '#00FF88' },
  { id: 'pink-purple', name: 'Sakura Wave', primary: '#FF3CAC', secondary: '#784BA0', accent: '#00D4FF' },
  { id: 'blue-indigo', name: 'Deep Ocean', primary: '#2B86C5', secondary: '#6C63FF', accent: '#00FF88' },
];

interface NotifPrefs {
  dailyReminder: boolean;
  streakWarning: boolean;
  weeklyDigest: boolean;
  achievementAlerts: boolean;
  reminderTime: string;
}

export default function ProfilePage() {
  const { student } = studentData;

  const [selectedAvatar, setSelectedAvatar] = useState(student.avatar);
  const [selectedTheme, setSelectedTheme] = useState('purple-cyan');
  const [notifPrefs, setNotifPrefs] = useState<NotifPrefs>({
    dailyReminder: true,
    streakWarning: true,
    weeklyDigest: false,
    achievementAlerts: true,
    reminderTime: '20:00',
  });
  const [saved, setSaved] = useState(false);

  const currentTheme = THEME_COLORS.find((t) => t.id === selectedTheme) ?? THEME_COLORS[0];

  const toggleNotif = (key: keyof NotifPrefs) => {
    if (key === 'reminderTime') return;
    setNotifPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const shieldCount = student.streakShields;
  const completionPct = Math.round((student.completedDays / student.totalDays) * 100);

  return (
    <div className="min-h-screen pb-28" style={{ background: 'var(--background)' }}>
      {/* Background orb */}
      <div
        className="fixed top-0 left-0 w-80 h-80 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${currentTheme.primary}18 0%, transparent 70%)`,
          filter: 'blur(60px)',
          transition: 'background 0.6s ease',
        }}
      />

      {/* Header */}
      <header
        className="glass-dark px-5 py-3 sticky top-0 z-40"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-semibold">Profile</span>
          </Link>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 rounded-xl text-xs font-black transition-all duration-200 flex items-center gap-1.5"
            style={{
              background: saved
                ? 'rgba(0,255,136,0.15)'
                : `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
              color: saved ? 'var(--accent)' : '#fff',
              border: saved ? '1px solid rgba(0,255,136,0.3)' : 'none',
            }}
          >
            {saved ? <><Check size={12} /> Saved!</> : 'Save Changes'}
          </button>
        </div>
      </header>

      <div className="px-5 pt-5 max-w-lg mx-auto space-y-5">

        {/* Profile Hero Card */}
        <div
          className="rounded-2xl p-5 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${currentTheme.primary}18, ${currentTheme.secondary}0a)`,
            border: `1px solid ${currentTheme.primary}30`,
            transition: 'all 0.5s ease',
          }}
        >
          <div
            className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
            style={{
              background: `radial-gradient(circle at top right, ${currentTheme.secondary}15, transparent 70%)`,
            }}
          />
          <div className="flex items-center gap-4 relative z-10">
            {/* Avatar display */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
                boxShadow: `0 8px 24px ${currentTheme.primary}40`,
                transition: 'all 0.4s ease',
              }}
            >
              {selectedAvatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-black text-lg text-foreground truncate">{student.name}</p>
              <p className="text-xs text-muted-foreground truncate">{student.college}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: `${currentTheme.primary}20`, color: currentTheme.primary, border: `1px solid ${currentTheme.primary}30` }}
                >
                  {student.track}
                </span>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(255,215,0,0.15)', color: 'var(--gold)', border: '1px solid rgba(255,215,0,0.25)' }}
                >
                  {student.level}
                </span>
              </div>
            </div>
          </div>

          {/* Quick stats row */}
          <div className="grid grid-cols-3 gap-3 mt-4 relative z-10">
            {[
              { label: 'Day', value: student.currentDay, icon: '📅' },
              { label: 'Streak', value: `${student.currentStreak}🔥`, icon: null },
              { label: 'XP', value: `${student.xp.toLocaleString()}`, icon: '⚡' },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl p-2.5 text-center"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <p className="font-black text-base text-foreground">{s.value}</p>
                <p className="text-[10px] text-muted-foreground font-semibold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Streak Shields */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: 'rgba(0,212,255,0.05)',
            border: '1px solid rgba(0,212,255,0.2)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-cyan-400 flex-shrink-0"
              style={{ background: 'rgba(0,212,255,0.15)' }}
            >
              <Shield size={20} />
            </div>
            <div>
              <p className="font-black text-sm text-foreground">Streak Shields</p>
              <p className="text-[11px] text-muted-foreground">Earned 1 shield per 7-day streak</p>
            </div>
            <div
              className="ml-auto text-2xl font-black"
              style={{ color: '#00D4FF' }}
            >
              {shieldCount}
            </div>
          </div>

          {/* Shield icons */}
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: Math.max(shieldCount, 3) }).map((_, i) => (
              <div
                key={`shield-${i}`}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                style={{
                  background: i < shieldCount ? 'rgba(0,212,255,0.2)' : 'rgba(255,255,255,0.04)',
                  border: i < shieldCount ? '1px solid rgba(0,212,255,0.4)' : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <Shield
                  size={18}
                  style={{ color: i < shieldCount ? '#00D4FF' : 'rgba(255,255,255,0.15)' }}
                  fill={i < shieldCount ? 'rgba(0,212,255,0.3)' : 'none'}
                />
              </div>
            ))}
            <div
              className="flex-1 rounded-xl px-3 py-2 flex items-center"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <p className="text-[11px] text-muted-foreground">
                {shieldCount === 0
                  ? 'Reach a 7-day streak to earn your first shield'
                  : `${shieldCount} shield${shieldCount !== 1 ? 's' : ''} protect${shieldCount === 1 ? 's' : ''} against missed days`}
              </p>
            </div>
          </div>

          {/* Progress to next shield */}
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[11px] text-muted-foreground font-semibold">Next shield in</p>
              <p className="text-[11px] font-black" style={{ color: '#00D4FF' }}>
                {7 - (student.currentStreak % 7)} days
              </p>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${((student.currentStreak % 7) / 7) * 100}%`,
                  background: 'linear-gradient(90deg, #00D4FF, #6C63FF)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Avatar Picker */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <User size={16} style={{ color: currentTheme.primary }} />
            <p className="font-black text-sm text-foreground">Choose Avatar</p>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {AVATARS.map((av) => (
              <button
                key={av}
                onClick={() => setSelectedAvatar(av)}
                className="aspect-square rounded-xl flex items-center justify-center font-black text-sm transition-all duration-200"
                style={{
                  background: selectedAvatar === av
                    ? `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`
                    : 'rgba(255,255,255,0.05)',
                  border: selectedAvatar === av
                    ? `1px solid ${currentTheme.primary}60`
                    : '1px solid rgba(255,255,255,0.08)',
                  color: selectedAvatar === av ? '#fff' : 'rgba(255,255,255,0.5)',
                  boxShadow: selectedAvatar === av ? `0 4px 12px ${currentTheme.primary}40` : 'none',
                  transform: selectedAvatar === av ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                {av}
              </button>
            ))}
          </div>
        </div>

        {/* Track Color Theme */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Palette size={16} style={{ color: currentTheme.primary }} />
            <p className="font-black text-sm text-foreground">Track Color Theme</p>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {THEME_COLORS.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className="rounded-xl p-3 flex items-center gap-3 transition-all duration-200 text-left"
                style={{
                  background: selectedTheme === theme.id
                    ? `linear-gradient(135deg, ${theme.primary}20, ${theme.secondary}10)`
                    : 'rgba(255,255,255,0.03)',
                  border: selectedTheme === theme.id
                    ? `1px solid ${theme.primary}50`
                    : '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {/* Color swatch */}
                <div className="flex gap-1 flex-shrink-0">
                  <div className="w-4 h-4 rounded-full" style={{ background: theme.primary }} />
                  <div className="w-4 h-4 rounded-full -ml-1.5" style={{ background: theme.secondary }} />
                  <div className="w-4 h-4 rounded-full -ml-1.5" style={{ background: theme.accent }} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-foreground truncate">{theme.name}</p>
                </div>
                {selectedTheme === theme.id && (
                  <Check size={14} className="ml-auto flex-shrink-0" style={{ color: theme.primary }} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notification Preferences */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Bell size={16} style={{ color: currentTheme.primary }} />
            <p className="font-black text-sm text-foreground">Notification Preferences</p>
          </div>

          <div className="space-y-3">
            {[
              {
                key: 'dailyReminder' as keyof NotifPrefs,
                icon: Smartphone,
                label: 'Daily Reminder',
                desc: 'Remind me to submit today\'s challenge',
              },
              {
                key: 'streakWarning' as keyof NotifPrefs,
                icon: Zap,
                label: 'Streak Warning',
                desc: 'Alert when streak is at risk (< 3 hrs left)',
              },
              {
                key: 'weeklyDigest' as keyof NotifPrefs,
                icon: Mail,
                label: 'Weekly Digest',
                desc: 'Summary of your progress every Sunday',
              },
              {
                key: 'achievementAlerts' as keyof NotifPrefs,
                icon: Star,
                label: 'Achievement Alerts',
                desc: 'Notify when you earn badges or level up',
              },
            ].map(({ key, icon: Icon, label, desc }) => {
              const isOn = notifPrefs[key] as boolean;
              return (
                <div
                  key={key}
                  className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200"
                  style={{
                    background: isOn ? `${currentTheme.primary}08` : 'rgba(255,255,255,0.02)',
                    border: isOn ? `1px solid ${currentTheme.primary}25` : '1px solid rgba(255,255,255,0.06)',
                  }}
                  onClick={() => toggleNotif(key)}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: isOn ? `${currentTheme.primary}20` : 'rgba(255,255,255,0.05)',
                    }}
                  >
                    <Icon size={15} style={{ color: isOn ? currentTheme.primary : 'rgba(255,255,255,0.3)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground">{label}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{desc}</p>
                  </div>
                  {/* Toggle */}
                  <div
                    className="w-10 h-5.5 rounded-full relative flex-shrink-0 transition-all duration-300"
                    style={{
                      background: isOn ? `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})` : 'rgba(255,255,255,0.1)',
                      width: '40px',
                      height: '22px',
                    }}
                  >
                    <div
                      className="absolute top-0.5 rounded-full bg-white transition-all duration-300"
                      style={{
                        width: '18px',
                        height: '18px',
                        left: isOn ? '20px' : '2px',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                      }}
                    />
                  </div>
                </div>
              );
            })}

            {/* Reminder time picker */}
            {notifPrefs.dailyReminder && (
              <div
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <Moon size={15} className="text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">Reminder Time</p>
                  <p className="text-[11px] text-muted-foreground">When to send daily reminder</p>
                </div>
                <input
                  type="time"
                  value={notifPrefs.reminderTime}
                  onChange={(e) => setNotifPrefs((prev) => ({ ...prev, reminderTime: e.target.value }))}
                  className="text-sm font-bold text-foreground outline-none rounded-lg px-2 py-1"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: `1px solid ${currentTheme.primary}30`,
                    colorScheme: 'dark',
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Challenge Progress Summary */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <p className="font-black text-sm text-foreground mb-4">Challenge Progress</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Days Completed', value: student.completedDays, total: student.totalDays, color: currentTheme.primary },
              { label: 'Longest Streak', value: student.longestStreak, total: 60, color: '#FF6B35' },
              { label: 'Rank', value: `#${student.rank}`, total: null, color: currentTheme.secondary },
              { label: 'Missed Days', value: student.missedDays, total: null, color: 'rgba(255,255,255,0.4)' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl p-3"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <p className="font-black text-xl" style={{ color: item.color }}>
                  {item.value}{item.total ? `/${item.total}` : ''}
                </p>
                <p className="text-[11px] text-muted-foreground font-semibold mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
          {/* Overall progress bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[11px] text-muted-foreground font-semibold">Overall Completion</p>
              <p className="text-[11px] font-black" style={{ color: currentTheme.primary }}>{completionPct}%</p>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${completionPct}%`,
                  background: `linear-gradient(90deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Earned Badges */}
        <div
          className="rounded-2xl p-5"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <p className="font-black text-sm text-foreground mb-4">Earned Badges</p>
          <div className="flex flex-wrap gap-2">
            {student.badges.map((badge) => (
              <div
                key={badge}
                className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
                style={{
                  background: `${currentTheme.primary}15`,
                  border: `1px solid ${currentTheme.primary}30`,
                  color: currentTheme.primary,
                }}
              >
                <Star size={11} />
                {badge}
              </div>
            ))}
          </div>
        </div>

      </div>

      <BottomNav />
    </div>
  );
}
