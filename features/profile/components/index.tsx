import React from 'react';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import { Text } from '@/components/ui/text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HugeiconsIcon } from '@hugeicons/react-native';
import {
  User02Icon,
  UserCircleIcon,
  Notification01Icon,
  Settings01Icon,
  HelpCircleIcon,
  Logout01Icon,
  ArrowRight01Icon,
} from '@hugeicons/core-free-icons';
import { colors } from '../../../styles/tokens';
import { useUserStore } from '@/store/useUserStore';
import Avatar from '@/components/ui/Avatar';

type IconData = typeof User02Icon;

const MENU_ITEMS: { label: string; icon: IconData; danger?: boolean }[] = [
  { label: 'Mijn account', icon: UserCircleIcon },
  { label: 'Notificaties', icon: Notification01Icon },
  { label: 'Instellingen', icon: Settings01Icon },
  { label: 'Hulp & ondersteuning', icon: HelpCircleIcon },
  { label: 'Uitloggen', icon: Logout01Icon, danger: true },
];

const STATS = [
  { label: 'Diensten', value: '24' },
  { label: 'Uren', value: '192' },
  { label: 'Notities', value: '8' },
];

export default function ProfileScreen() {
  const { user } = useUserStore();

  return (
    <SafeAreaView className="flex-1 bg-white" style={{ backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top bar */}
      <View className="h-14 justify-center px-4">
        <Text className="text-xl font-bold text-gray-900" accessibilityRole="header">Profile</Text>
      </View>

      {/* Avatar + info */}
      <View
        className="items-center border-b border-gray-100 pt-4 pb-6"
        accessible
        accessibilityLabel={`${user.name}, ${user.role}, ${user.status === 'available' ? 'Beschikbaar' : 'Niet beschikbaar'}`}
      >
        <Avatar
          image={user.image}
          initial={user.initial}
          className="mb-3 h-22 w-22 border-4 border-primary-200"
        />
        <Text className="mb-1 text-lg font-bold text-gray-900" accessible={false}>{user.name}</Text>
        <Text className="mb-2.5 text-sm text-gray-500" accessible={false}>{user.role}</Text>
        <View
          className="rounded-full px-3 py-1"
          style={{ backgroundColor: colors.accent.success + '20' }}
          accessible={false}
        >
          <Text className="text-xs font-semibold" style={{ color: colors.accent.success }} accessible={false}>
            Beschikbaar
          </Text>
        </View>
      </View>

      {/* Quick stats */}
      <View className="mx-4 my-4 flex-row overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
        {STATS.map((stat, i) => (
          <View
            key={i}
            className={`flex-1 items-center py-3.5 ${i < STATS.length - 1 ? 'border-r border-gray-200' : ''}`}
            accessible
            accessibilityLabel={`${stat.value} ${stat.label}`}
          >
            <Text className="text-primary-600 text-lg font-bold" accessible={false}>{stat.value}</Text>
            <Text className="mt-0.5 text-xs text-gray-500" accessible={false}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Menu */}
      <View className="gap-1 px-4">
        {MENU_ITEMS.map((item, i) => (
          <TouchableOpacity
            key={i}
            className="flex-row items-center gap-3 border-b border-gray-100 py-3"
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={item.label}
            accessibilityHint={item.danger ? 'Logs you out of the app' : `Opens ${item.label}`}
          >
            <View
              className="h-9 w-9 items-center justify-center rounded-lg"
              style={{
                backgroundColor: item.danger ? colors.accent.danger + '18' : colors.primary[50],
              }}
              accessible={false}
            >
              <HugeiconsIcon
                icon={item.icon}
                size={20}
                color={item.danger ? colors.accent.danger : colors.primary[500]}
                strokeWidth={1.5}
                accessible={false}
              />
            </View>
            <Text
              className="flex-1 text-base font-medium text-gray-700"
              style={item.danger ? { color: colors.accent.danger } : undefined}
              accessible={false}
            >
              {item.label}
            </Text>
            {!item.danger && (
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={16}
                color={colors.gray[400]}
                strokeWidth={1.5}
                accessible={false}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
