import { create } from 'zustand';
import { Missionary, MissionaryFilters } from '@/types';

interface MissionaryState {
  missionaries: Missionary[];
  filteredMissionaries: Missionary[];
  selectedMissionary: Missionary | null;
  filters: MissionaryFilters;
  isLoading: boolean;

  setMissionaries: (missionaries: Missionary[]) => void;
  setSelectedMissionary: (missionary: Missionary | null) => void;
  setFilters: (filters: Partial<MissionaryFilters>) => void;
  clearFilters: () => void;
  applyFilters: () => void;
}

export const useMissionaryStore = create<MissionaryState>((set, get) => ({
  missionaries: [],
  filteredMissionaries: [],
  selectedMissionary: null,
  filters: {},
  isLoading: false,

  setMissionaries: (missionaries) =>
    set({
      missionaries,
      filteredMissionaries: missionaries,
    }),

  setSelectedMissionary: (missionary) =>
    set({
      selectedMissionary: missionary,
    }),

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
    get().applyFilters();
  },

  clearFilters: () => {
    set({ filters: {}, filteredMissionaries: get().missionaries });
  },

  applyFilters: () => {
    const { missionaries, filters } = get();
    let filtered = missionaries;

    if (filters.regionId) {
      filtered = filtered.filter((m) => m.location.regionId === filters.regionId);
    }

    if (filters.country) {
      filtered = filtered.filter((m) => m.location.country === filters.country);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.fullName.toLowerCase().includes(searchLower) ||
          m.bio.toLowerCase().includes(searchLower) ||
          m.location.country.toLowerCase().includes(searchLower)
      );
    }

    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter((m) =>
        filters.tags!.some((tag) => m.metadata.tags.includes(tag))
      );
    }

    set({ filteredMissionaries: filtered });
  },
}));
