'use client';

import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { useMapStore } from '@/lib/store/useMapStore';
import { MAP_CONFIG } from '@/config/map';

export default function MapControls() {
  const { zoom, setZoom, resetMap } = useMapStore();

  const handleZoomIn = () => {
    if (zoom < MAP_CONFIG.maxZoom) {
      setZoom(zoom + 1);
    }
  };

  const handleZoomOut = () => {
    if (zoom > MAP_CONFIG.minZoom) {
      setZoom(zoom - 1);
    }
  };

  return (
    <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-2">
      <button
        onClick={handleZoomIn}
        disabled={zoom >= MAP_CONFIG.maxZoom}
        className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/90 backdrop-blur-sm shadow-lg transition-all hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation active:scale-95"
        aria-label="Zoom in"
      >
        <ZoomIn className="h-6 w-6 text-gray-700" />
      </button>

      <button
        onClick={handleZoomOut}
        disabled={zoom <= MAP_CONFIG.minZoom}
        className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/90 backdrop-blur-sm shadow-lg transition-all hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation active:scale-95"
        aria-label="Zoom out"
      >
        <ZoomOut className="h-6 w-6 text-gray-700" />
      </button>

      <button
        onClick={resetMap}
        className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/90 backdrop-blur-sm shadow-lg transition-all hover:bg-white touch-manipulation active:scale-95"
        aria-label="Reset map"
      >
        <Maximize2 className="h-6 w-6 text-gray-700" />
      </button>
    </div>
  );
}
