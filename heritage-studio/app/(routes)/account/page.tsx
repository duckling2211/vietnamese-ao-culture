import ProfileInfo from '@/components/Account/ProfileInfo';
import SavedGallery from '@/components/Account/SavedGallery';

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Account Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1">
          <ProfileInfo />
        </div>
        
        {/* Saved Gallery Grid */}
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2 border-stone-200">My Saved Outfits</h2>
          <SavedGallery />
        </div>
      </div>
    </div>
  );
}