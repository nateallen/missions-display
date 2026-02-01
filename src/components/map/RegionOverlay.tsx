'use client';

import { X } from 'lucide-react';
import { Region } from '@/types';
import { useMapStore } from '@/lib/store/useMapStore';
import { useMissionaryStore } from '@/lib/store/useMissionaryStore';

interface RegionOverlayProps {
  region: Region;
}

export default function RegionOverlay({ region }: RegionOverlayProps) {
  const { resetMap } = useMapStore();
  const { filteredMissionaries, clearFilters } = useMissionaryStore();

  const handleClear = () => {
    resetMap();
    clearFilters();
  };

  return (
    <div className="absolute top-4 left-4 z-10 max-w-sm">
      <div
        className="rounded-lg bg-gray-800/95 backdrop-blur-sm p-4 shadow-xl border border-gray-700"
        style={{ borderLeft: `4px solid ${region.color}` }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-white">{region.name}</h3>
            <p className="mt-1 text-sm text-gray-300">
              {filteredMissionaries.length}{' '}
              {filteredMissionaries.length === 1 ? 'missionary' : 'missionaries'}
            </p>
            <p className="mt-1 text-xs text-gray-400">Click a country to filter further</p>
          </div>
          <button
            onClick={handleClear}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-700 transition-colors touch-manipulation"
            aria-label="Clear selection"
          >
            <X className="h-5 w-5 text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  );
}
