import React from 'react';


const footerLinks = [
  { id: 'footer-about', label: 'About', href: '#' },
  { id: 'footer-tracks', label: 'Tracks', href: '#tracks' },
  { id: 'footer-community', label: 'Community', href: '#' },
  { id: 'footer-contact', label: 'Contact', href: '#' },
];

export default function LandingFooter() {
  return (
    <footer
      className="py-10 px-5 text-center"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm"
            style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
          >
            AB
          </div>
          <span className="font-black text-base text-foreground">ABTalks</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          {footerLinks?.map((link) => (
            <a
              key={link?.id}
              href={link?.href}
              className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              {link?.label}
            </a>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          Made with ❤️ for Indian college students
        </p>
        <p className="text-xs text-muted-foreground mt-2 opacity-50">
          © 2026 ABTalks. Build in public. Grow together.
        </p>
      </div>
    </footer>
  );
}