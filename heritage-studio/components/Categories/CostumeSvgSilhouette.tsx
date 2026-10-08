'use client';

import React from 'react';

interface CostumeSvgSilhouetteProps {
  id: string;
  className?: string;
}

export default function CostumeSvgSilhouette({ id, className = "w-full h-full" }: CostumeSvgSilhouetteProps) {
  switch (id) {
    case 'giao_linh':
      return (
        <svg viewBox="0 0 200 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main silhouette: Crossed collar wide robe */}
          <path d="M70 40 L40 70 L10 130 L35 140 L60 90 L60 220 L140 220 L140 90 L165 140 L190 130 L160 70 L130 40 Z" 
            className="fill-teal-500/15 dark:fill-teal-400/10 stroke-teal-600 dark:stroke-teal-400 stroke-2 stroke-linejoin-round" />
          {/* Inner undergarment neck */}
          <path d="M85 40 L100 65 L115 40" className="stroke-teal-700/60 dark:stroke-teal-300/60 stroke-2" />
          {/* Crossed collar left over right (Giao Lĩnh) */}
          <path d="M70 40 L130 115" className="stroke-teal-600 dark:stroke-teal-300 stroke-[3] stroke-linecap-round" />
          <path d="M130 40 L95 80" className="stroke-teal-600 dark:stroke-teal-300 stroke-2 stroke-linecap-round" strokeDasharray="3 3" />
          {/* Wide draped sleeves */}
          <path d="M35 140 Q50 170 60 170" className="stroke-teal-600/40 dark:stroke-teal-400/40 stroke-1" />
          <path d="M165 140 Q150 170 140 170" className="stroke-teal-600/40 dark:stroke-teal-400/40 stroke-1" />
          {/* Waist sash */}
          <rect x="60" y="110" width="80" height="12" rx="2" className="fill-teal-700 dark:fill-teal-500" />
        </svg>
      );

    case 'nhat_binh':
      return (
        <svg viewBox="0 0 200 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main silhouette: Imperial court gown */}
          <path d="M75 40 L35 80 L20 150 L45 155 L65 100 L65 220 L135 220 L135 100 L155 155 L180 150 L165 80 L125 40 Z" 
            className="fill-amber-500/15 dark:fill-amber-400/10 stroke-amber-600 dark:stroke-amber-400 stroke-2 stroke-linejoin-round" />
          {/* Rectangular Collar (Nhật Bình) */}
          <path d="M80 40 L80 105 L120 105 L120 40" className="fill-amber-500/30 dark:fill-amber-400/20 stroke-amber-600 dark:stroke-amber-300 stroke-[3] stroke-linecap-round" />
          {/* Front closure buttons / pendant */}
          <circle cx="100" cy="70" r="3.5" className="fill-amber-500" />
          <circle cx="100" cy="95" r="3.5" className="fill-amber-500" />
          {/* Sleeve ends with 5-color stripes (Ngũ Sắc) */}
          <path d="M22 142 L43 147" className="stroke-red-500 stroke-2" />
          <path d="M24 146 L44 151" className="stroke-yellow-400 stroke-2" />
          <path d="M26 150 L45 155" className="stroke-blue-500 stroke-2" />
          <path d="M178 142 L157 147" className="stroke-red-500 stroke-2" />
          <path d="M176 146 L156 151" className="stroke-yellow-400 stroke-2" />
          <path d="M174 150 L155 155" className="stroke-blue-500 stroke-2" />
        </svg>
      );

    case 'ngu_than':
      return (
        <svg viewBox="0 0 200 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main silhouette: 5-panel standing collar fitted robe */}
          <path d="M85 35 L45 70 L25 150 L45 155 L70 95 L70 220 L130 220 L130 95 L155 155 L175 150 L155 70 L115 35 Z" 
            className="fill-orange-500/15 dark:fill-orange-400/10 stroke-orange-600 dark:stroke-orange-400 stroke-2 stroke-linejoin-round" />
          {/* Standing Collar (Lập Lĩnh) */}
          <rect x="88" y="28" width="24" height="12" rx="3" className="fill-orange-500/30 stroke-orange-600 dark:stroke-orange-300 stroke-2" />
          {/* Curved right overlap opening */}
          <path d="M100 40 Q118 45 120 70 L120 120" className="stroke-orange-600 dark:stroke-orange-300 stroke-2" />
          {/* 5 Virtues Buttons (Ngũ Thường) */}
          <circle cx="100" cy="34" r="2.5" className="fill-amber-600 dark:fill-amber-400" />
          <circle cx="112" cy="46" r="2.5" className="fill-amber-600 dark:fill-amber-400" />
          <circle cx="120" cy="65" r="2.5" className="fill-amber-600 dark:fill-amber-400" />
          <circle cx="120" cy="88" r="2.5" className="fill-amber-600 dark:fill-amber-400" />
          <circle cx="120" cy="112" r="2.5" className="fill-amber-600 dark:fill-amber-400" />
          {/* Curved side slit */}
          <path d="M70 170 Q100 175 130 170" className="stroke-orange-600/40 stroke-1 stroke-dasharray='2 2'" />
        </svg>
      );

    case 'ao_tac':
      return (
        <svg viewBox="0 0 200 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main silhouette: Wide draped ceremonial sleeves */}
          <path d="M85 35 L40 70 L10 170 L45 175 L70 100 L70 220 L130 220 L130 100 L155 175 L190 170 L160 70 L115 35 Z" 
            className="fill-blue-500/15 dark:fill-blue-400/10 stroke-blue-600 dark:stroke-blue-400 stroke-2 stroke-linejoin-round" />
          {/* Standing Collar (Lập Lĩnh) */}
          <rect x="88" y="28" width="24" height="12" rx="3" className="fill-blue-500/30 stroke-blue-600 dark:stroke-blue-300 stroke-2" />
          {/* Wide Draped Sleeve Folds */}
          <path d="M10 170 Q30 190 45 175" className="stroke-blue-600 dark:stroke-blue-400 stroke-2" />
          <path d="M190 170 Q170 190 155 175" className="stroke-blue-600 dark:stroke-blue-400 stroke-2" />
          {/* Button line */}
          <circle cx="100" cy="34" r="2.5" className="fill-blue-600 dark:fill-blue-400" />
          <circle cx="118" cy="65" r="2.5" className="fill-blue-600 dark:fill-blue-400" />
          <circle cx="118" cy="95" r="2.5" className="fill-blue-600 dark:fill-blue-400" />
        </svg>
      );

    case 'tu_than':
      return (
        <svg viewBox="0 0 200 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main silhouette: 4-panel folk dress with open neck */}
          <path d="M75 40 L45 75 L30 150 L50 155 L70 95 L65 220 L135 220 L130 95 L150 155 L170 150 L155 75 L125 40 Z" 
            className="fill-rose-500/15 dark:fill-rose-400/10 stroke-rose-600 dark:stroke-rose-400 stroke-2 stroke-linejoin-round" />
          {/* Inner Bib (Yếm Đào) */}
          <path d="M85 48 L100 35 L115 48 L110 90 L90 90 Z" className="fill-rose-500/40 dark:fill-rose-500/30 stroke-rose-600 dark:stroke-rose-400 stroke-1.5" />
          {/* Open collar lapels */}
          <path d="M75 40 L88 120" className="stroke-rose-600 dark:stroke-rose-300 stroke-2" />
          <path d="M125 40 L112 120" className="stroke-rose-600 dark:stroke-rose-300 stroke-2" />
          {/* Tied front sashes (Buộc Vạt) */}
          <path d="M90 120 L80 170" className="stroke-amber-600 dark:stroke-amber-400 stroke-3 stroke-linecap-round" />
          <path d="M110 120 L120 170" className="stroke-amber-600 dark:stroke-amber-400 stroke-3 stroke-linecap-round" />
          <circle cx="100" cy="120" r="5" className="fill-amber-600 dark:fill-amber-400" />
        </svg>
      );

    case 'ao_ba_ba':
      return (
        <svg viewBox="0 0 200 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main silhouette: Casual southern blouse */}
          <path d="M80 40 L50 70 L35 145 L55 150 L75 95 L72 195 L128 195 L125 95 L145 150 L165 145 L150 70 L120 40 Z" 
            className="fill-emerald-500/15 dark:fill-emerald-400/10 stroke-emerald-600 dark:stroke-emerald-400 stroke-2 stroke-linejoin-round" />
          {/* Round Neckline with central slit */}
          <path d="M88 40 Q100 52 112 40" className="stroke-emerald-600 dark:stroke-emerald-300 stroke-2" />
          {/* Front button placket */}
          <line x1="100" y1="48" x2="100" y2="185" className="stroke-emerald-600 dark:stroke-emerald-300 stroke-2" />
          <circle cx="100" cy="65" r="2.5" className="fill-emerald-600 dark:fill-emerald-300" />
          <circle cx="100" cy="90" r="2.5" className="fill-emerald-600 dark:fill-emerald-300" />
          <circle cx="100" cy="115" r="2.5" className="fill-emerald-600 dark:fill-emerald-300" />
          <circle cx="100" cy="140" r="2.5" className="fill-emerald-600 dark:fill-emerald-300" />
          <circle cx="100" cy="165" r="2.5" className="fill-emerald-600 dark:fill-emerald-300" />
          {/* Dual front pockets */}
          <rect x="78" y="145" width="16" height="20" rx="2" className="stroke-emerald-600/60 dark:stroke-emerald-400/60 stroke-1.5 fill-emerald-500/10" />
          <rect x="106" y="145" width="16" height="20" rx="2" className="stroke-emerald-600/60 dark:stroke-emerald-400/60 stroke-1.5 fill-emerald-500/10" />
        </svg>
      );

    case 'ao_dai':
    default:
      return (
        <svg viewBox="0 0 200 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main silhouette: Modern iconic Ao Dai with fitted waist & flowing panels */}
          <path d="M85 30 L55 60 L40 140 L55 145 L75 80 Q85 110 82 120 L75 230 L125 230 L118 120 Q115 110 125 80 L145 145 L160 140 L145 60 L115 30 Z" 
            className="fill-rose-500/15 dark:fill-pink-400/10 stroke-rose-600 dark:stroke-pink-400 stroke-2 stroke-linejoin-round" />
          {/* High Standing Collar (Cổ Trụ Cao) */}
          <rect x="88" y="20" width="24" height="12" rx="3" className="fill-rose-500/30 stroke-rose-600 dark:stroke-pink-300 stroke-2" />
          {/* Raglan Shoulder Seams */}
          <path d="M88 32 L75 80" className="stroke-rose-600/60 dark:stroke-pink-300/60 stroke-1.5 stroke-dasharray='2 2'" />
          <path d="M112 32 L125 80" className="stroke-rose-600/60 dark:stroke-pink-300/60 stroke-1.5 stroke-dasharray='2 2'" />
          {/* High waist side split (Xẻ tà eo) */}
          <line x1="100" y1="120" x2="100" y2="230" className="stroke-rose-600/50 dark:stroke-pink-300/50 stroke-1.5" />
          {/* Buttons on collar to underarm */}
          <circle cx="100" cy="26" r="2.5" className="fill-rose-600 dark:fill-pink-300" />
          <circle cx="110" cy="38" r="2" className="fill-rose-600 dark:fill-pink-300" />
          <circle cx="118" cy="54" r="2" className="fill-rose-600 dark:fill-pink-300" />
        </svg>
      );
  }
}
