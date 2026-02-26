import { Text as RNText, TextProps } from 'react-native';
import { cn } from '@/lib/cn';

const FONT_MAP = {
  regular: 'Manrope_400Regular',
  medium: 'Manrope_500Medium',
  semibold: 'Manrope_600SemiBold',
  bold: 'Manrope_700Bold',
} as const;

type Weight = keyof typeof FONT_MAP;

interface Props extends TextProps {
  weight?: Weight;
}

export function Text({ className, weight = 'regular', style, ...props }: Props) {
  return (
    <RNText
      className={cn(className)}
      style={[{ fontFamily: FONT_MAP[weight] }, style]}
      {...props}
    />
  );
}
