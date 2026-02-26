import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Text } from '@/components/ui/text';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { runOnJS } from 'react-native-worklets';
import { Gesture, GestureDetector, GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { HugeiconsIcon } from '@hugeicons/react-native';
import {
  ArrowLeft01Icon,
  Cancel01Icon,
  TimeQuarterIcon,
  Calendar02Icon,
  Building06Icon,
} from '@hugeicons/core-free-icons';
import type { Shift } from '../types';
import { cn } from '../../../lib/cn';
import Avatar from './Avatar';
import AvatarGroup from './AvatarGroup';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.82;
const DISMISS_THRESHOLD = MODAL_HEIGHT * 0.25;
const DISMISS_VELOCITY = 800;

interface Props {
  visible: boolean;
  shift: Shift | null;
  onClose: () => void;
}

const TEAM_COLORS = [
  { card: 'bg-secondary-50', badge: 'bg-secondary-100', text: 'text-secondary-600' },
  { card: 'bg-primary-50 border border-primary-200', badge: 'bg-primary-100', text: 'text-primary-600' },
];

export default function ShiftDetailsModal({ visible, shift, onClose }: Props) {
  'use no memo';
  const slideY = useSharedValue(MODAL_HEIGHT);
  const [localVisible, setLocalVisible] = useState(false);

  // Keep a ref to the last non-null shift so content doesn't vanish mid-animation.
  const lastShift = useRef(shift);
  if (shift) lastShift.current = shift;

   const hide = useCallback(() => setLocalVisible(false), []);
   const hideAndClose = useCallback(() => {
     setLocalVisible(false);
     onClose();
   }, [onClose]);

  useEffect(() => {
    if (visible) {
      setLocalVisible(true);
      slideY.value = withSpring(0, { damping: 40, stiffness: 200 });
    } else {
      slideY.value = withTiming(
        MODAL_HEIGHT,
        { duration: 280, easing: Easing.in(Easing.cubic) },
        (finished) => {
          'worklet';
          if (finished) runOnJS(hide)();
        },
      );
    }
  }, [visible, slideY, hide]);

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .activeOffsetY(5)
        .onUpdate((e) => {
          'worklet';
          slideY.value = Math.max(0, e.translationY);
        })
        .onEnd((e) => {
          'worklet';
          if (e.translationY > DISMISS_THRESHOLD || e.velocityY > DISMISS_VELOCITY) {
            slideY.value = withTiming(
              MODAL_HEIGHT,
              { duration: 260, easing: Easing.in(Easing.cubic) },
              (finished) => {
                'worklet';
                if (finished) runOnJS(hideAndClose)();
              },
            );
          } else {
            slideY.value = withSpring(0, { damping: 25, stiffness: 200 });
          }
        }),
    [slideY, hideAndClose],
  );

   const animatedSheetStyle = useAnimatedStyle(() => {
     'worklet';
     if (!slideY.value) return {};
     return { transform: [{ translateY: slideY.value }] };
   });

  const currentShift = shift ?? lastShift.current;
  if (!currentShift) return null;

  const noteCount = currentShift.notes?.length ?? 0;

  return (
    <Modal
      visible={localVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
      accessibilityViewIsModal
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Overlay */}
      <View className="flex-1 justify-end bg-black/35">
        <TouchableOpacity
          className="flex-1"
          activeOpacity={1}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Close"
          accessibilityHint="Close shift details"
        />

        {/* Sheet */}
        <Animated.View
          className="mx-2 mb-1 rounded-xl bg-white"
          style={[
            {
              height: MODAL_HEIGHT,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.12,
              shadowRadius: 20,
              elevation: 24,
            },
            animatedSheetStyle,
          ]}
          accessibilityLabel={`Shift details: ${currentShift.title}`}
        >
          {/* Draggable handle — gesture target */}
          <GestureDetector gesture={panGesture}>
            <View
              className="items-center py-3"
              accessible
              accessibilityRole="adjustable"
              accessibilityLabel="Swipe down to close"
            >
              <View
                className="h-2.75 w-18 rounded-full bg-gray-150"
                accessible={false}
                importantForAccessibility="no"
              />
            </View>
          </GestureDetector>

          {/* Header */}
          <View className="flex-row items-center px-4 py-3">
            <TouchableOpacity
              className="h-9 w-9 items-center justify-center rounded-md border border-gray-100 bg-white"
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Back"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={20} color="#374151" strokeWidth={1.5} accessible={false} />
            </TouchableOpacity>
            <Text className="flex-1 text-center text-lg font-semibold text-black">
              Shift Details
            </Text>
            <TouchableOpacity
              className="h-9 w-9 items-center justify-center rounded-md border border-gray-100 bg-white"
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Close"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={20} color="#374151" strokeWidth={1.5} accessible={false} />
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
            {/* Time & Date */}
            <View
              className="mb-5 flex-row items-center rounded-md bg-gray-50 p-3.5"
              accessible
              accessibilityLabel={`Time: ${currentShift.timeRange}, Date: ${currentShift.date}`}
            >
              <View className="flex-1 flex-row items-center gap-1.5" accessible={false}>
                <HugeiconsIcon icon={TimeQuarterIcon} size={16} color="#6B7280" strokeWidth={1.5} accessible={false} />
                <Text className="text-sm font-medium text-gray-700">{currentShift.timeRange}</Text>
              </View>
              <View className="mx-3 h-5 w-px bg-gray-200" accessible={false} />
              <View className="flex-1 flex-row items-center gap-1.5" accessible={false}>
                <HugeiconsIcon icon={Calendar02Icon} size={16} color="#6B7280" strokeWidth={1.5} accessible={false} />
                <Text className="text-sm font-medium text-gray-700">{currentShift.date}</Text>
              </View>
            </View>

            {/* Description */}
            {currentShift.description ? (
              <View className="mb-5">
                <Text className="mb-2 text-base font-semibold text-gray-800" accessibilityRole="header">Beschrijving</Text>
                <Text className="text-sm leading-5 text-gray-600">{currentShift.description}</Text>
              </View>
            ) : null}

            {/* Dienst & Kamers */}
            {(currentShift.serviceName || currentShift.room) ? (
              <View className="mb-5 flex-row items-center">
                {currentShift.serviceName ? (
                  <View className="flex-1">
                    <Text className="mb-2 text-base font-semibold text-gray-800" accessibilityRole="header">Dienst</Text>
                    <View className="w-full bg-secondary-100 self-start rounded-md px-2.5 py-1.5">
                      <Text className="text-secondary-700 text-sm font-medium">{currentShift.serviceName}</Text>
                    </View>
                  </View>
                ) : null}
                {currentShift.serviceName && currentShift.room ? (
                  <View className="mx-4 w-px self-stretch bg-gray-200" accessible={false} />
                ) : null}
                {currentShift.room ? (
                  <View className="flex-1">
                    <View className="mb-2 flex-row items-center gap-1">
                      <HugeiconsIcon icon={Building06Icon} size={14} color="#6B7280" strokeWidth={1} accessible={false} />
                      <Text className="text-base font-semibold text-gray-800" accessibilityRole="header">Kamers</Text>
                    </View>
                    <Text className="text-sm leading-5 text-gray-600">{currentShift.room}</Text>
                  </View>
                ) : null}
              </View>
            ) : null}

            {/* Team */}
            {currentShift.team && currentShift.team.length > 0 ? (
              <View className="mb-5">
                <Text className="mb-3.5 text-base font-semibold text-gray-800" accessibilityRole="header">Team</Text>
                <View>
                  {currentShift.team.map((slot, i) => {
                    const teamColor = TEAM_COLORS[i % TEAM_COLORS.length];
                    return (
                      <View key={slot.id}>
                        <View
                          className={cn(
                            'flex-row items-center gap-2.5 rounded-full p-3',
                            teamColor.card,
                          )}
                          accessible
                          accessibilityLabel={`${slot.names}, ${slot.timeRange}`}
                        >
                          <View accessible={false}>
                            <AvatarGroup members={slot.members} />
                          </View>
                          <Text
                            className="flex-1 text-sm font-medium text-gray-700"
                            accessible={false}
                          >
                            {slot.names}
                          </Text>
                          <View
                            className={cn('rounded-full px-2.5 py-1', teamColor.badge)}
                            accessible={false}
                          >
                            <Text
                              className={cn('text-sm font-semibold', teamColor.text)}
                              accessible={false}
                            >
                              {slot.timeRange}
                            </Text>
                          </View>
                        </View>
                        {i < currentShift.team!.length - 1 && (
                          <View
                            className="h-6 pl-7"
                            accessible={false}
                            importantForAccessibility="no"
                          >
                            {Array.from({ length: 4 }).map((_, idx) => (
                              <View
                                key={idx}
                                style={{
                                  width: 2,
                                  height: 3,
                                  backgroundColor: '#F3F4F6',
                                  marginBottom: 2,
                                }}
                              />
                            ))}
                          </View>
                        )}
                      </View>
                    );
                  })}
                </View>
              </View>
            ) : null}

            {/* Notities */}
            {currentShift.notes && currentShift.notes.length > 0 ? (
              <View className="mb-5">
                <View className="mb-3 flex-row items-center justify-between">
                  <Text className="text-base font-semibold text-gray-800" accessibilityRole="header">Notities</Text>
                  <TouchableOpacity
                    className="rounded-full bg-gray-100 px-4 py-1.5"
                    accessibilityRole="button"
                    accessibilityLabel={`View ${noteCount} notes`}
                  >
                    <Text className="text-sm font-medium text-gray-700">{noteCount} notities →</Text>
                  </TouchableOpacity>
                </View>
                <View className="gap-3.5">
                  {currentShift.notes.map((note) => (
                    <View
                      key={note.id}
                      className="flex-row items-center gap-2.5 rounded-sm border border-gray-100 bg-white p-3"
                      accessible
                      accessibilityLabel={`${note.author}, ${note.time}: ${note.text}`}
                    >
                      <View accessible={false}>
                        <Avatar
                          image={note.authorImage}
                          initial={note.authorInitial}
                          size="lg"
                          color="#818CF8"
                        />
                      </View>
                      <View className="flex-1" accessible={false}>
                        <View className="mb-0.5 flex-row justify-between">
                          <Text className="text-sm font-semibold text-gray-800">{note.author}</Text>
                          <Text className="text-xs text-gray-400">{note.time}</Text>
                        </View>
                        <Text className="text-xs leading-4.5 text-gray-950">{note.text}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ) : null}

            <View className="h-10" />
          </ScrollView>
        </Animated.View>
      </View>
      </GestureHandlerRootView>
    </Modal>
  );
}
