'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, Shirt, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { CostumeItem } from './costumeTypes';
import CostumeSvgSilhouette from './CostumeSvgSilhouette';

interface CostumeCardProps {
  costume: CostumeItem;
  onSelect: (costume: CostumeItem) => void;
}

export default function CostumeCard({ costume, onSelect }: CostumeCardProps) {
  return (
    <div 
      className="group relative bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/90 dark:border-stone-800 shadow-sm hover:shadow-xl hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Top Graphic Banner */}
      <div className={`relative h-48 w-full bg-gradient-to-br ${costume.palette.gradient} p-4 flex items-center justify-center overflow-hidden`}>
        {/* Decorative corner glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />

        {/* Category Pill Top Left */}
        <div className="absolute top-3.5 left-3.5 z-10 flex items-center space-x-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-medium text-emerald-200 border border-white/10">
          <Sparkles className="w-3 h-3" />
          <span>{costume.category}</span>
        </div>

        {/* Century / Era Pill Top Right */}
        <div className="absolute top-3.5 right-3.5 z-10 flex items-center space-x-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-medium text-stone-200 border border-white/10">
          <Clock className="w-3 h-3 text-emerald-400" />
          <span>{costume.century}</span>
        </div>

        {/* Vector Costume Silhouette */}
        <div className="h-36 w-36 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-lg flex items-center justify-center">
          <CostumeSvgSilhouette id={costume.id} className="w-full h-full" />
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Header & Title */}
          <div className="mb-3">
            <h3 className="text-xl font-extrabold text-stone-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
              {costume.name}
            </h3>
            {costume.other_names.length > 0 && (
              <p className="text-xs text-stone-500 dark:text-stone-400 italic line-clamp-1 mt-0.5">
                Còn gọi là: {costume.other_names.join(', ')}
              </p>
            )}
          </div>

          {/* Metadata tags */}
          <div className="flex items-center space-x-2 text-xs text-stone-600 dark:text-stone-300 font-medium mb-3.5 flex-wrap gap-y-1">
            <span className="px-2.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold text-[11px]">
              {costume.era}
            </span>
            <span className="text-stone-400 dark:text-stone-600">•</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-medium text-[11px]">
              {costume.gender}
            </span>
          </div>

          {/* Collar Anatomy Feature Box */}
          <div className="mb-3.5 p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-800">
            <div className="text-[11px] uppercase tracking-wider font-bold text-emerald-700 dark:text-emerald-400 mb-0.5">
              Cổ áo: {costume.collar_type}
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
              {costume.key_features}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2">
          <button
            onClick={() => onSelect(costume)}
            className="flex-1 py-2 px-3 bg-stone-100 hover:bg-emerald-50 dark:bg-stone-800 dark:hover:bg-emerald-950/40 text-stone-800 dark:text-stone-200 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold text-xs rounded-xl transition-all border border-transparent hover:border-emerald-300 dark:hover:border-emerald-800 flex items-center justify-center space-x-1.5"
          >
            <span>Khám phá chi tiết</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <Link
            href="/studio"
            className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors shadow-sm"
            title="Thử trang phục trong Studio"
          >
            <Shirt className="w-4 h-4" />
          </Link>

          {costume.wikipedia_url && (
            <a
              href={costume.wikipedia_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Đọc tài liệu Wikipedia"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
