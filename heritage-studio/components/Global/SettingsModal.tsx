'use client';

import React, { useState, useEffect } from 'react';
import { X, Moon, Sun, Globe, Eye } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  // Mock states for UI purposes (normally handled by Context/Zustand)
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState('en');
  const [a11yEnabled, setA11yEnabled] = useState(false);

  // Close modal on escape key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
      <div 
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-stone-900 border border-stone-200 dark:border-stone-800"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100">Settings</h2>
          <button 
            onClick={onClose}
            className="rounded-full p-2 text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 dark:text-stone-400 transition-colors"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-amber-100 text-amber-700 dark:bg-stone-800 dark:text-amber-400 rounded-lg">
                {theme === 'light' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </div>
              <div>
                <p className="font-medium text-stone-900 dark:text-stone-100">Appearance</p>
                <p className="text-sm text-stone-500 dark:text-stone-400">Toggle light or dark mode</p>
              </div>
            </div>
            <select 
              value={theme}
              onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
              className="rounded-md border border-stone-300 bg-transparent px-3 py-1.5 text-sm outline-none focus:border-emerald-500 dark:border-stone-700 dark:text-stone-100"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 text-blue-700 dark:bg-stone-800 dark:text-blue-400 rounded-lg">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-stone-900 dark:text-stone-100">Language</p>
                <p className="text-sm text-stone-500 dark:text-stone-400">Select interface language</p>
              </div>
            </div>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="rounded-md border border-stone-300 bg-transparent px-3 py-1.5 text-sm outline-none focus:border-emerald-500 dark:border-stone-700 dark:text-stone-100"
            >
              <option value="en">English</option>
              <option value="vi">Tiếng Việt</option>
            </select>
          </div>

          {/* Accessibility Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 text-purple-700 dark:bg-stone-800 dark:text-purple-400 rounded-lg">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-stone-900 dark:text-stone-100">Disability Assist</p>
                <p className="text-sm text-stone-500 dark:text-stone-400">High contrast & reduced motion</p>
              </div>
            </div>
            <button
              onClick={() => setA11yEnabled(!a11yEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                a11yEnabled ? 'bg-emerald-600' : 'bg-stone-300 dark:bg-stone-600'
              }`}
              role="switch"
              aria-checked={a11yEnabled}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  a11yEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="mt-8">
          <button 
            onClick={onClose}
            className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}