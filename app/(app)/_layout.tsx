import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { withLayoutContext } from 'expo-router';
import { HugeiconsIcon } from '@hugeicons/react-native';
import {
  Home01Icon,
  BrochureIcon,
  Calendar02Icon,
  User03Icon,
} from '@hugeicons/core-free-icons';

import { TabBar } from '@/components/ui/tab-bar';

const { Navigator } = createBottomTabNavigator();
const Tabs = withLayoutContext(Navigator);

export default function AppLayout() {
  return (
    <Tabs
      initialRouteName="index"
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false, animation: 'fade' }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarAccessibilityLabel: 'Home, tab 1 of 4',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <HugeiconsIcon icon={Home01Icon} size={size} color={color} strokeWidth={1.5} accessible={false} />
          ),
        }}
      />
      <Tabs.Screen
        name="rooster/index"
        options={{
          title: 'Rooster',
          tabBarAccessibilityLabel: 'Rooster, tab 2 of 4',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <HugeiconsIcon icon={Calendar02Icon} size={size} color={color} strokeWidth={1.5} accessible={false} />
          ),
        }}
      />
      <Tabs.Screen
        name="publications/index"
        options={{
          title: 'Publications',
          tabBarAccessibilityLabel: 'Publications, tab 3 of 4',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <HugeiconsIcon icon={BrochureIcon} size={size} color={color} strokeWidth={1.5} accessible={false} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Profile',
          tabBarAccessibilityLabel: 'Profile, tab 4 of 4',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <HugeiconsIcon icon={User03Icon} size={size} color={color} strokeWidth={1.5} accessible={false} />
          ),
        }}
      />
    </Tabs>
  );
}
