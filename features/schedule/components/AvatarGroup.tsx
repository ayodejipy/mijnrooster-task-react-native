import React from 'react';
import { ImageSourcePropType, View } from 'react-native';
import Avatar from '@/components/ui/Avatar';

export interface AvatarGroupMember {
  image?: ImageSourcePropType;
  initial: string;
  color?: string;
}

interface AvatarGroupProps {
  members: AvatarGroupMember[];
  size?: 'sm' | 'md' | 'lg';
}

export default function AvatarGroup({ members, size = 'md' }: AvatarGroupProps) {
  return (
    <View className="flex-row items-center">
      {members.map((member, i) => (
        <Avatar
          key={i}
          image={member.image}
          initial={member.initial}
          color={member.color}
          size={size}
          className={i > 0 ? '-ml-2.5' : undefined}
        />
      ))}
    </View>
  );
}
