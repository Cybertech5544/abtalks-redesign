import React from 'react';
import Link from 'next/link';

export default function FinalCTASection() {
  return (
    <section className="py-20 px-5 max-w-2xl mx-auto">
      <div
        className="rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(108,99,255,0.12), rgba(0,212,255,0.06), rgba(0,255,136,0.08))',
          border: '1px solid rgba(108,99,255,0.3)',
        }}
      >
        {/* Corner glow */}
        <div
          className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at top right, rgba(0,212,255,0.15), transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at bottom left, rgba(108,99,255,0.15), transparent 70%)',
          }}
        />

        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4 relative z-10">
          The Commitment
        </p>
        <h2 className="font-black text-3xl md:text-4xl text-foreground mb-4 relative z-10">
          Ready to commit?
        </h2>
        <p
          className="text-base md:text-lg font-medium mb-2 relative z-10"
          style={{ color: 'rgba(255,255,255,0.7)' }}
        >
          60 days from now, you&apos;ll either have a portfolio or an excuse.
        </p>
        <p className="text-sm text-muted-foreground mb-8 relative z-10">
          Free to join. No prerequisites. Just consistency.
        </p>

        <Link
          href="/dashboard"
          className="btn-primary inline-block px-10 py-4 rounded-2xl font-black text-lg relative z-10"
          style={{
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            boxShadow: '0 0 40px rgba(108,99,255,0.45)',
          }}
        >
          Join the Challenge 🚀
        </Link>

        <div className="flex items-center justify-center gap-4 mt-6 relative z-10">
          {['Free forever', 'No prerequisites', 'Join 10,000+ students']?.map((item) => (
            <div key={`cta-feature-${item}`} className="flex items-center gap-1.5">
              <span className="text-accent text-xs">✓</span>
              <span className="text-xs font-semibold text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}