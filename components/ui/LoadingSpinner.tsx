import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { colors } from '@/styles/tokens';

interface Props {
  message?: string;
}

export function LoadingSpinner({ message }: Props) {
  return (
    <View className="flex-1 items-center justify-center gap-3 py-16">
      <ActivityIndicator size="large" color={colors.primary[500]} />
      {message ? <Text className="text-sm text-gray-400">{message}</Text> : null}
    </View>
  );
}
