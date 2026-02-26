import { api } from './api';
import type { Shift, Day } from '../features/schedule/types';

export const scheduleService = {
  /**
   * Fetch the week view (days with dot indicators).
   * GET /schedule/days?weekStart=YYYY-MM-DD
   */
  getDays: (weekStart?: string): Promise<Day[]> => {
    const query = weekStart ? `?weekStart=${weekStart}` : '';
    return api.get<Day[]>(`/schedule/days${query}`);
  },

  /**
   * Fetch shifts for a given date and room.
   * GET /schedule/shifts?date=DD-MM-YYYY&room=Room1
   */
  getShifts: (date: string, room?: string): Promise<Shift[]> => {
    const params = new URLSearchParams({ date });
    if (room) params.set('room', room);
    return api.get<Shift[]>(`/schedule/shifts?${params.toString()}`);
  },

  /**
   * Fetch full details for a single shift.
   * GET /schedule/shifts/:id
   */
  getShiftById: (id: string): Promise<Shift> =>
    api.get<Shift>(`/schedule/shifts/${id}`),
};
