'use client';

import React from 'react';
import Link from 'next/link';
import { X, Sparkles, MapPin, Shirt, Calendar } from 'lucide-react';
import { VIETNAM_PROVINCES, CULTURAL_REGIONS } from './vietnamMapData';

interface HeritageInfo {
  title: string;
  region: string;
  description: string;
  attire: string;
  events: string;
  gradient?: string;
}

const HERITAGE_DATA: Record<string, HeritageInfo> = {
  'north-sapa': {
    title: 'Sa Pa & Tây Bắc',
    region: 'Vùng Tây Bắc',
    description: 'Nơi hội tụ bản sắc văn hóa các dân tộc H’mông, Dao Đỏ, Tày, Giáy. Nổi tiếng với kỹ thuật nhuộm chàm, thêu thổ cẩm thủ công tinh xảo và họa tiết sáp ong độc đáo mang đậm linh hồn núi rừng.',
    attire: 'Váy xòe thổ cẩm H’mông, Áo chàm thêu hoa văn, Khăn đội đầu Dao Đỏ',
    events: 'Chợ tình Sa Pa, Lễ hội Gầu Tào, Lễ Cấp Sắc của người Dao',
    gradient: 'from-emerald-700 to-teal-900',
  },
  'north-hanoi': {
    title: 'Thăng Long - Hà Nội',
    region: 'Vùng Đồng Bằng Sông Hồng',
    description: 'Trái tim văn hóa ngàn năm văn hiến của đất Bắc. Trang phục cổ truyền nơi đây mang nét thanh lịch, trang nhã, từ tà Áo Tứ Thân mộc mạc của phụ nữ Kinh Bắc đến Áo Dài ngũ thân quý phái chốn kinh kỳ.',
    attire: 'Áo Tứ Thân, Áo Ngũ Thân tay chẽn, Áo Giao Lĩnh, Nón Quai Thao',
    events: 'Hội Gióng, Hội Chùa Hương, Lễ hội Thăng Long - Hà Nội',
    gradient: 'from-amber-700 to-stone-900',
  },
  'north-halong': {
    title: 'Hạ Long - Quảng Ninh',
    region: 'Vùng Đông Bắc',
    description: 'Vùng đất di sản thiên nhiên thế giới kỳ vĩ, giao thoa giữa văn hóa biển đảo của ngư dân vùng vịnh và sắc phục rực rỡ của các dân tộc Dao Thanh Phán, Sán Dìu miền biên cương.',
    attire: 'Trang phục ngũ sắc Dao Thanh Phán, Áo dài lụa xanh màu ngọc bích vịnh biển',
    events: 'Carnaval Hạ Long, Lễ hội Yên Tử, Lễ hội Đền Cửa Ông',
    gradient: 'from-cyan-700 to-blue-950',
  },
  'north-ninhbinh': {
    title: 'Cố Đô Hoa Lư - Ninh Bình',
    region: 'Vùng Cố Đô Bắc Bộ',
    description: 'Kinh đô đầu tiên của nhà nước phong kiến tập quyền Việt Nam (thời Đinh - Tiền Lê). Nơi lưu giữ những đường nét trang phục cổ phục đầu thời kỳ tự chủ với phom dáng giao lĩnh uy nghiêm, mộc mạc.',
    attire: 'Áo Giao Lĩnh cổ phục, Áo Viên Lĩnh thời Đinh - Tiền Lê',
    events: 'Lễ hội Cố đô Hoa Lư, Lễ hội Tràng An, Hội Chùa Bái Đính',
    gradient: 'from-emerald-800 to-stone-900',
  },
  'central-hue': {
    title: 'Cố Đô Huế',
    region: 'Vùng Bắc Trung Bộ',
    description: 'Kinh đô triều Nguyễn với đỉnh cao nghệ thuật trang phục cung đình. Nơi ra đời của chiếc Áo Dài hiện đại và tuyệt tác Áo Nhật Bình quyền quý với màu sắc cung phụng, hoa văn thêu rồng phượng tinh xảo.',
    attire: 'Áo Nhật Bình cung đình, Áo Dài Huế sắc tím hoa cà, Cổ phục triều Nguyễn',
    events: 'Festival Huế, Lễ Tế Nam Giao, Đêm Hoàng Cung',
    gradient: 'from-purple-800 to-indigo-950',
  },
  'central-danang': {
    title: 'Đà Nẵng & Biển Đảo',
    region: 'Vùng Duyên Hải Nam Trung Bộ',
    description: 'Thành phố đầu biển cuối sông, nơi gìn giữ truyền thống lễ hội Cầu Ngư và gắn liền với huyện đảo Hoàng Sa thiêng liêng. Nét văn hóa trang phục mang sự khoáng đạt, duyên dáng của cư dân duyên hải.',
    attire: 'Áo Dài cách tân duyên dáng, Trang phục lễ hội Cầu Ngư duyên hải',
    events: 'Lễ hội Cầu Ngư truyền thống, Lễ hội Quán Thế Âm Ngũ Hành Sơn',
    gradient: 'from-blue-700 to-indigo-900',
  },
  'central-hoian': {
    title: 'Phố Cổ Hội An',
    region: 'Vùng Duyên Hải Quảng Nam',
    description: 'Thương cảng quốc tế sầm uất thế kỷ 16-17, nơi kết tinh của tơ lụa Mã Châu truyền thống. Áo Dài phố cổ mang vẻ đẹp hoài niệm, cổ kính với chất liệu lụa tơ tằm dệt thủ công mềm mại, bay bổng.',
    attire: 'Áo Dài lụa tơ tằm Hội An, Cổ phục ngũ thân phố cổ',
    events: 'Đêm phố cổ hoa đăng Hội An, Lễ hội Bà Thu Bồn, Lễ hội tơ lụa',
    gradient: 'from-amber-600 to-yellow-950',
  },
  'central-highlands': {
    title: 'Không Gian Văn Hóa Tây Nguyên',
    region: 'Vùng Cao Nguyên Trung Bộ',
    description: 'Vùng đất sử thi huyền thoại của các dân tộc Ê-đê, Ba Na, Gia Rai. Trang phục thổ cẩm mang gam màu tương phản mạnh mẽ đen - đỏ - chàm, gắn liền với di sản Không gian văn hóa Cồng chiêng được UNESCO vinh danh.',
    attire: 'Áo chui đầu nam thổ cẩm, Váy quấn phụ nữ Ê-đê viền hoa văn mặt trời',
    events: 'Lễ hội Cồng Chiêng Tây Nguyên, Lễ mừng lúa mới, Hội đua voi Buôn Đôn',
    gradient: 'from-red-800 to-amber-950',
  },
  'south-saigon': {
    title: 'Sài Gòn - TP. Hồ Chí Minh',
    region: 'Vùng Đông Nam Bộ',
    description: 'Trung tâm giao lưu văn hóa sôi động phương Nam. Nơi tiên phong của phong trào Áo Dài Lemur, Áo Dài Raglan và các cách tân thời trang hiện đại kết hợp tinh tế giữa truyền thống và phong cách quốc tế.',
    attire: 'Áo Dài Lemur & Raglan, Áo Dài tân thời hiện đại, Áo Bà Ba thành thị',
    events: 'Lễ hội Áo Dài TP.HCM, Lễ hội Trái cây Nam Bộ, Lễ hội Nghinh Ông',
    gradient: 'from-rose-700 to-pink-950',
  },
  'south-cantho': {
    title: 'Cần Thơ & Miền Tây',
    region: 'Vùng Đồng Bằng Sông Cửu Long',
    description: 'Miền sông nước Cửu Long trù phú hiền hòa. Chiếc Áo Bà Ba duyên dáng kết hợp cùng chiếc Khăn Rằn Nam Bộ đã trở thành biểu tượng thân thương của sự mộc mạc, phóng khoáng và tảo tần của người dân phương Nam.',
    attire: 'Áo Bà Ba truyền thống, Khăn Rằn Nam Bộ, Nón Lá chóp nhọn',
    events: 'Chợ nổi Cái Răng, Lễ hội Bánh dân gian Nam Bộ, Lễ hội Ok Om Bok',
    gradient: 'from-emerald-600 to-teal-950',
  },
};

