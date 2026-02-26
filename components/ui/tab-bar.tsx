import { useEffect } from 'react';
import { View, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  Easing,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { CommonActions } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import { colors, fonts } from '@/styles/tokens';

const TIMING = { duration: 150, easing: Easing.out(Easing.quad) };

type Route = BottomTabBarProps['state']['routes'][number];
type Descriptor = BottomTabBarProps['descriptors'][string];

function TabItem({
  route,
  descriptor,
  isActive,
  onPress,
  onPressIn,
  onLongPress,
}: {
  route: Route;
  descriptor: Descriptor;
  isActive: boolean;
  onPress: () => void;
  onPressIn: () => void;
  onLongPress: () => void;
}) {
  const { options } = descriptor;
  const label = options.title ?? route.name;

  // Single shared value drives all three animated properties.
  const progress = useSharedValue(isActive ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(isActive ? 1 : 0, TIMING);
  }, [isActive, progress]);

  const indicatorStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  const iconContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 0.9 + progress.value * 0.1 }],
  }));

  const labelStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [0, 1],
      [colors.gray[400], colors.primary[500]],
    ),
  }));

  // Icon still receives a static color (HugeiconsIcon doesn't accept animated props).
  const iconColor = isActive ? colors.primary[500] : colors.gray[400];

  return (
    <Pressable
      onPressIn={onPressIn}
      onPress={onPress}
      onLongPress={onLongPress}
      accessible
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
      style={{ width: 76, alignItems: 'center', paddingTop: 8 }}
    >
      {/* Active indicator line — always rendered, animated in/out */}
      <Animated.View
        accessible={false}
        importantForAccessibility="no"
        style={[
          {
            position: 'absolute',
            top: 0,
            alignSelf: 'center',
            width: 64,
            height: 3,
            borderBottomLeftRadius: 2,
            borderBottomRightRadius: 2,
            marginTop: -6,
            backgroundColor: colors.primary[500],
          },
          indicatorStyle,
        ]}
      />

      {/* Icon with subtle scale */}
      <Animated.View style={iconContainerStyle} accessible={false}>
        {options.tabBarIcon?.({ focused: isActive, color: iconColor, size: 24 })}
      </Animated.View>

      {/* Label with animated color */}
      <Animated.Text
        style={[
          {
            fontSize: 12,
            fontWeight: '500',
            fontFamily: fonts.medium,
            marginTop: 4,
          },
          labelStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
}

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 10,
        backgroundColor: '#FFFFFF',
        paddingTop: 6,
        paddingBottom: insets.bottom + 10,
        paddingHorizontal: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 22,
      }}
    >
      {state.routes.map((route) => {
        const descriptor = descriptors[route.key];
        const { options } = descriptor;

        if ((options.tabBarItemStyle as { display?: string } | undefined)?.display === 'none') {
          return null;
        }

        const isActive = state.routes[state.index]?.key === route.key;

        return (
          <TabItem
            key={route.key}
            route={route}
            descriptor={descriptor}
            isActive={isActive}
            onPressIn={() => {
              if (process.env.EXPO_OS === 'ios') {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }
            }}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!isActive && !event.defaultPrevented) {
                navigation.dispatch({
                  ...CommonActions.navigate(route.name),
                  target: state.key,
                });
              }
            }}
            onLongPress={() => {
              navigation.emit({ type: 'tabLongPress', target: route.key });
            }}
          />
        );
      })}
    </View>
  );
}
