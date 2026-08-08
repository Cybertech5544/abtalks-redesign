import React from 'react';
import { Target, Hammer, Send } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const steps = [
  {
    id: 'step-pick',
    number: '01',
    icon: Target,
    title: 'Pick Your Track',
    description: 'Choose between AI & ML, Data Science, or Software Engineering. One track, 60 days of focused growth.',
    color: 'var(--primary)',
    bg: 'rgba(108,99,255,0.15)',
    border: 'rgba(108,99,255,0.3)',
  },
  {
    id: 'step-build',
    number: '02',
    icon: Hammer,
    title: 'Build Daily',
    description: 'Get one real challenge every day. No fluff — just practical projects that build your portfolio from scratch.',
    color: 'var(--secondary)',
    bg: 'rgba(0,212,255,0.15)',
    border: 'rgba(0,212,255,0.3)',
  },
  {
    id: 'step-submit',
    number: '03',
    icon: Send,
    title: 'Submit Proof',
    description: 'Push to GitHub. Post on LinkedIn. Both submissions required — your public streak is your proof of work.',
    color: 'var(--accent)',
    bg: 'rgba(0,255,136,0.15)',
    border: 'rgba(0,255,136,0.3)',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-5 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
          Simple Process
        </p>
        <h2 className="font-black text-3xl md:text-4xl text-foreground mb-3">
          How ABTalks Works
        </h2>
        <p className="text-muted-foreground text-base max-w-md mx-auto">
          Three steps. 60 days. One career-changing portfolio.
        </p>
      </div>
      <div className="relative">
        {/* Connecting line (desktop) */}
        <div
          className="hidden md:block absolute top-12 left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-px"
          style={{
            background: 'linear-gradient(90deg, var(--primary), var(--secondary), var(--accent))',
            opacity: 0.4,
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps?.map((step) => {
            const Icon = step?.icon;
            return (
              <div key={step?.id} className="flex flex-col items-center text-center">
                {/* Number badge */}
                <div className="relative mb-6">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: step?.bg, border: `1px solid ${step?.border}` }}
                  >
                    <Icon size={26} style={{ color: step?.color }} />
                  </div>
                  <div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black"
                    style={{ background: 'var(--background)', border: `1.5px solid ${step?.border}`, color: step?.color }}
                  >
                    {step?.number?.replace('0', '')}
                  </div>
                </div>
                <h3 className="font-black text-lg text-foreground mb-2">{step?.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step?.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}