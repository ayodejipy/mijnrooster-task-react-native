import React from 'react';
import { View, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Text } from '@/components/ui/text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HugeiconsIcon } from '@hugeicons/react-native';
import {
  User02Icon,
  Calendar01Icon,
  News01Icon,
} from '@hugeicons/core-free-icons';
import { useRouter } from 'expo-router';
import { colors } from '../../../styles/tokens';
import { formatDutchDate } from '../../../lib/date';

type IconData = typeof User02Icon;

const QUICK_ACTIONS: {
  label: string;
  icon: IconData;
  route: '/rooster' | '/publications' | '/profile';
  color: string;
  bg: string;
  hint: string;
}[] = [
  { label: 'Mijn Rooster', icon: Calendar01Icon, route: '/rooster', color: colors.primary[500], bg: colors.primary[50], hint: 'Opens the schedule screen' },
  { label: 'Publications', icon: News01Icon, route: '/publications', color: colors.secondary[600], bg: colors.secondary[50], hint: 'Opens publications' },
  { label: 'Mijn Profiel', icon: User02Icon, route: '/profile', color: colors.gray[600], bg: colors.gray[100], hint: 'Opens your profile screen' },
];

const UPCOMING = [
  { time: '08:30', title: 'OchtenddienstShift', room: 'Room 1', variant: 'primary' as const },
  { time: '12:00', title: 'OchtenddienstShift', room: 'Room 2', variant: 'secondary' as const },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white" style={{ backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pt-3 pb-5">
          <View accessible accessibilityRole="header">
            <Text className="text-sm text-gray-500">Goedemorgen,</Text>
            <Text className="text-xl font-bold text-gray-900">Omar Rahman</Text>
          </View>
          <TouchableOpacity
            className="border-primary-200 bg-primary-100 h-12 w-12 items-center justify-center rounded-full border-2"
            onPress={() => router.push('/profile')}
            accessibilityRole="button"
            accessibilityLabel="Go to profile"
            accessibilityHint="Opens your profile screen"
          >
            <HugeiconsIcon
              icon={User02Icon}
              size={22}
              color={colors.primary[500]}
              strokeWidth={1.5}
              accessible={false}
            />
          </TouchableOpacity>
        </View>

        {/* Today card */}
        <View
          className="bg-primary-500 mx-4 mb-6 flex-row items-center rounded-lg p-4"
          accessible
          accessibilityLabel={`Today, ${formatDutchDate()}`}
        >
          <View className="flex-1">
            <Text className="mb-1 text-sm text-white/75" accessible={false}>Vandaag</Text>
            <Text className="text-md font-semibold text-white" accessible={false}>{formatDutchDate()}</Text>
          </View>
          <HugeiconsIcon
            icon={Calendar01Icon}
            size={32}
            color="rgba(255,255,255,0.8)"
            strokeWidth={1.5}
            accessible={false}
          />
        </View>

        {/* Quick actions */}
        <View className="mb-3 px-4">
          <Text className="text-md font-semibold text-gray-900" accessibilityRole="header">Quick actions</Text>
        </View>
        <View className="mb-6 flex-row gap-2.5 px-4">
          {QUICK_ACTIONS.map((action, i) => (
            <TouchableOpacity
              key={i}
              className="flex-1 items-center gap-2 rounded-md p-3.5"
              style={{ backgroundColor: action.bg }}
              onPress={() => router.push(action.route)}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel={action.label}
              accessibilityHint={action.hint}
            >
              <View
                className="h-11 w-11 items-center justify-center rounded-md"
                style={{ backgroundColor: action.color + '22' }}
                accessible={false}
              >
                <HugeiconsIcon
                  icon={action.icon}
                  size={24}
                  color={action.color}
                  strokeWidth={1.5}
                  accessible={false}
                />
              </View>
              <Text className="text-center text-xs font-semibold" style={{ color: action.color }} accessible={false}>
                {action.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Upcoming shifts */}
        <View className="mb-3 flex-row items-center justify-between px-4">
          <Text className="text-md font-semibold text-gray-900" accessibilityRole="header">Upcoming shifts</Text>
          <TouchableOpacity
            onPress={() => router.push('/rooster')}
            accessibilityRole="button"
            accessibilityLabel="View all shifts"
            accessibilityHint="Opens the schedule screen with all shifts"
          >
            <Text className="text-primary-600 text-sm font-medium">Alles zien →</Text>
          </TouchableOpacity>
        </View>

        <View className="gap-2.5 px-4">
          {UPCOMING.map((shift, i) => {
            const isPrimary = shift.variant === 'primary';
            return (
              <TouchableOpacity
                key={i}
                className={`flex-row items-center gap-3 rounded-md border p-3.5 ${
                  isPrimary
                    ? 'border-primary-100 bg-primary-50'
                    : 'border-secondary-100 bg-secondary-50'
                }`}
                activeOpacity={0.85}
                onPress={() => router.push('/rooster')}
                accessibilityRole="button"
                accessibilityLabel={`${shift.title}, ${shift.room}, ${shift.time}`}
                accessibilityHint="Opens the schedule screen for more details"
              >
                <View
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: isPrimary ? colors.primary[500] : colors.secondary[500],
                  }}
                  accessible={false}
                />
                <View className="flex-1" accessible={false}>
                  <Text className="text-base font-medium text-gray-800">{shift.title}</Text>
                  <Text className="mt-0.5 text-xs text-gray-500">{shift.room}</Text>
                </View>
                <Text
                  className="text-sm font-semibold"
                  style={{ color: isPrimary ? colors.primary[600] : colors.secondary[600] }}
                  accessible={false}
                >
                  {shift.time}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
