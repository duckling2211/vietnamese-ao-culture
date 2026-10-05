'use client';

import React from 'react';
import { Layers } from 'lucide-react';

export default function ComparisonSidebar() {
  return (
    <div className="flex flex-col h-full p-4">
      <h2 className="text-lg font-bold flex items-center border-b border-stone-200 dark:border-stone-800 pb-3 mb-4">
        <Layers className="w-5 h-5 mr-2 text-stone-500" />
        References
      </h2>
      
      <p className="text-xs text-stone-500 mb-4">
        Load up to 2 saved avatars to compare styles, eras, or geographical regions side-by-side.
      </p>

      {/* Reference Slot 1 */}
      <div className="flex-1 mb-4 border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800/50 flex items-center justify-center cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-800 transition">
        <span className="text-sm font-medium text-stone-400">+ Add Reference</span>
      </div>

      {/* Reference Slot 2 */}
      <div className="flex-1 border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800/50 flex items-center justify-center cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-800 transition">
        <span className="text-sm font-medium text-stone-400">+ Add Reference</span>
      </div>
    </div>
  );
}