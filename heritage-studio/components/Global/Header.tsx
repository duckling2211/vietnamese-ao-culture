'use client';

import React, { useState } from 'react';
import Link from 'next/link';
// We rename Map to MapIcon here to prevent the JavaScript conflict
import { Menu, Settings, User, Map as MapIcon, Shirt, LayoutGrid } from 'lucide-react';
import SettingsModal from './SettingsModal';

export default function Header() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // We explicitly type the array so TypeScript knows exactly what 'link' is
  type NavLink = {
    name: string;
    href: string;
    icon: React.ReactNode;
  };

  const navLinks: NavLink[] = [
    { name: 'Map', href: '/map', icon: <MapIcon className="w-4 h-4 mr-2" /> },
    { name: 'Studio', href: '/studio', icon: <Shirt className="w-4 h-4 mr-2" /> },
    { name: 'Database', href: '/categories', icon: <LayoutGrid className="w-4 h-4 mr-2" /> },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/80 backdrop-blur dark:border-stone-800 dark:bg-stone-950/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight text-emerald-700 dark:text-emerald-400">
              👘 HeritageStudio
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="flex items-center text-sm font-medium text-stone-600 hover:text-emerald-600 dark:text-stone-300 dark:hover:text-emerald-400 transition-colors"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link 
              href="/account"
              className="hidden md:flex items-center justify-center p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-stone-700 dark:text-stone-300"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>
            
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-stone-700 dark:text-stone-300"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>

            <button 
              className="md:hidden p-2 text-stone-700 dark:text-stone-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center text-base font-medium text-stone-700 dark:text-stone-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <Link
              href="/account"
              className="flex items-center text-base font-medium text-stone-700 dark:text-stone-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User className="w-4 h-4 mr-2" />
              Account
            </Link>
          </div>
        )}
      </header>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </>
  );
}