interface HeritagePanelProps {
  selectedRegionId?: string | null;
  onClose?: () => void;
}

export default function HeritagePanel({ selectedRegionId, onClose }: HeritagePanelProps) {
  if (!selectedRegionId) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center text-stone-500 dark:text-stone-400 select-none">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center mb-4 text-emerald-600 dark:text-emerald-400">
          <MapPin className="w-8 h-8 opacity-80 animate-bounce" />
        </div>
        <h3 className="text-xl font-bold text-stone-800 dark:text-stone-200 mb-2">
          Chọn vùng đất trên bản đồ
        </h3>
        <p className="text-sm max-w-xs leading-relaxed text-stone-600 dark:text-stone-400">
          Nhấp vào các điểm đánh dấu văn hóa hoặc bất kỳ tỉnh thành nào trên dải đất hình chữ S để khám phá tinh hoa trang phục và di sản.
        </p>
      </div>
    );
  }

  // Resolve data either from curated regional records or generic province lookup
  let data: HeritageInfo;
  
  if (HERITAGE_DATA[selectedRegionId]) {
    data = HERITAGE_DATA[selectedRegionId];
  } else {
    // Check if it matches a province ID or a region containing this province
    const matchedRegion = CULTURAL_REGIONS.find(
      (r) => r.provinceId === selectedRegionId || r.id === selectedRegionId
    );

    if (matchedRegion && HERITAGE_DATA[matchedRegion.id]) {
      data = HERITAGE_DATA[matchedRegion.id];
    } else {
      const province = VIETNAM_PROVINCES.find((p) => p.id === selectedRegionId);
      const provinceName = province ? province.name : selectedRegionId;
      const macroRegionMap = {
        north: 'Vùng Bắc Bộ',
        central: 'Vùng Trung Bộ',
        highlands: 'Vùng Tây Nguyên',
        south: 'Vùng Nam Bộ',
      };
      const regionName = province ? macroRegionMap[province.region] : 'Việt Nam';

      data = {
        title: provinceName,
        region: regionName,
        description: `Vùng đất ${provinceName} mang đậm dấu ấn phong tục tập quán lâu đời, gắn liền với kho tàng văn hóa dân gian và nếp sống truyền thống của các cộng đồng cư dân địa phương qua nhiều thế hệ.`,
        attire: 'Áo Dài truyền thống, Trang phục dân gian địa phương, Áo Cổ phục',
        events: `Lễ hội truyền thống ${provinceName}, Tết Nguyên Đán, Hội làng mùa xuân`,
        gradient: 'from-stone-700 to-stone-900',
      };
    }
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-stone-900 overflow-y-auto animate-in slide-in-from-right-8 duration-300">
      {/* Header Banner Area */}
      <div className={`relative h-56 bg-gradient-to-br ${data.gradient || 'from-emerald-700 to-teal-900'} flex-shrink-0 flex flex-col justify-end p-6 text-white overflow-hidden shadow-inner`}>
        {/* Subtle decorative motif */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute top-4 left-4 z-10 flex items-center space-x-1.5 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-emerald-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Di sản Văn Hóa</span>
        </div>

        {/* Close Button */}
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-sm transition-colors z-20"
            aria-label="Đóng bảng thông tin"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Banner Title */}
        <div className="relative z-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/90 block mb-1">
            {data.region}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight drop-shadow-sm">
            {data.title}
          </h2>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xs uppercase font-bold text-stone-400 dark:text-stone-500 tracking-wider mb-2">
            Tổng quan di sản
          </h3>
          <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed mb-6 font-normal">
            {data.description}
          </p>

          {/* Info Cards */}
          <div className="space-y-3.5">
            {data.attire && (
              <div className="bg-stone-50 dark:bg-stone-800/60 p-4 rounded-xl border border-stone-200/80 dark:border-stone-800 transition-all hover:border-emerald-500/40">
                <div className="flex items-center space-x-2 text-stone-900 dark:text-white font-semibold text-sm mb-1.5">
                  <Shirt className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h4>Trang phục tiêu biểu</h4>
                </div>
                <p className="text-sm text-stone-600 dark:text-stone-300 pl-6 leading-relaxed">
                  {data.attire}
                </p>
              </div>
            )}

            {data.events && (
              <div className="bg-stone-50 dark:bg-stone-800/60 p-4 rounded-xl border border-stone-200/80 dark:border-stone-800 transition-all hover:border-emerald-500/40">
                <div className="flex items-center space-x-2 text-stone-900 dark:text-white font-semibold text-sm mb-1.5">
                  <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h4>Lễ hội & Không gian văn hóa</h4>
                </div>
                <p className="text-sm text-stone-600 dark:text-stone-300 pl-6 leading-relaxed">
                  {data.events}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action Button to Studio */}
        <div className="mt-8 pt-4 border-t border-stone-200 dark:border-stone-800">
          <Link
            href="/studio"
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm rounded-xl transition-all shadow-sm hover:shadow-emerald-600/25 flex items-center justify-center space-x-2"
          >
            <Shirt className="w-4 h-4" />
            <span>Thử trang phục trong Studio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}