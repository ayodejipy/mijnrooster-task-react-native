import { api } from './api';
import type { Publication } from '../features/publications/types';

export const publicationsService = {
  /**
   * Fetch all publications.
   * GET /publications
   */
  getAll: (): Promise<Publication[]> => api.get<Publication[]>('/publications'),

  /**
   * Search publications by query string.
   * GET /publications?q=vaccine
   */
  search: (query: string): Promise<Publication[]> => {
    const params = new URLSearchParams({ q: query });
    return api.get<Publication[]>(`/publications?${params.toString()}`);
  },

  /**
   * Fetch a single publication by id.
   * GET /publications/:id
   */
  getById: (id: string): Promise<Publication> =>
    api.get<Publication>(`/publications/${id}`),
};
