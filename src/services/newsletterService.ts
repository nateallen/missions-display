import { Newsletter, ApiResponse } from '@/types';
import { api } from './api';
import { mockNewsletters } from '@/data/mock';
import { config } from '@/config/env';

class NewsletterService {
  async getAll(): Promise<Newsletter[]> {
    if (config.features.useMockData) {
      return Promise.resolve(mockNewsletters);
    }

    const response = await api.get<ApiResponse<Newsletter[]>>('/newsletters');
    return response.data;
  }

  async getById(id: string): Promise<Newsletter | null> {
    if (config.features.useMockData) {
      const newsletter = mockNewsletters.find((n) => n.id === id);
      return Promise.resolve(newsletter || null);
    }

    const response = await api.get<ApiResponse<Newsletter>>(`/newsletters/${id}`);
    return response.data;
  }

  async getByMissionary(missionaryId: string): Promise<Newsletter[]> {
    if (config.features.useMockData) {
      const newsletters = mockNewsletters.filter((n) => n.missionaryId === missionaryId);
      return Promise.resolve(newsletters);
    }

    const response = await api.get<ApiResponse<Newsletter[]>>(
      `/newsletters?missionaryId=${missionaryId}`
    );
    return response.data;
  }

  async getFeatured(): Promise<Newsletter[]> {
    if (config.features.useMockData) {
      const featured = mockNewsletters.filter((n) => n.featured);
      return Promise.resolve(featured);
    }

    const response = await api.get<ApiResponse<Newsletter[]>>('/newsletters?featured=true');
    return response.data;
  }
}

export const newsletterService = new NewsletterService();
