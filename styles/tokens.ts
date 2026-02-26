// Design tokens for Mijn Rooster — two-palette system (Primary indigo + Secondary orange)

export const colors = {
  primary: {
    50:  '#EEF2FF',
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#5653FC',
    600: '#4F46E5',
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
  },
  secondary: {
    50:  '#FFF7ED',
    100: '#FFEDD5',
    200: '#FED7AA',
    300: '#FDBA74',
    400: '#FB923C',
    500: '#F97316',
    600: '#EA580C',
    700: '#C2410C',
    800: '#9A3412',
    900: '#7C2D12',
  },
  gray: {
    0:   '#FFFFFF',
    50:  '#F9FAFB',
    100: '#F3F4F6',
    150: '#E9EAEB',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#535862',
    500: '#6B7280',
    600: '#4B5563',
    700: '#242424',
    800: '#1F2937',
    900: '#111827',
  },
  accent: {
    success: '#22C55E',
    danger:  '#EF4444',
    info:    '#0EA5E9',
    avatarRing: '#E5E7EB',
  },
  bg: {
    app:     '#FFFFFF',
    subtle:  '#F9FAFB',
    overlay: 'rgba(0,0,0,0.35)',
  },
} as const;

/** Border-radius scale */
export const rounded = {
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
} as const;

/** Font sizes */
export const fs = {
  xs: 12,
  sm: 13,
  base: 15,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
} as const;

/** Font weights (typed for StyleSheet) */
export const fw = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

/** Font families — load via useFonts in root _layout.tsx before use */
export const fonts = {
  regular: 'Manrope_400Regular',
  medium: 'Manrope_500Medium',
  semibold: 'Manrope_600SemiBold',
  bold: 'Manrope_700Bold',
} as const;
