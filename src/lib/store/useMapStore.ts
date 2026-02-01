import { create } from 'zustand';
import { Region } from '@/types';

interface MapState {
  selectedRegion: Region | null;
  zoom: number;
  center: [number, number];
  isInteractive: boolean;

  setSelectedRegion: (region: Region | null) => void;
  setZoom: (zoom: number) => void;
  setCenter: (center: [number, number]) => void;
  resetMap: () => void;
  toggleInteractive: () => void;
}

export const useMapStore = create<MapState>((set) => ({
  selectedRegion: null,
  zoom: 1,
  center: [0, 20],
  isInteractive: true,

  setSelectedRegion: (region) => set({ selectedRegion: region }),
  setZoom: (zoom) => set({ zoom }),
  setCenter: (center) => set({ center }),
  resetMap: () =>
    set({
      selectedRegion: null,
      zoom: 1,
      center: [0, 20],
    }),
  toggleInteractive: () =>
    set((state) => ({
      isInteractive: !state.isInteractive,
    })),
}));
