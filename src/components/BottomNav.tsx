'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Zap, Trophy, User } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const navItems = [
  { id: 'nav-home', label: 'Home', icon: Home, href: '/dashboard' },
  { id: 'nav-challenge', label: 'Challenge', icon: Zap, href: '/day/12' },
  { id: 'nav-leaderboard', label: 'Leaders', icon: Trophy, href: '/dashboard#leaderboard' },
  { id: 'nav-profile', label: 'Profile', icon: User, href: '/profile' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 glass-dark"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
        {navItems?.map((item) => {
          const isActive = pathname === item?.href || 
            (item?.href === '/dashboard' && pathname === '/dashboard') ||
            (item?.href === '/day/12' && pathname === '/day/12');
          const Icon = item?.icon;

          return (
            <Link
              key={item?.id}
              href={item?.href}
              className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon
                size={20}
                className={isActive ? 'text-primary' : 'text-muted-foreground'}
              />
              <span
                className={`text-[10px] font-semibold tracking-wide ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item?.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}