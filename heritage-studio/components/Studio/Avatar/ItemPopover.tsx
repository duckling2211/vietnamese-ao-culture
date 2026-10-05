'use client';

import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

interface ItemPopoverProps {
  name: string;
  description: string;
  isViolation?: boolean;
  violationMessage?: string;
  onClose: () => void;
}

export default function ItemPopover({ name, description, isViolation, violationMessage, onClose }: ItemPopoverProps) {
  return (
    <div className="absolute top-0 left-full ml-4 w-64 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl shadow-xl z-50 p-4 animate-in fade-in zoom-in-95 duration-200">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-stone-900 dark:text-white flex items-center">
          <Info className="w-4 h-4 mr-1 text-emerald-500" />
          {name}
        </h4>
        <button onClick={onClose} className="text-stone-400 hover:text-stone-600">&times;</button>
      </div>
      <p className="text-xs text-stone-600 dark:text-stone-400 mb-3">{description}</p>
      
      {isViolation && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-2 rounded-lg flex items-start">
          <AlertTriangle className="w-4 h-4 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-red-700 dark:text-red-400 font-medium leading-tight">
            <span className="block font-bold mb-1">Cultural Violation</span>
            {violationMessage}
          </p>
        </div>
      )}
    </div>
  );
}