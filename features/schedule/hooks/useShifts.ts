import { useScheduleStore } from '../../../store/useScheduleStore';
import type { Shift, Day } from '../types';

interface UseShiftsReturn {
  days: Day[];
  shifts: Shift[];
  isLoading: boolean;
  error: string | null;
  selectedDayIndex: number;
  selectedDay: Day | undefined;
  activeShift: Shift | null;
  selectedRoom: string;
  setSelectedDayIndex: (index: number) => void;
  setActiveShift: (shift: Shift | null) => void;
  setSelectedRoom: (room: string) => void;
}

export function useShifts(): UseShiftsReturn {
  const {
    days,
    shifts,
    isLoading,
    error,
    selectedDayIndex,
    activeShift,
    selectedRoom,
    setSelectedDayIndex,
    setActiveShift,
    setSelectedRoom,
  } = useScheduleStore();

  const selectedDay = days[selectedDayIndex];

  // When connected to a real API, shifts would be filtered by selectedDay here.
  // For now the store already holds the day's data.
  const shiftsForDay = shifts;

  return {
    days,
    shifts: shiftsForDay,
    isLoading,
    error,
    selectedDayIndex,
    selectedDay,
    activeShift,
    selectedRoom,
    setSelectedDayIndex,
    setActiveShift,
    setSelectedRoom,
  };
}
