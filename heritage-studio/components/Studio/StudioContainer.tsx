'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Shirt, 
  Key, 
  ShieldCheck
} from 'lucide-react';
import Task1Evaluator from './Task1Evaluator';
import Task2TryOn from './Task2TryOn';
import { DEFAULT_GEMINI_KEY } from '@/lib/gemini';

type StudioTab = 'task1' | 'task2';

export default function StudioContainer() {
  const [activeTab, setActiveTab] = useState<StudioTab>('task1');
  const [customApiKey, setCustomApiKey] = useState<string>(DEFAULT_GEMINI_KEY);
  const [showKeyModal, setShowKeyModal] = useState<boolean>(false);
  const [keyInput, setKeyInput] = useState<string>(DEFAULT_GEMINI_KEY);

  const handleSaveKey = () => {
    setCustomApiKey(keyInput.trim() || DEFAULT_GEMINI_KEY);
    setShowKeyModal(false);
  };

  return (
    <div className="w-full min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-stone-50/50 dark:bg-stone-950">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Studio Top Navigation Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white dark:bg-stone-900 rounded-3xl p-3 border border-stone-200 dark:border-stone-800 shadow-sm">
          {/* Task Navigation Switcher */}
          <div className="flex items-center space-x-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-2xl w-full md:w-auto">
            <button
              onClick={() => setActiveTab('task1')}
              className={`flex-1 md:flex-none px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center space-x-2 ${
                activeTab === 'task1'
                  ? 'bg-white dark:bg-stone-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Nhiệm Vụ 1: Thẩm Định Cổ Phục & Gu Gen Z</span>
            </button>

            <button
              onClick={() => setActiveTab('task2')}
              className={`flex-1 md:flex-none px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center space-x-2 ${
                activeTab === 'task2'
                  ? 'bg-white dark:bg-stone-900 text-teal-700 dark:text-teal-400 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Shirt className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Nhiệm Vụ 2: Thử Đồ Cổ Phục Ảo & Tạo Ảnh</span>
            </button>
          </div>

          {/* Right API Key Status & Settings */}
          <div className="flex items-center space-x-3 px-2 justify-end">
            <div className="flex items-center space-x-1.5 text-xs text-stone-600 dark:text-stone-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden sm:inline">Gemini AI Studio:</span>
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-mono text-[11px] font-semibold border border-emerald-300 dark:border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Đã kết nối</span>
              </span>
            </div>

            <button
              onClick={() => setShowKeyModal(true)}
              className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition text-xs flex items-center space-x-1"
              title="Cấu hình API Key"
            >
              <Key className="w-3.5 h-3.5" />
              <span className="hidden md:inline font-medium">Đổi Key</span>
            </button>
          </div>
        </div>

        {/* Task 1 Component View */}
        {activeTab === 'task1' && (
          <Task1Evaluator apiKey={customApiKey} />
        )}

        {/* Task 2 Component View */}
        {activeTab === 'task2' && (
          <Task2TryOn apiKey={customApiKey} />
        )}
      </div>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-stone-200 dark:border-stone-800 shadow-2xl relative">
            <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2 flex items-center space-x-2">
              <Key className="w-5 h-5 text-emerald-600" />
              <span>Cấu Hình Google Gemini API Key</span>
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-4 leading-relaxed">
              Hệ thống đã tự động cài đặt API Key được cung cấp. Bạn có thể thay đổi key khác nếu muốn:
            </p>

            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="Dán Gemini API Key tại đây (để trống để dùng key mặc định từ .env)..."
              className="w-full p-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-mono mb-4 focus:ring-2 focus:ring-emerald-500 outline-none"
            />

            <div className="flex items-center justify-end space-x-2">
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
              >
                Đóng
              </button>
              <button
                onClick={handleSaveKey}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-sm"
              >
                Lưu Thay Đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
