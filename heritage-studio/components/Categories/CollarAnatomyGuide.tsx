'use client';

import React from 'react';
import { Sparkles, Layers } from 'lucide-react';
import { CostumeItem, EXTENDED_COSTUMES } from './costumeTypes';
import CostumeSvgSilhouette from './CostumeSvgSilhouette';

interface CollarAnatomyGuideProps {
  onSelectCostume: (costume: CostumeItem) => void;
}

export default function CollarAnatomyGuide({ onSelectCostume }: CollarAnatomyGuideProps) {
  const collarStyles = [
    {
      title: '1. Cổ Giao Lĩnh (交領)',
      sub: 'Cổ Chéo Vạt Cổ Truyền',
      description: 'Dạng cổ áo cổ xưa nhất của người Việt. Hai vạt áo đè chéo lên nhau trước ngực (vạt trái đè vạt phải sang nách phải), tạo thành hình chữ V thanh thoát. Thể hiện sự tôn nghiêm, phép tắc lễ nghi triều nghi thời Lý, Trần, Hậu Lê.',
      costumeId: 'giao_linh',
      features: ['Vạt chéo sang nách phải', 'Mặc phủ lớp áo lót trắng bên trong', 'Dáng vẻ trang nghiêm, uy nghi cổ kính'],
      border: 'border-teal-500/40',
      badge: 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300'
    },
    {
      title: '2. Cổ Nhật Bình (日平)',
      sub: 'Cổ Hình Chữ Nhật Hoàng Gia',
      description: 'Dạng cổ áo đặc trưng hoàng gia triều Nguyễn. Dải viền to bản chạy quanh cổ gập vuông vức trước ngực tạo thành hình chữ Nhật (日), hoa văn thêu rồng phượng kim tuyến, tay áo viền ngũ sắc tượng trưng cho Ngũ hành.',
      costumeId: 'nhat_binh',
      features: ['Viền to bản hình chữ nhật úp ngực', 'Cài cúc vàng hoặc cúc ngọc trước dải viền', 'Đi kèm khăn vành dây đội đầu quyền quý'],
      border: 'border-amber-500/40',
      badge: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
    },
    {
      title: '3. Cổ Lập Lĩnh (立領)',
      sub: 'Cổ Đứng Cài Cúc — Tiền Thân Cổ Áo Dài',
      description: 'Cổ đứng tròn cao 2-3cm ôm khít quanh cổ, cài cúc sang bên phải. Ra đời từ cuộc cải cách y phục năm 1744 của chúa Nguyễn Phúc Khoát, mang ý nghĩa kín đáo, thanh tao và sau này trở thành phom cổ tiêu chuẩn của Áo Ngũ Thân, Áo Tấc và Áo Dài.',
      costumeId: 'ngu_than',
      features: ['Cổ đứng ôm tròn kín đáo', 'Cài 5 cúc tượng trưng cho Ngũ Thường', 'Tiền thân trực tiếp của cổ Áo Dài hiện đại'],
      border: 'border-orange-500/40',
      badge: 'bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300'
    },
    {
      title: '4. Cổ Mở Dân Gian',
      sub: 'Cổ Buông Lộ Yếm Đào Bắc Bộ',
      description: 'Hai vạt trước buông rủ tự do, không dùng cúc cài cổ, để lộ lấp ló chiếc áo yếm đào duyên dáng bên trong. Thiết kế mang đậm tính dân dã, giúp người phụ nữ đồng bằng Bắc Bộ vừa thoải mái lao động, vừa thắt vạt duyên dáng ngày hội làng.',
      costumeId: 'tu_than',
      features: ['Không cúc cài cổ, để mở tự do', 'Mặc lót cùng yếm đào thêu chỉ tơ', 'Hai vạt buộc thắt duyên dáng trước bụng'],
      border: 'border-rose-500/40',
      badge: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
    },
    {
      title: '5. Cổ Tròn Xẻ Giữa',
      sub: 'Cổ Áo Bà Ba Sông Nước Nam Bộ',
      description: 'Cổ tròn ôm nhẹ chân cổ, xẻ thẳng một đường giữa ngực với hàng khuy cài thẳng tắp. Thích ứng hoàn hảo với khí hậu nắng ấm phương Nam, mang lại sự mát mẻ, linh hoạt, dung dị và phóng khoáng cho người mặc.',
      costumeId: 'ao_ba_ba',
      features: ['Cổ tròn xẻ giữa thoáng mát', 'Hàng cúc cài thẳng chính diện', 'Hai túi áo to bản thuận tiện lao động'],
      border: 'border-emerald-500/40',
      badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
    }
  ];

  return (
    <div className="w-full py-6">
      {/* Intro Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 inline-flex items-center space-x-1.5 mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>Giải Phẫu & Phân Loại Cổ Áo</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mb-2">
          5 Dạng Thức Cổ Áo Điển Hình Trong Cổ Phục Việt
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
          Cổ áo là &ldquo;linh hồn&rdquo; định hình phong cách, thời đại và tôn ty trật tự của y phục truyền thống Việt Nam qua các thời kỳ.
        </p>
      </div>

      {/* Grid of Collar Formats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {collarStyles.map((item) => {
          const matchedCostume = EXTENDED_COSTUMES.find((c) => c.id === item.costumeId);

          return (
            <div
              key={item.title}
              className={`bg-white dark:bg-stone-900 rounded-3xl p-6 border ${item.border} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between`}
            >
              <div>
                {/* Header Icon + Silhouette */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.badge}`}>
                    {item.sub}
                  </span>
                  <div className="w-12 h-14 bg-stone-100 dark:bg-stone-800 rounded-xl p-1.5 flex items-center justify-center">
                    <CostumeSvgSilhouette id={item.costumeId} className="w-full h-full" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Key Points */}
                <ul className="space-y-1.5 mb-5">
                  {item.features.map((feat, i) => (
                    <li key={i} className="text-xs text-stone-600 dark:text-stone-400 flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {matchedCostume && (
                <button
                  onClick={() => onSelectCostume(matchedCostume)}
                  className="w-full py-2.5 px-4 bg-stone-100 hover:bg-emerald-600 dark:bg-stone-800 dark:hover:bg-emerald-600 text-stone-800 dark:text-stone-200 hover:text-white dark:hover:text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Xem cổ phục tiêu biểu ({matchedCostume.name})</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
