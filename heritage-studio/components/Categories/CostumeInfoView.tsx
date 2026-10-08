'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  LayoutGrid, 
  Clock, 
  Layers 
} from 'lucide-react';
import { CostumeItem, EXTENDED_COSTUMES } from './costumeTypes';
import CostumeCard from './CostumeCard';
import CostumeTimeline from './CostumeTimeline';
import CollarAnatomyGuide from './CollarAnatomyGuide';
import CostumeDetailModal from './CostumeDetailModal';

type ViewMode = 'grid' | 'timeline' | 'anatomy';

export default function CostumeInfoView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<string>('ca_2');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [inspectCostume, setInspectCostume] = useState<CostumeItem | null>(null);

  // Categories list
  const categories = useMemo(() => [
    { id: 'all', label: 'Tất cả cổ phục' },
    { id: 'hoang_gia', label: 'Hoàng gia / Cung đình', match: 'Hoàng gia' },
    { id: 'le_phuc', label: 'Lễ phục truyền thống', match: 'Lễ phục' },
    { id: 'thuong_phuc', label: 'Thường phục & Tiền thân', match: 'Thường phục' },
    { id: 'dan_gian', label: 'Dân gian & Dân dã', match: 'Dân gian' },
    { id: 'quoc_phuc', label: 'Quốc phục hiện đại', match: 'Quốc phục' },
  ], []);

  // Filtered Costumes
  const filteredCostumes = useMemo(() => {
    return EXTENDED_COSTUMES.filter((costume) => {
      // Search matching
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery = !query || 
        costume.name.toLowerCase().includes(query) ||
        costume.other_names.some((n) => n.toLowerCase().includes(query)) ||
        costume.era.toLowerCase().includes(query) ||
        costume.collar_type.toLowerCase().includes(query) ||
        costume.key_features.toLowerCase().includes(query) ||
        costume.category.toLowerCase().includes(query);

      // Category matching
      let matchesCategory = true;
      if (selectedCategory !== 'all') {
        const cat = categories.find((c) => c.id === selectedCategory);
        if (cat && cat.match) {
          matchesCategory = costume.category.toLowerCase().includes(cat.match.toLowerCase());
        }
      }

      // Gender matching
      let matchesGender = true;
      if (selectedGender === 'nam') {
        matchesGender = costume.gender.toLowerCase().includes('nam');
      } else if (selectedGender === 'nu') {
        matchesGender = costume.gender.toLowerCase() === 'nữ' || !costume.gender.toLowerCase().includes('cả nam');
      }
      // 'ca_2' displays all costumes (both genders)

      return matchesQuery && matchesCategory && matchesGender;
    });
  }, [searchQuery, selectedCategory, selectedGender, categories]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedGender('ca_2');
  };

  return (
    <div className="w-full flex flex-col space-y-6">
      {/* Main View Mode Selector Tabs */}
      <div className="w-full flex items-center border-b border-stone-200 dark:border-stone-800 pb-4">
        <div className="flex items-center space-x-1.5 p-1 bg-stone-100 dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 w-full sm:w-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center space-x-2 ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-stone-800 text-emerald-700 dark:text-emerald-400 shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Thư Viện Tra Cứu</span>
          </button>

          <button
            onClick={() => setViewMode('timeline')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center space-x-2 ${
              viewMode === 'timeline'
                ? 'bg-white dark:bg-stone-800 text-emerald-700 dark:text-emerald-400 shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Dòng Thời Gian Lịch Sử</span>
          </button>

          <button
            onClick={() => setViewMode('anatomy')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center space-x-2 ${
              viewMode === 'anatomy'
                ? 'bg-white dark:bg-stone-800 text-emerald-700 dark:text-emerald-400 shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Giải Phẫu 5 Dạng Cổ Áo</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar (Active in Grid View) */}
      {viewMode === 'grid' && (
        <div className="w-full space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            {/* Live Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm theo tên (Giao Lĩnh, Nhật Bình, Tấc...), thời kỳ, kiểu cổ áo, đặc điểm..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                >
                  Xóa
                </button>
              )}
            </div>

            {/* Gender Filter Buttons */}
            <div className="flex items-center space-x-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl flex-shrink-0 text-xs">
              <button
                onClick={() => setSelectedGender('nam')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedGender === 'nam'
                    ? 'bg-white dark:bg-stone-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                Nam
              </button>
              <button
                onClick={() => setSelectedGender('nu')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedGender === 'nu'
                    ? 'bg-white dark:bg-stone-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                Nữ
              </button>
              <button
                onClick={() => setSelectedGender('ca_2')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedGender === 'ca_2'
                    ? 'bg-white dark:bg-stone-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                Cả 2
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none flex-wrap gap-y-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-600 text-white font-semibold shadow-emerald-600/30'
                    : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-750'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Dynamic Content Views */}
      {viewMode === 'grid' && (
        <div>
          {filteredCostumes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredCostumes.map((costume) => (
                <CostumeCard
                  key={costume.id}
                  costume={costume}
                  onSelect={(item) => setInspectCostume(item)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8">
              <Search className="w-12 h-12 text-stone-400 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2">
                Không tìm thấy trang phục phù hợp
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mb-6 max-w-sm mx-auto">
                Không có kết quả nào cho từ khóa &ldquo;{searchQuery}&rdquo;. Hãy thử tìm bằng tên cổ phục như Áo dài, Nhật bình, Tấc hoặc Giao lĩnh.
              </p>
              <button
                onClick={resetFilters}
                className="py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Xóa bộ lọc & xem tất cả
              </button>
            </div>
          )}
        </div>
      )}

      {viewMode === 'timeline' && (
        <CostumeTimeline onSelectCostume={(item) => setInspectCostume(item)} />
      )}

      {viewMode === 'anatomy' && (
        <CollarAnatomyGuide onSelectCostume={(item) => setInspectCostume(item)} />
      )}

      {/* Deep-Dive Detail Modal */}
      <CostumeDetailModal
        costume={inspectCostume}
        onClose={() => setInspectCostume(null)}
      />
    </div>
  );
}
