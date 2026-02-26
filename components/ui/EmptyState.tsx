import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { HugeiconsIcon } from '@hugeicons/react-native';
import type { HugeiconsIconData } from '@hugeicons/core-free-icons';
import { Calendar02Icon } from '@hugeicons/core-free-icons';
import { colors } from '@/styles/tokens';

interface Props {
  icon?: HugeiconsIconData;
  title: string;
  subtitle?: string;
}

export function EmptyState({ icon = Calendar02Icon, title, subtitle }: Props) {
  return (
    <View className="flex-1 items-center justify-center gap-3 py-16 px-8">
      <View className="mb-1 h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        <HugeiconsIcon icon={icon} size={28} color={colors.gray[400]} strokeWidth={1.5} />
      </View>
      <Text className="text-center text-base font-semibold text-gray-700">{title}</Text>
      {subtitle ? (
        <Text className="text-center text-sm leading-5 text-gray-400">{subtitle}</Text>
      ) : null}
    </View>
  );
}
