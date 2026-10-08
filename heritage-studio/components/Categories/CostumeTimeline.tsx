'use client';

import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { CostumeItem, EXTENDED_COSTUMES } from './costumeTypes';
import CostumeSvgSilhouette from './CostumeSvgSilhouette';

interface CostumeTimelineProps {
  onSelectCostume: (costume: CostumeItem) => void;
}

export default function CostumeTimeline({ onSelectCostume }: CostumeTimelineProps) {
  // Sort costumes chronologically
  const timelineCostumes = [...EXTENDED_COSTUMES].sort((a, b) => a.period_order - b.period_order);

  return (
    <div className="w-full py-6">
      {/* Timeline Introductory Note */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 inline-flex items-center space-x-1.5 mb-3">
          <Clock className="w-3.5 h-3.5" />
          <span>Dòng Chảy Lịch Sử Ngàn Năm</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mb-2">
          Lược Sử Tiến Trình Biến Đổi Y Phục Việt Nam
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
          Từ vạt áo Giao Lĩnh uy nghi thời Đại Việt đến sự ra đời của Áo Ngũ Thân Đàng Trong, rồi kết tinh thành tà Áo Dài thướt tha hiện đại — một hành trình khẳng định bản sắc văn hóa kiên cường của dân tộc.
        </p>
      </div>

      {/* Vertical Connected Timeline */}
      <div className="relative max-w-4xl mx-auto">
        {/* Continuous Center Line */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-teal-500 via-amber-500 to-rose-500 -translate-x-1/2 rounded-full opacity-40 dark:opacity-30" />

        <div className="space-y-12">
          {timelineCostumes.map((costume, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={costume.id}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                } gap-6 md:gap-10`}
              >
                {/* Center Node Icon */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 w-12 h-12 rounded-full bg-white dark:bg-stone-900 border-4 border-emerald-500 shadow-lg flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-extrabold text-sm">
                  {index + 1}
                </div>

                {/* Content Box */}
                <div className="ml-14 md:ml-0 md:w-1/2 pl-0 md:px-6 w-full">
                  <div
                    onClick={() => onSelectCostume(costume)}
                    className="group cursor-pointer bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200/90 dark:border-stone-800 shadow-sm hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300"
                  >
                    {/* Period Badge & Category */}
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                        {costume.century}
                      </span>
                      <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                        {costume.category}
                      </span>
                    </div>

                    <div className="flex items-start space-x-4">
                      {/* Mini Silhouette */}
                      <div className={`w-16 h-20 rounded-2xl bg-gradient-to-br ${costume.palette.gradient} p-2 flex items-center justify-center flex-shrink-0 shadow-inner`}>
                        <CostumeSvgSilhouette id={costume.id} className="w-full h-full" />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {costume.name}
                        </h3>
                        <p className="text-xs text-stone-500 dark:text-stone-400 italic mb-2">
                          {costume.era}
                        </p>
                        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed">
                          {costume.significance}
                        </p>
                      </div>
                    </div>

                    {/* Footer link */}
                    <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      <span>Cổ áo: {costume.collar_type}</span>
                      <span className="inline-flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                        <span>Chi tiết</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Blank space on the other side for desktop */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
