import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { colors } from '../../../styles/tokens';
import { Shift } from '../types';
import Avatar from './Avatar';

interface Props {
  shift: Shift;
  isCurrent: boolean;
  onPress: () => void;
}

const SHIFT_COLORS = {
  primary:   { bg: colors.primary[50],   accent: colors.primary[500],   time: colors.primary[600],   avatarBg: colors.primary[300] },
  secondary: { bg: colors.secondary[50], accent: colors.secondary[500], time: colors.secondary[600], avatarBg: colors.secondary[300] },
  tertiary:  { bg: '#E0F9FF',            accent: '#0EA5E9',             time: '#0284C7',             avatarBg: '#7DD3FC' },
} as const;

export const ShiftCard = memo(function ShiftCard({ shift, isCurrent, onPress }: Props) {
  const cardColor = SHIFT_COLORS[shift.variant] ?? SHIFT_COLORS.primary;

  const accessibilityLabel = [
    isCurrent ? 'Current shift' : null,
    shift.title,
    shift.timeRange,
    shift.person,
    shift.status,
  ].filter(Boolean).join(', ');

  return (
    <View style={{ marginBottom: 10 }}>
      {/* Current-time "now" indicator */}
      {isCurrent && (
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}
          accessible={false}
          importantForAccessibility="no"
        >
          <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary[500] }} />
          <View style={{ flex: 1, height: 2, backgroundColor: colors.primary[500] }} />
        </View>
      )}

      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 16 }}>
        {/* Time label — hidden from accessibility since it's included in the card label */}
        <Text
          style={{
            width: 48,
            paddingTop: 8,
            paddingRight: 6,
            fontSize: 14,
            fontWeight: '500',
            textAlign: 'right',
            color: colors.gray[400],
          }}
          accessible={false}
        >
          {shift.time}
        </Text>

        {/* Card */}
        <TouchableOpacity
          style={{
            flex: 1,
            borderRadius: 12,
            padding: 12,
            backgroundColor: cardColor.bg,
            borderLeftWidth: 2,
            borderLeftColor: cardColor.accent,
          }}
          onPress={onPress}
          activeOpacity={0.82}
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel}
          accessibilityHint="Shows details of this shift"
        >
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: colors.gray[800], marginBottom: 6 }}>
                {shift.title}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <View accessible={false}>
                  <Avatar
                    image={shift.personImage}
                    initial={shift.person.charAt(0).toUpperCase()}
                    color={cardColor.avatarBg}
                    size="sm"
                  />
                </View>
                <Text style={{ fontSize: 12, color: colors.gray[500] }}>
                  {shift.person} {shift.status}
                </Text>
              </View>
            </View>
            <Text style={{ fontSize: 13, fontWeight: '600', marginLeft: 8, paddingTop: 2, color: cardColor.time }}>
              {shift.timeRange}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
});
