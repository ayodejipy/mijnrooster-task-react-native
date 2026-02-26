import { create } from 'zustand';
import type { Shift, Day } from '../features/schedule/types';
import { SEED_DAYS, SEED_SHIFTS } from '../lib/data/scheduleSeed';


interface ScheduleState {
  days: Day[];
  shifts: Shift[];
  isLoading: boolean;
  error: string | null;
  selectedDayIndex: number;
  activeShift: Shift | null;
  selectedRoom: string;

  setSelectedDayIndex: (index: number) => void;
  setActiveShift: (shift: Shift | null) => void;
  setSelectedRoom: (room: string) => void;
  setShifts: (shifts: Shift[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useScheduleStore = create<ScheduleState>((set) => ({
  days: SEED_DAYS,
  shifts: SEED_SHIFTS,
  isLoading: false,
  error: null,
  selectedDayIndex: 2,
  activeShift: null,
  selectedRoom: 'Room1',

  setSelectedDayIndex: (index) => set({ selectedDayIndex: index }),
  setActiveShift: (shift) => set({ activeShift: shift }),
  setSelectedRoom: (room) => set({ selectedRoom: room }),
  setShifts: (shifts) => set({ shifts }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
