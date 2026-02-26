import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Text } from '@/components/ui/text';
import type { Publication } from '../types';

export type { Publication };

const TAG_PALETTE = [
  { bg: 'bg-blue-100', text: 'text-blue-600' },
  { bg: 'bg-pink-100', text: 'text-pink-600' },
  { bg: 'bg-violet-100', text: 'text-violet-600' },
  { bg: 'bg-emerald-100', text: 'text-emerald-600' },
  { bg: 'bg-amber-100', text: 'text-amber-600' },
];

function tagColor(tag: string) {
  const hash = tag.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return TAG_PALETTE[hash % TAG_PALETTE.length];
}

export const PublicationCard = memo(function PublicationCard({ item }: { item: Publication }) {
  const cardLabel = [
    item.title,
    item.tags.join(', '),
    `by ${item.author}`,
    item.date,
    item.readTime,
  ].join(', ');

  return (
    <TouchableOpacity
      className="mb-4 overflow-hidden rounded-sm border border-gray-200 bg-white p-2"
      activeOpacity={0.88}
      accessibilityRole="button"
      accessibilityLabel={cardLabel}
      accessibilityHint="Opens the publication"
    >
      {/* Cover image */}
      <Image
        source={typeof item.imageBg === 'number' ? item.imageBg : { uri: item.imageBg }}
        style={{
          height: 176,
          width: '100%',
          borderRadius: 2,
          backgroundColor: item.fallbackBg ?? item.imageAccent,
        }}
        contentFit="cover"
        accessible={false}
        importantForAccessibility="no"
      />

      <View className="py-2.5" accessible={false} importantForAccessibility="no-hide-descendants">
        {/* Tags */}
        <View className="mb-2 flex-row gap-1.5">
          {item.tags.map((tag, i) => {
            const { bg, text } = tagColor(tag);
            return (
              <View key={i} className={`${bg} rounded-full px-2.5 py-1`}>
                <Text className={`text-xs font-medium ${text}`}>{tag}</Text>
              </View>
            );
          })}
        </View>

        {/* Title */}
        <Text weight='semibold' className="text-sm mb-1.5 font-semibold text-gray-950">{item.title}</Text>

        {/* Description */}
        <Text className="mb-3 text-sm leading-4.75 text-[#4E5D69]" numberOfLines={2}>
          {item.description}
        </Text>

        {/* Author meta */}
        <View className="flex-row items-center gap-2">
          <Image
            source={typeof item.authorImage === 'number' ? item.authorImage : { uri: item.authorImage }}
            style={{ width: 32, height: 32, borderRadius: 16 }}
            contentFit="cover"
            accessibilityIgnoresInvertColors
          />
          <View>
            <Text weight='semibold' className="text-sm text-gray-950">{item.author}</Text>
            <View className="mt-0.5 flex-row items-center gap-1">
              <Text className="text-xs text-gray-400">{item.date}</Text>
              <Text className="text-xs text-gray-400">•</Text>
              <Text className="text-xs text-gray-400">{item.readTime}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});
