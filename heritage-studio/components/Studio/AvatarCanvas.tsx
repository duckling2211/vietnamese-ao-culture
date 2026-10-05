'use client';

import React from 'react';
import BaseCharacter from './Avatar/BaseCharacter';
import LayeredItem from './Avatar/LayeredItem';

// Mock active outfit state
const ACTIVE_OUTFIT = [
  {
    id: 'item-1',
    name: 'Áo Giao Lĩnh',
    description: 'A traditional cross-collared robe dating back to the Lý, Trần, and Lê dynasties.',
    imageUrl: '/api/placeholder/200/300', // In production, this would be a transparent PNG/SVG
    x: 50,
    y: 40,
    zIndex: 50,
    isSacred: true
  },
  {
    id: 'item-2',
    name: 'Modern Denim Shorts',
    description: 'Contemporary casual wear.',
    imageUrl: '/api/placeholder/150/150',
    x: 50,
    y: 65,
    zIndex: 20,
    isCasual: true
  }
];

export default function AvatarCanvas() {
  // Cultural Validation Engine check
  // If array has both a sacred item and a casual item, trigger a violation flag
  const hasSacred = ACTIVE_OUTFIT.some(i => i.isSacred);
  const hasCasual = ACTIVE_OUTFIT.some(i => i.isCasual);
  const hasViolation = hasSacred && hasCasual;

  return (
    <div className="relative w-full max-w-lg h-[80vh] bg-stone-200/50 dark:bg-stone-800/30 rounded-3xl border-2 border-dashed border-stone-300 dark:border-stone-700 shadow-inner overflow-hidden">
      {/* Base Mannequin Layer */}
      <BaseCharacter />

      {/* Render Items by strict z-index mapping */}
      {ACTIVE_OUTFIT
        .sort((a, b) => a.zIndex - b.zIndex)
        .map(item => (
          <LayeredItem 
            key={item.id} 
            item={item} 
            hasViolation={hasViolation && (item.isSacred || item.isCasual)} 
          />
      ))}
      
      {/* Watermark/Status */}
      <div className="absolute bottom-4 right-4 text-xs font-mono text-stone-400 dark:text-stone-500 pointer-events-none flex flex-col items-end">
        <span>Engine: v1.0.4 (MathRenderer)</span>
        {hasViolation && <span className="text-red-500 font-bold mt-1">WARNING: NORM CONFLICT DETECTED</span>}
      </div>
    </div>
  );
}