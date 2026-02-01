import { Missionary, MissionaryFilters, ApiResponse } from '@/types';
import { api } from './api';
import { mockMissionaries } from '@/data/mock';
import { config } from '@/config/env';

class MissionaryService {
  async getAll(filters?: MissionaryFilters): Promise<Missionary[]> {
    if (config.features.useMockData) {
      let filtered = mockMissionaries;

      if (filters?.regionId) {
        filtered = filtered.filter((m) => m.location.regionId === filters.regionId);
      }

      if (filters?.country) {
        filtered = filtered.filter((m) => m.location.country === filters.country);
      }

      if (filters?.search) {
        const search = filters.search.toLowerCase();
        filtered = filtered.filter(
          (m) =>
            m.fullName.toLowerCase().includes(search) || m.bio.toLowerCase().includes(search)
        );
      }

      if (filters?.tags && filters.tags.length > 0) {
        filtered = filtered.filter((m) =>
          filters.tags!.some((tag) => m.metadata.tags.includes(tag))
        );
      }

      return Promise.resolve(filtered);
    }

    const queryParams = new URLSearchParams();
    if (filters?.regionId) queryParams.set('regionId', filters.regionId);
    if (filters?.country) queryParams.set('country', filters.country);
    if (filters?.search) queryParams.set('search', filters.search);
    if (filters?.tags) queryParams.set('tags', filters.tags.join(','));

    const response = await api.get<ApiResponse<Missionary[]>>(
      `/missionaries?${queryParams.toString()}`
    );
    return response.data;
  }

  async getById(id: string): Promise<Missionary | null> {
    if (config.features.useMockData) {
      const missionary = mockMissionaries.find((m) => m.id === id);
      return Promise.resolve(missionary || null);
    }

    const response = await api.get<ApiResponse<Missionary>>(`/missionaries/${id}`);
    return response.data;
  }

  async getByRegion(regionId: string): Promise<Missionary[]> {
    return this.getAll({ regionId });
  }
}

export const missionaryService = new MissionaryService();
