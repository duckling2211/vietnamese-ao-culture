'use client';

import React from 'react';
import { X, Image as ImageIcon, MapPin, Shirt } from 'lucide-react';

// In a real app, this data would come from the backend/database
const HERITAGE_DATA: Record<string, any> = {
  'north-hanoi': {
    title: 'Hà Nội',
    region: 'Northern Vietnam',
    description: 'The cultural heart of the North, historically favoring subtle, elegant tones. Traditional wear often features multiple layers due to the distinct four seasons.',
    attire: 'Áo Tứ Thân, Áo Giao Lĩnh',
    events: 'Tết Nguyên Đán (Lunar New Year), Mid-Autumn Festival',
    imageUrl: '/api/placeholder/400/250'
  },
  'central-hue': {
    title: 'Huế',
    region: 'Central Vietnam',
    description: 'The former imperial capital. Clothing here is heavily influenced by royal court styles, featuring vibrant colors (especially purple) and intricate embroidery.',
    attire: 'Áo Dài, Nhật Bình',
    events: 'Huế Festival, Nam Giao Offering Ceremony',
    imageUrl: '/api/placeholder/400/250'
  },
  'south-saigon': {
    title: 'Ho Chi Minh City',
    region: 'Southern Vietnam',
    description: 'Known for its warm climate and dynamic lifestyle. Traditional clothing here emphasizes comfort, breathability, and practical elegance.',
    attire: 'Áo Bà Ba',
    events: 'Southern Fruit Festival, Tet',
    imageUrl: '/api/placeholder/400/250'
  }
};

interface HeritagePanelProps {
  selectedRegionId?: string | null;
  onClose?: () => void;
}

export default function HeritagePanel({ selectedRegionId, onClose }: HeritagePanelProps) {
  if (!selectedRegionId) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center text-stone-500 dark:text-stone-400">
        <MapPin className="w-12 h-12 mb-4 opacity-50" />
        <h3 className="text-xl font-medium mb-2">Select a Region</h3>
        <p className="text-sm">Hover and click on any pin on the map to explore its unique cultural heritage and traditional attire.</p>
      </div>
    );
  }

  const data = HERITAGE_DATA[selectedRegionId] || {
    title: 'Region Unknown',
    description: 'Detailed heritage data is currently unavailable for this specific region.',
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-stone-900 overflow-y-auto animate-in slide-in-from-right-8 duration-300">
      {/* Header Image Area */}
      <div className="relative h-64 bg-stone-200 dark:bg-stone-800 flex-shrink-0">
        {data.imageUrl ? (
          <img 
            src={data.imageUrl} 
            alt={data.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="w-10 h-10 text-stone-400" />
          </div>
        )}
        
        {/* Close Button */}
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-colors"
            aria-label="Close panel"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
          {data.region}
        </div>
        <h2 className="text-3xl font-bold text-stone-900 dark:text-white mb-4">
          {data.title}
        </h2>
        
        <p className="text-stone-700 dark:text-stone-300 leading-relaxed mb-8">
          {data.description}
        </p>

        {/* Info Cards */}
        <div className="space-y-4 mt-auto">
          {data.attire && (
            <div className="bg-stone-50 dark:bg-stone-800/50 p-4 rounded-xl border border-stone-100 dark:border-stone-800">
              <div className="flex items-center space-x-2 text-stone-900 dark:text-white font-medium mb-1">
                <Shirt className="w-4 h-4 text-emerald-500" />
                <h3>Notable Attire</h3>
              </div>
              <p className="text-sm text-stone-600 dark:text-stone-400 pl-6">
                {data.attire}
              </p>
            </div>
          )}

          {data.events && (
            <div className="bg-stone-50 dark:bg-stone-800/50 p-4 rounded-xl border border-stone-100 dark:border-stone-800">
              <div className="flex items-center space-x-2 text-stone-900 dark:text-white font-medium mb-1">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <h3>Cultural Events</h3>
              </div>
              <p className="text-sm text-stone-600 dark:text-stone-400 pl-6">
                {data.events}
              </p>
            </div>
          )}
        </div>
        
        {/* Call to Action */}
        <button className="mt-8 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors shadow-sm">
          Load Attire in Studio
        </button>
      </div>
    </div>
  );
}