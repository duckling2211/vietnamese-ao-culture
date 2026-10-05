import CategoriesView from '@/components/Categories/CategoriesView';
import FilterSort from '@/components/Categories/FilterSort';
import MasonryGrid from '@/components/Categories/MasonryGrid';

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Cultural Database</h1>
        <FilterSort />
      </div>
      
      {/* CategoriesView handles the Tabs for [Clothes], [Events], [Avatars] */}
      <CategoriesView>
        <MasonryGrid />
      </CategoriesView>
    </div>
  );
}