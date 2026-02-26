import React from 'react';
import { View, TextInput, StatusBar, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import ELIJAH_IMAGE from '../../../assets/images/elijah-px.png';
import { Text } from '@/components/ui/text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HugeiconsIcon } from '@hugeicons/react-native';
import {
  Search01Icon,
  News01Icon,
  ArrowReloadHorizontalIcon,
} from '@hugeicons/core-free-icons';
import { colors } from '@/styles/tokens';
import { PublicationCard } from './PublicationCard';
import { usePublications } from '../hooks/usePublications';
import { PublicationSkeleton } from '@/components/ui/PublicationSkeleton';
import { EmptyState } from '@/components/ui/EmptyState';

export default function PublicationsScreen() {
  const { publications, query, isLoading, error, setQuery, refresh } = usePublications();

  return (
    <SafeAreaView className="flex-1 bg-white" style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View className="flex-row items-center px-4 pt-2 pb-4">
        <View className="flex-1" accessible accessibilityRole="header">
          <Text className="text-2xl font-bold text-gray-900">Welcome back👋</Text>
          <Text className="mt-0.5 text-sm text-gray-600">Start exploring publications</Text>
        </View>
        <Image
          source={ELIJAH_IMAGE}
          style={{ width: 44, height: 44, borderRadius: 22 }}
          contentFit="cover"
          accessibilityIgnoresInvertColors
        />
      </View>

      {/* Search bar — always visible */}
      <View className="mx-4 mb-6 flex-row items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3.5 py-2.5">
        <HugeiconsIcon icon={Search01Icon} size={18} color={colors.gray[400]} strokeWidth={1.5} accessible={false} />
        <TextInput
          className="flex-1 text-base text-gray-800"
          placeholder="Search publications"
          placeholderTextColor={colors.gray[400]}
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
          clearButtonMode="while-editing"
          accessibilityLabel="Search publications"
          accessibilityHint="Type to filter publications"
        />
      </View>

      {/* Content */}
      {isLoading ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="px-4 mb-3">
            <View className="h-5 w-40 rounded-md bg-gray-200" />
          </View>
          <PublicationSkeleton count={3} />
        </ScrollView>
      ) : error ? (
        <View className="flex-1 items-center justify-center gap-4 px-8" accessibilityLiveRegion="polite">
          <Text className="text-center text-base font-semibold text-gray-700">
            Something went wrong
          </Text>
          <Text className="text-center text-sm text-gray-400">{error}</Text>
          <TouchableOpacity
            onPress={refresh}
            className="flex-row items-center gap-2 rounded-full bg-primary-500 px-5 py-2.5"
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Try again"
          >
            <HugeiconsIcon
              icon={ArrowReloadHorizontalIcon}
              size={16}
              color="#fff"
              strokeWidth={1.5}
              accessible={false}
            />
            <Text className="text-sm font-semibold text-white">Try again</Text>
          </TouchableOpacity>
        </View>
      ) : publications.length === 0 ? (
        <EmptyState
          icon={News01Icon}
          title="Geen resultaten gevonden"
          subtitle={`Geen publicaties gevonden voor "${query}".`}
        />
      ) : (
        <FlatList
          data={publications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PublicationCard item={item} />}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          removeClippedSubviews
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
          ListHeaderComponent={
            <Text weight='bold' className="mb-4 text-xl text-gray-950" accessibilityRole="header">
              Latest publications
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}
