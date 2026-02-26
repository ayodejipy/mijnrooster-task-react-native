import { ImageSourcePropType } from 'react-native';

export interface Day {
  day: string;
  date: number;
  hasDot: boolean;
}

export interface AvatarGroupMember {
  image?: ImageSourcePropType;
  initial: string;
  color?: string;
}

export interface TeamSlot {
  id: string;
  names: string;
  members: AvatarGroupMember[];
  timeRange: string;
}

export interface ShiftNote {
  id: string;
  author: string;
  authorImage?: ImageSourcePropType;
  authorInitial: string;
  time: string;
  text: string;
}

export interface Shift {
  id: string;
  title: string;
  time: string;
  timeRange: string;
  date: string;
  person: string;
  personImage?: ImageSourcePropType;
  status: string;
  variant: 'primary' | 'secondary' | 'tertiary';
  isCurrent?: boolean;
  description?: string;
  serviceName?: string;
  room?: string;
  team?: TeamSlot[];
  notes?: ShiftNote[];
}
