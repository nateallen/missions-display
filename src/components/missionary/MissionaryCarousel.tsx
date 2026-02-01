'use client';

import { useMissionaryStore } from '@/lib/store/useMissionaryStore';
import MissionaryCard from './MissionaryCard';

export default function MissionaryCarousel() {
  const { filteredMissionaries } = useMissionaryStore();

  if (filteredMissionaries.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-white mb-2">No missionaries found</h3>
          <p className="text-gray-300">
            Try selecting a different region on the map or clearing filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="flex flex-col gap-4 p-4">
        {filteredMissionaries.map((missionary) => (
          <MissionaryCard key={missionary.id} missionary={missionary} variant="compact" />
        ))}
      </div>
    </div>
  );
}
