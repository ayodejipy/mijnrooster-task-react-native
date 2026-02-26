import React from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '../../../lib/cn';

interface AvatarProps {
  image?: ImageSourcePropType;
  initial?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-11 h-11',
};

const textSizeClasses = {
  sm: 'text-[10px]',
  md: 'text-xs',
  lg: 'text-sm',
};

export default function Avatar({ image, initial, color, size = 'md', className }: AvatarProps) {
  return (
    <View
      className={cn(
        'items-center justify-center overflow-hidden rounded-full border-2 border-white',
        sizeClasses[size],
        className,
      )}
      style={!image && color ? { backgroundColor: color } : undefined}
    >
      {image ? (
        <Image
          source={image}
          className="h-full w-full"
          resizeMode="cover"
          onError={(error) => {
            console.error('Image load failed:', error.nativeEvent, 'URL:', image);
          }}
        />
      ) : (
        <Text className={cn('font-bold text-white', textSizeClasses[size])}>{initial}</Text>
      )}
    </View>
  );
}
