import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

function SkeletonBox({ className }: { className: string }) {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={{ opacity }}
      className={`bg-gray-200 rounded-md ${className}`}
    />
  );
}

function ShiftSkeletonItem() {
  return (
    <View className="mb-2.5 flex-row items-start gap-4">
      {/* Time label */}
      <SkeletonBox className="mt-2 h-4 w-10" />
      {/* Card */}
      <View className="flex-1 rounded-xl border-l-2 border-gray-200 bg-gray-50 p-3">
        <SkeletonBox className="mb-2 h-4 w-2/3" />
        <View className="flex-row items-center gap-2">
          <SkeletonBox className="h-6 w-6 rounded-full" />
          <SkeletonBox className="h-3 w-1/3" />
        </View>
      </View>
    </View>
  );
}

interface Props {
  count?: number;
}

export function ShiftSkeleton({ count = 4 }: Props) {
  return (
    <View className="px-4 pt-1">
      {Array.from({ length: count }).map((_, i) => (
        <ShiftSkeletonItem key={i} />
      ))}
    </View>
  );
}
