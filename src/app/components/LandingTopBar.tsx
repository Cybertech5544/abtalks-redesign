import React from 'react';
import Link from 'next/link';

export default function LandingTopBar() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 glass-dark"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="flex items-center justify-between px-5 py-3 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm"
            style={{
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            }}
          >
            AB
          </div>
          <span className="font-black text-base text-foreground tracking-tight">ABTalks</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {['Tracks', 'Community', 'About']?.map((item) => (
            <a
              key={`nav-${item?.toLowerCase()}`}
              href={`#${item?.toLowerCase()}`}
              className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </nav>

        <Link
          href="/dashboard"
          className="btn-primary px-4 py-2 rounded-xl text-sm font-bold"
        >
          Open App →
        </Link>
      </div>
    </header>
  );
}