import rawCostumes from '@/costume.json';

export interface CostumeItem {
  id: string;
  name: string;
  other_names: string[];
  era: string;
  gender: string;
  category: string;
  collar_type: string;
  key_features: string;
  wikipedia_url: string;
  // Enhanced cultural attributes
  period_order: number;
  century: string;
  significance: string;
  anatomy: {
    collar: string;
    sleeves: string;
    panels: string;
    accessories: string;
  };
  palette: {
    name: string;
    primary: string;
    secondary: string;
    gradient: string;
    badge: string;
  };
  dynasties: string[];
}

export const EXTENDED_COSTUMES: CostumeItem[] = [
  {
    ...rawCostumes[0], // giao_linh
    period_order: 1,
    century: 'Thế kỷ 11 – 19',
    significance: 'Dạng thức y phục cổ kính và tôn nghiêm hàng đầu trong lịch sử Đại Việt. Thường dùng làm lễ phục triều nghi hoặc trang phục quý tộc thời Lý, Trần, Hậu Lê.',
    anatomy: {
      collar: 'Cổ chéo vạt (vạt trái đè vạt phải sang nách phải kín đáo).',
      sleeves: 'Ống tay thụng rộng hoặc tay rộng phủ qua bàn tay.',
      panels: 'Thân áo vạt dài buông qua gối, mặc lót kèm áo đơn bên trong.',
      accessories: 'Thắt lưng đại đới bản rộng, hài cổ phong, búi tóc hoặc đội khăn.'
    },
    palette: {
      name: 'Thanh Lam & Chàm Đại Việt',
      primary: '#0d9488',
      secondary: '#134e4a',
      gradient: 'from-teal-800 via-emerald-900 to-stone-950',
      badge: 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 border-teal-300 dark:border-teal-800'
    },
    dynasties: ['Lý', 'Trần', 'Lê', 'Nguyễn']
  },
  {
    ...rawCostumes[1], // nhat_binh
    period_order: 3,
    century: 'Thế kỷ 19 – 20 (1802–1945)',
    significance: 'Tuyệt tác thường phục của Hậu phi, Công chúa và mệnh phụ quý tộc triều Nguyễn. Màu sắc phân cấp nghiêm ngặt theo điển lệ: Hoàng hậu dùng sắc vàng, Công chúa sắc đỏ, Quý phi sắc tím hoa cà.',
    anatomy: {
      collar: 'Cổ áo ghép dải viền to bản hình chữ nhật úp trước ngực (tạo thành chữ Nhật 日).',
      sleeves: 'Cửa tay áo may dải ngũ sắc biểu trưng cho Ngũ hành (Kim - Mộc - Thủy - Hỏa - Thổ).',
      panels: 'Thân áo dài xẻ tà hai bên hông, cài bằng cúc vàng hoặc cúc ngọc trước ngực.',
      accessories: 'Khăn vành dây quấn nhiều vòng mạ kim, hài thêu chim phụng, trâm cài tóc.'
    },
    palette: {
      name: 'Xích Phượng & Cung Đình Huế',
      primary: '#b45309',
      secondary: '#7c2d12',
      gradient: 'from-amber-700 via-rose-900 to-purple-950',
      badge: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800'
    },
    dynasties: ['Triều Nguyễn', 'Hoàng Gia']
  },
  {
    ...rawCostumes[2], // ngu_than
    period_order: 2,
    century: 'Thế kỷ 18 – 20 (Từ 1744)',
    significance: 'Khởi nguồn từ cuộc cải cách y phục năm 1744 của chúa Nguyễn Phúc Khoát tại Đàng Trong nhằm xác lập bản sắc y phục riêng. Bốn thân ngoài tượng trưng cho tứ thân phụ mẫu, thân thứ năm bên trong tượng trưng cho người mặc; 5 chiếc cúc áo là biểu trưng của Ngũ thường (Nhân, Lễ, Nghĩa, Trí, Tín).',
    anatomy: {
      collar: 'Cổ đứng tròn (lập lĩnh) cao 2-3cm ôm khít cổ trang nhã.',
      sleeves: 'Tay chẽn ôm gọn cổ tay, linh hoạt cho sinh hoạt và làm việc.',
      panels: '5 thân vải ghép dọc, vạt áo cong hình cánh cung mềm mại.',
      accessories: 'Khăn đóng (khăn xếp) quấn nếp chữ Nhất hoặc chữ Nhân, quần lụa trắng.'
    },
    palette: {
      name: 'Nâu Đồng & Thường Phục Nho Nhã',
      primary: '#d97706',
      secondary: '#78350f',
      gradient: 'from-amber-800 via-yellow-950 to-stone-950',
      badge: 'bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300 border-orange-300 dark:border-orange-800'
    },
    dynasties: ['Chúa Nguyễn', 'Triều Nguyễn']
  },
  {
    ...rawCostumes[3], // ao_tac
    period_order: 4,
    century: 'Thế kỷ 19 – 20',
    significance: 'Lễ phục trang trọng bậc nhất của người Việt từ quan viên đến thứ dân trong các dịp đại lễ: hôn lễ, cúng tế tổ tiên, tế tự đình miếu. Tên gọi xuất phát từ ống tay rộng đúng 1 tấc xưa (~10cm buông thẳng, thực tế thụng rộng 30-45cm).',
    anatomy: {
      collar: 'Cổ đứng lập lĩnh cổ truyền kín đáo, thanh tao.',
      sleeves: 'Ống tay thụng rộng buông dài qua bàn tay, khi chắp tay tạo phong thái nho nhã.',
      panels: 'Phom dáng ngũ thân rộng rãi dài qua bắp chân, cử chỉ uy nghi.',
      accessories: 'Khăn đóng truyền thống, quần trắng ống rộng, giày nhung hoặc guốc gỗ.'
    },
    palette: {
      name: 'Lam Khí & Lễ Nghi Phong Điển',
      primary: '#2563eb',
      secondary: '#1e3a8a',
      gradient: 'from-blue-800 via-indigo-950 to-stone-950',
      badge: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300 dark:border-blue-800'
    },
    dynasties: ['Triều Nguyễn', 'Lễ Phục Dân Tộc']
  },
  {
    ...rawCostumes[4], // tu_than
    period_order: 5,
    century: 'Trước thế kỷ 20',
    significance: 'Biểu tượng bình dị, tần tảo mà duyên dáng của người phụ nữ nông thôn Bắc Bộ. Bốn vạt áo mang ý niệm tứ thân phụ mẫu nâng niu, che chở. Gắn liền với câu ca Quan họ Kinh Bắc và những mùa hội xuân trẩy hội đình làng.',
    anatomy: {
      collar: 'Cổ mở không cúc để lộ lớp áo yếm đào thêu chỉ tơ bên trong.',
      sleeves: 'Tay áo bó vừa vặn cổ tay thuận tiện lao động đồng áng.',
      panels: 'Hai vạt sau khâu liền sống áo, hai vạt trước buông tự do hoặc buộc vạt trước bụng.',
      accessories: 'Áo yếm đào, dải thắt lưng hoa lý, nón quai thao ba tầm, khăn mỏ quạ.'
    },
    palette: {
      name: 'Hồng Đào & Hồn Quê Quan Họ',
      primary: '#e11d48',
      secondary: '#881337',
      gradient: 'from-rose-800 via-red-950 to-stone-950',
      badge: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300 dark:border-rose-800'
    },
    dynasties: ['Dân Gian Bắc Bộ']
  },
  {
    ...rawCostumes[5], // ao_ba_ba
    period_order: 6,
    century: 'Thế kỷ 19 – Nay',
    significance: 'Hồn cốt mộc mạc, hào sảng và phóng khoáng của cư dân miền sông nước Cửu Long. Xuất hiện trong quá trình khẩn hoang Nam Bộ, chiếc Áo Bà ba nhẹ nhàng, mát mẻ đồng hành cùng bao thế hệ người dân phương Nam.',
    anatomy: {
      collar: 'Cổ tròn xẻ giữa ngực, đính hàng khuy bấm hoặc cúc cài thẳng tắp.',
      sleeves: 'Tay áo dài may chẽn nhẹ cổ tay, thân áo chiết eo nhẹ thanh thoát.',
      panels: 'Xẻ tà hai bên hông cao tới eo, thân trước có hai túi to vuông vức đựng trầu cau/đồ đạc.',
      accessories: 'Khăn rằn sọc caro quàng cổ, nón lá chóp nhọn, quần lụa đen ống suông.'
    },
    palette: {
      name: 'Phù Sa & Đồng Lúa Nam Bộ',
      primary: '#059669',
      secondary: '#064e3b',
      gradient: 'from-emerald-700 via-teal-950 to-stone-950',
      badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
    },
    dynasties: ['Nam Bộ']
  },
  {
    ...rawCostumes[6], // ao_dai
    period_order: 7,
    century: 'Thập niên 1930 – Nay',
    significance: 'Quốc phục và niềm kiêu hãnh của văn hóa Việt Nam đương đại trên toàn thế giới. Kế thừa phom dáng ngũ thân truyền thống kết hợp cách tân Tây phương của nhóm Tự Lực Văn Đoàn và áo dài Raglan Sài Gòn, tôn vinh trọn vẹn vẻ đẹp mềm mại của phụ nữ Việt.',
    anatomy: {
      collar: 'Cổ đứng, cổ trụ truyền thống cao 2-4cm, hoặc biến tấu cổ tròn/cổ thuyền hiện đại.',
      sleeves: 'Ráp tay Raglan từ cổ xuống nách ôm khít bờ vai mềm mại, không nhăn nếp.',
      panels: 'Hai tà trước và sau xẻ cao tới eo, buông thướt tha chạm mắt cá chân.',
      accessories: 'Quần lụa ống rộng màu trắng hoặc đồng màu, nón lá bài thơ, trang sức ngọc trai.'
    },
    palette: {
      name: 'Kim Liên & Quốc Phục Tỏa Sáng',
      primary: '#f43f5e',
      secondary: '#4c0519',
      gradient: 'from-rose-600 via-pink-900 to-indigo-950',
      badge: 'bg-pink-100 text-pink-800 dark:bg-pink-950/60 dark:text-pink-300 border-pink-300 dark:border-pink-800'
    },
    dynasties: ['Hiện Đại', 'Quốc Phục']
  }
];
