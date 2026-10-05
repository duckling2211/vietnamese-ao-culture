import VietnamSVG from '@/components/Map/VietnamSVG';
import HeritagePanel from '@/components/Map/HeritagePanel';

export default function MapPage() {
  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] w-full overflow-hidden">
      {/* Left side: Interactive Map */}
      <div className="flex-1 relative bg-blue-50 dark:bg-stone-800 p-4 flex items-center justify-center">
        <div className="absolute top-4 left-4 z-10 bg-white/80 dark:bg-black/50 p-4 rounded shadow backdrop-blur">
          <h1 className="text-2xl font-bold">Map of Culture</h1>
          <p className="text-sm">Hover over regions to explore heritage.</p>
        </div>
        
        <div className="w-full max-w-2xl h-full relative">
          <VietnamSVG />
          {/* RegionMarkers are typically rendered inside or alongside VietnamSVG */}
        </div>
      </div>

      {/* Right side: Slide-In Description Panel */}
      <div className="w-full lg:w-96 bg-white dark:bg-stone-900 border-l border-stone-200 dark:border-stone-700 shadow-xl z-20">
        <HeritagePanel />
      </div>
    </div>
  );
}