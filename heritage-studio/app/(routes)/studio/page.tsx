import { Metadata } from 'next';
import StudioContainer from '@/components/Studio/StudioContainer';

export const metadata: Metadata = {
  title: 'Heritage Studio • AI Thẩm Định & Thử Cổ Phục Việt Nam | HeritageStudio',
  description: 'Studio AI: Thẩm định chuẩn mực cổ phục Việt Nam kết hợp phong cách thời thượng Gen Z, và tạo ảnh chân dung mặc thử cổ phục ảo từ kho tàng di sản y phục.',
};

export default function DressUpStudioPage() {
  return <StudioContainer />;
}