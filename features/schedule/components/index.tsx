import React from 'react';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Text } from '@/components/ui/text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { MoreVerticalIcon, ArrowDown01Icon, Calendar02Icon } from '@hugeicons/core-free-icons';
import { colors } from '../../../styles/tokens';
import { DateSelector } from './DateSelector';
import { ShiftCard } from './ShiftCard';
import ShiftDetailsModal from './ShiftDetailsModal';
import { useShifts } from '../hooks/useShifts';
import { ShiftSkeleton } from '../../../components/ui/ShiftSkeleton';
import { EmptyState } from '../../../components/ui/EmptyState';

export default function RoosterScreen() {
  const {
    days,
    shifts,
    isLoading,
    error,
    selectedDayIndex,
    activeShift,
    selectedRoom,
    setSelectedDayIndex,
    setActiveShift,
  } = useShifts();

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top bar */}
      <View className="h-14 flex-row items-center justify-between px-4">
        <Text className="text-2xl font-bold text-gray-950 text-shadow-secondary-900" accessibilityRole="header">Mijn rooster</Text>
        <TouchableOpacity
          className="h-9 w-9 items-center justify-center rounded-sm border border-gray-200 bg-white"
          accessibilityRole="button"
          accessibilityLabel="More options"
        >
          <HugeiconsIcon icon={MoreVerticalIcon} size={20} color={colors.gray[700]} strokeWidth={1.5} accessible={false} />
        </TouchableOpacity>
      </View>

      {/* Date selector */}
      <DateSelector days={days} selectedIndex={selectedDayIndex} onSelect={setSelectedDayIndex} />

      {/* Room selector */}
      <TouchableOpacity
        className="flex-row items-center border-b-2 border-t-2 border-gray-100 bg-white px-3.5 py-2.5 mb-3"
        accessibilityRole="button"
        accessibilityLabel={`Selected room: ${selectedRoom}`}
        accessibilityHint="Tap to select a different room"
      >
        <Text className="flex-1 text-base font-medium text-gray-700">{selectedRoom}</Text>
        <View className="h-7 w-7 items-center justify-center rounded-sm border border-gray-200 bg-white" accessible={false}>
          <HugeiconsIcon icon={ArrowDown01Icon} size={16} color={colors.gray[600]} strokeWidth={1.5} accessible={false} />
        </View>
      </TouchableOpacity>

      {/* Timeline */}
      {isLoading ? (
        <ShiftSkeleton count={5} />
      ) : error ? (
        <EmptyState
          title="Kon diensten niet laden"
          subtitle={error}
        />
      ) : shifts.length === 0 ? (
        <EmptyState
          icon={Calendar02Icon}
          title="Geen diensten vandaag"
          subtitle="Er zijn geen ingeplande diensten voor deze dag."
        />
      ) : (
        <FlatList
          data={shifts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ShiftCard
              shift={item}
              isCurrent={item.isCurrent === true}
              onPress={() => setActiveShift(item)}
            />
          )}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 4, paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
          decelerationRate="normal"
          accessibilityLabel="Shift overview"
        />
      )}

      {/* Bottom sheet modal */}
      <ShiftDetailsModal
        visible={activeShift !== null}
        shift={activeShift}
        onClose={() => setActiveShift(null)}
      />
    </SafeAreaView>
  );
}
