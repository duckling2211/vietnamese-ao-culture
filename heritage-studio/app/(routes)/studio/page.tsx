import StudioLayout from '@/components/Studio/StudioLayout';
import InputPanel from '@/components/Studio/InputPanel';
import AvatarCanvas from '@/components/Studio/AvatarCanvas';
import StudioControls from '@/components/Studio/StudioControls';
import ComparisonSidebar from '@/components/Studio/ComparisonSidebar';

export default function DressUpStudioPage() {
  return (
    <div className="h-[calc(100vh-64px)] w-full overflow-hidden bg-stone-100 dark:bg-stone-950">
      {/* 
        StudioLayout acts as a CSS Grid manager to position 
        the AI text input, the canvas, controls, and sidebars.
      */}
      <StudioLayout
        leftSidebar={<InputPanel />}
        mainCanvas={<AvatarCanvas />}
        bottomControls={<StudioControls />}
        rightSidebar={<ComparisonSidebar />}
      />
    </div>
  );
}