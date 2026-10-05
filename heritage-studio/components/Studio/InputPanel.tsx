'use client';

import React, { useState } from 'react';
import { Sparkles, SlidersHorizontal, ChevronDown } from 'lucide-react';

export default function InputPanel() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Mocking an AI API call delay
    setTimeout(() => setIsGenerating(false), 2000);
  };

  return (
    <div className="flex flex-col h-full p-4 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-lg font-bold flex items-center mb-2">
          <Sparkles className="w-5 h-5 mr-2 text-emerald-500" />
          AI Stylist
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
          Describe an occasion, weather, or specific cultural attire.
        </p>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="E.g., Suggest a summer festival outfit in Hue honoring royal traditions..."
          className="w-full h-32 p-3 text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
        />
        <button 
          onClick={handleGenerate}
          disabled={!prompt || isGenerating}
          className="mt-3 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-300 dark:disabled:bg-stone-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
        >
          {isGenerating ? 'Analyzing Heritage...' : 'Generate Outfit'}
        </button>
      </div>

      <div className="border-t border-stone-200 dark:border-stone-800 pt-6">
        <h2 className="text-lg font-bold flex items-center mb-4">
          <SlidersHorizontal className="w-5 h-5 mr-2 text-stone-500" />
          Manual Wardrobe
        </h2>
        
        {/* Mock Dropdowns */}
        {['Headwear', 'Outerwear', 'Undergarments', 'Footwear', 'Accessories'].map((category) => (
          <div key={category} className="mb-3 border border-stone-200 dark:border-stone-700 rounded-lg overflow-hidden">
            <button className="w-full flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 dark:hover:bg-stone-800 text-sm font-medium transition-colors">
              {category}
              <ChevronDown className="w-4 h-4 text-stone-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}