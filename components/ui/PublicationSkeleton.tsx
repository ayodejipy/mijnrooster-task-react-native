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

  return <Animated.View style={{ opacity }} className={`bg-gray-200 rounded-md ${className}`} />;
}

function PublicationSkeletonItem() {
  return (
    <View className="rounded-lg bg-white mb-4 shadow overflow-hidden">
      {/* Cover image area */}
      <SkeletonBox className="h-44 w-full rounded-none" />

      <View className="p-3.5">
        {/* Tags */}
        <View className="flex-row gap-1.5 mb-2">
          <SkeletonBox className="h-5 w-14 rounded-full" />
          <SkeletonBox className="h-5 w-16 rounded-full" />
        </View>

        {/* Title */}
        <SkeletonBox className="h-4 w-3/4 mb-3" />

        {/* Description lines */}
        <SkeletonBox className="h-3 w-full mb-1.5" />
        <SkeletonBox className="h-3 w-2/3 mb-3" />

        {/* Author row */}
        <View className="flex-row items-center gap-1.5">
          <SkeletonBox className="w-7 h-7 rounded-full" />
          <SkeletonBox className="h-3 w-24" />
          <SkeletonBox className="h-3 w-16" />
        </View>
      </View>
    </View>
  );
}

interface Props {
  count?: number;
}

export function PublicationSkeleton({ count = 3 }: Props) {
  return (
    <View className="px-4 pt-1">
      {Array.from({ length: count }).map((_, i) => (
        <PublicationSkeletonItem key={i} />
      ))}
    </View>
  );
}
