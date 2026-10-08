import CostumeInfoView from '@/components/Categories/CostumeInfoView';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Info • Văn Hóa Cổ Phục Việt Nam | HeritageStudio',
  description: 'Trang thông tin tra cứu và tìm hiểu văn hóa trang phục truyền thống Việt Nam — từ cổ phục triều đình đến sắc phục dân gian và quốc phục đương đại.',
};

export default function InfoRoutePage() {
  return (
    <div className="min-h-screen bg-stone-50/50 dark:bg-stone-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <CostumeInfoView />
      </div>
    </div>
  );
}
