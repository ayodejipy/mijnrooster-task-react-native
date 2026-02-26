import { create } from 'zustand';
import { ImageSourcePropType } from 'react-native';

export type UserStatus = 'available' | 'unavailable';

interface User {
  name: string;
  role: string;
  initial: string;
  image: ImageSourcePropType;
  status: UserStatus;
}

interface UserState {
  user: User;
  setStatus: (status: UserStatus) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: {
    name: 'Omar Rahman',
    role: 'Medisch Medewerker',
    initial: 'O',
    image: require('../assets/images/omar-px.png'),
    status: 'available',
  },
  setStatus: (status) => set((state) => ({ user: { ...state.user, status } })),
}));
