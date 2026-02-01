'use client';

import Image from 'next/image';
import { RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react';
import { useMapStore } from '@/lib/store/useMapStore';
import { useMissionaryStore } from '@/lib/store/useMissionaryStore';

interface HeaderProps {
  showPanel?: boolean;
  onTogglePanel?: () => void;
}

export default function Header({ showPanel = true, onTogglePanel }: HeaderProps) {
  const { resetMap } = useMapStore();
  const { filteredMissionaries, clearFilters } = useMissionaryStore();

  const handleReset = () => {
    resetMap();
    clearFilters();
  };

  return (
    <header className="bg-gray-800 shadow-md border-b border-gray-700">
      <div className="max-w-[2000px] mx-auto px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Title */}
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 flex items-center justify-center">
              <Image
                src="/images/logo/lighthouse.png"
                alt="Lighthouse Baptist Church"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Lighthouse Baptist Church</h1>
              <p className="text-sm text-gray-400">
                {filteredMissionaries.length}{' '}
                {filteredMissionaries.length === 1 ? 'Missionary' : 'Missionaries'}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center justify-center rounded-lg bg-gray-700 p-3 text-gray-200 hover:bg-gray-600 transition-colors touch-manipulation active:scale-95"
              aria-label="Reset view"
            >
              <RotateCcw className="h-5 w-5" />
            </button>

            {onTogglePanel && (
              <button
                onClick={onTogglePanel}
                className="flex items-center gap-2 rounded-lg bg-gray-700 px-4 py-3 text-gray-200 hover:bg-gray-600 transition-colors touch-manipulation active:scale-95"
                aria-label={showPanel ? 'Hide panel' : 'Show panel'}
              >
                <span className="text-sm font-medium">
                  {showPanel ? 'Hide Panel' : 'Show Panel'}
                </span>
                {showPanel ? (
                  <ChevronRight className="h-5 w-5" />
                ) : (
                  <ChevronLeft className="h-5 w-5" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
