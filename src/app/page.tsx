'use client';

import Header from '@/components/shared/Header';
import WorldMap from '@/components/map/WorldMap';
import MissionaryCarousel from '@/components/missionary/MissionaryCarousel';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { useMissionaries } from '@/hooks/useMissionaries';
import { useUIStore } from '@/lib/store/useUIStore';

export default function Home() {
  const { missionaries, isLoading, error } = useMissionaries();
  const { isSidebarOpen, toggleSidebar } = useUIStore();

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Missionaries</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header showPanel={isSidebarOpen} onTogglePanel={toggleSidebar} />

      <div className="relative flex-1 overflow-hidden">
        {/* Map Section - Full width */}
        <div className="absolute inset-0">
          <WorldMap />
        </div>

        {/* Missionary Cards Section - Overlay on right */}
        {isSidebarOpen && (
          <div className="absolute top-4 right-4 bottom-4 w-full max-w-[400px] lg:max-w-[420px] pointer-events-none">
            <div className="h-full rounded-xl bg-gray-800/85 backdrop-blur-md shadow-2xl border border-gray-700/50 overflow-hidden pointer-events-auto">
              <MissionaryCarousel />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
