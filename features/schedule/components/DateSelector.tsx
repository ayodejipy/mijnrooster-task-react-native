import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from '@/components/ui/text';
import { colors } from '../../../styles/tokens';
import type { Day } from '../types';

function DayItem({
  day,
  date,
  hasDot,
  isSelected,
  onPress,
}: {
  day: string;
  date: number;
  hasDot: boolean;
  isSelected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[s.item, isSelected && s.itemActive]}
      accessibilityRole="button"
      accessibilityLabel={`${day} ${date}${hasDot ? ', has shifts' : ''}`}
      accessibilityState={{ selected: isSelected }}
      accessibilityHint="Shows shifts for this day"
    >
      <View style={[s.circle, isSelected && s.circleActive]} accessible={false}>
        <Text style={[s.dateText, isSelected && s.dateTextActive]}>{date}</Text>
      </View>
      <Text style={[s.dayText, isSelected && s.dayTextActive]}>{day}</Text>
      <View style={[s.dot, hasDot ? (isSelected ? s.dotSelected : s.dotVisible) : s.dotHidden]} accessible={false} />
    </TouchableOpacity>
  );
}

interface Props {
  days: Day[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export function DateSelector({ days, selectedIndex, onSelect }: Props) {
  return (
    <View style={s.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.scrollContent}
        accessibilityRole="scrollbar"
      >
        {days.map((d, i) => (
          <DayItem
            key={i}
            day={d.day}
            date={d.date}
            hasDot={d.hasDot}
            isSelected={i === selectedIndex}
            onPress={() => onSelect(i)}
          />
        ))}
      </ScrollView>
      <View
        style={[s.fade, s.fadeLeft]}
        pointerEvents="none"
        accessible={false}
        importantForAccessibility="no"
      >
          <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.3)' }} />
      </View>
      <View
        style={[s.fade, s.fadeRight]}
        pointerEvents="none"
        accessible={false}
        importantForAccessibility="no"
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.3)' }} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 16,
  },
  item: {
    width: 42,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 999,
  },
  itemActive: {
    backgroundColor: colors.gray[100],
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  circleActive: {
    backgroundColor: colors.primary[500],
    borderRadius: 999,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray[700],
  },
  dateTextActive: {
    fontWeight: '700',
    color: '#FFFFFF',
  },
  dayText: {
    fontSize: 11,
    color: colors.gray[400],
  },
  dayTextActive: {
    color: colors.primary[600],
    fontWeight: '600',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 999,
    marginTop: 4,
  },
  dotVisible: {
    backgroundColor: colors.primary[300],
  },
  dotSelected: {
    backgroundColor: colors.primary[500],
  },
  dotHidden: {
    backgroundColor: 'transparent',
  },
  fade: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 50,
    flexDirection: 'row',
  },
  fadeLeft: {
    left: 0,
  },
  fadeRight: {
    right: 0,
  },
});
