'use client';

import React from 'react';
import { Save, Download, RefreshCcw, UploadCloud } from 'lucide-react';

export default function StudioControls() {
  return (
    <div className="flex items-center justify-between h-full w-full max-w-4xl mx-auto">
      <div className="flex space-x-2">
        <button className="flex items-center px-4 py-2 text-sm font-medium text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-lg transition">
          <RefreshCcw className="w-4 h-4 mr-2" />
          Reset
        </button>
      </div>
      
      <div className="flex space-x-3">
        <button className="flex items-center px-4 py-2 text-sm font-medium text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-lg transition">
          <UploadCloud className="w-4 h-4 mr-2" />
          Import
        </button>
        <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition">
          <Save className="w-4 h-4 mr-2" />
          Save to Wardrobe
        </button>
        <button className="flex items-center px-4 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/40 hover:bg-emerald-200 dark:hover:bg-emerald-900/60 rounded-lg transition">
          <Download className="w-4 h-4 mr-2" />
          Export Image
        </button>
      </div>
    </div>
  );
}