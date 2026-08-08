import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Toaster } from 'sonner';
import '../styles/index.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'ABTalks — 60-Day Coding Challenge for Indian Students',
  description:
    'Join 10,000+ Indian college students building in public. Pick a track, ship daily, maintain your streak — and get noticed by top hiring partners.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className={plusJakarta.className}>
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: 'rgba(26,26,46,0.95)',
              border: '1px solid rgba(108,99,255,0.3)',
              color: '#fff',
              backdropFilter: 'blur(20px)',
              borderRadius: '12px',
              fontFamily: 'var(--font-plus-jakarta)',
            },
          }}
        />

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fabtalks2372back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.20" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" /></body>
    </html>
  );
}