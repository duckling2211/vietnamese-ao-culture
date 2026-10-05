'use client';

import React from 'react';

interface StudioLayoutProps {
  leftSidebar: React.ReactNode;
  mainCanvas: React.ReactNode;
  bottomControls: React.ReactNode;
  rightSidebar: React.ReactNode;
}

export default function StudioLayout({ 
  leftSidebar, 
  mainCanvas, 
  bottomControls, 
  rightSidebar 
}: StudioLayoutProps) {
  return (
    <div className="flex flex-col h-full w-full lg:flex-row overflow-hidden bg-stone-100 dark:bg-stone-950">
      {/* Left Sidebar: AI Input & Manual Controls */}
      <aside className="w-full lg:w-80 border-r border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex-shrink-0 z-20 flex flex-col h-1/2 lg:h-full">
        {leftSidebar}
      </aside>

      {/* Main Canvas Area */}
      <main className="flex-1 flex flex-col min-w-0 relative h-full">
        <div className="flex-1 overflow-hidden relative flex items-center justify-center p-4">
          {mainCanvas}
        </div>
        
        {/* Bottom Controls */}
        <div className="h-20 border-t border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 backdrop-blur flex-shrink-0 z-20 px-4">
          {bottomControls}
        </div>
      </main>

      {/* Right Sidebar: Comparison & References */}
      <aside className="hidden xl:flex w-72 border-l border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex-shrink-0 z-20 flex-col h-full overflow-y-auto">
        {rightSidebar}
      </aside>
    </div>
  );
}