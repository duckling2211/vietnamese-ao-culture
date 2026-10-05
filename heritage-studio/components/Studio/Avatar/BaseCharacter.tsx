'use client';

import React from 'react';

export default function BaseCharacter() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* A simple SVG representing the base mannequin/avatar */}
      <svg viewBox="0 0 200 500" className="h-[90%] opacity-20 dark:opacity-40" preserveAspectRatio="xMidYMid meet">
        {/* Head */}
        <circle cx="100" cy="50" r="30" fill="currentColor" />
        {/* Torso */}
        <path d="M70,90 Q100,80 130,90 L120,250 L80,250 Z" fill="currentColor" />
        {/* Arms */}
        <path d="M70,90 L30,200 L40,210 L75,110 Z" fill="currentColor" />
        <path d="M130,90 L170,200 L160,210 L125,110 Z" fill="currentColor" />
        {/* Legs */}
        <path d="M80,250 L70,450 L90,450 L100,300 Z" fill="currentColor" />
        <path d="M120,250 L130,450 L110,450 L100,300 Z" fill="currentColor" />
      </svg>
    </div>
  );
}