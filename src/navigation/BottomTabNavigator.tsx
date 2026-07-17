import React from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { ConferenciasScreen } from '../screens/ConferenciasScreen';
import { CatedrasScreen } from '../screens/CatedrasScreen';
import { EquipoScreen } from '../screens/EquipoScreen';
import { MoreScreen } from '../screens/MoreScreen';

const Tab = createBottomTabNavigator();

type TabIconName = React.ComponentProps<typeof Ionicons>['name'];

const TAB_ICONS: Record<string, { focused: TabIconName; unfocused: TabIconName }> = {
  Home: { focused: 'home', unfocused: 'home-outline' },
  ConferenciasTab: { focused: 'mic', unfocused: 'mic-outline' },
  CatedrasTab: { focused: 'school', unfocused: 'school-outline' },
  EquipoTab: { focused: 'people-circle', unfocused: 'people-circle-outline' },
  More: { focused: 'ellipsis-horizontal-circle', unfocused: 'ellipsis-horizontal-circle-outline' },
};

export function BottomTabNavigator() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const icons = TAB_ICONS[route.name];
          const iconName = focused ? icons.focused : icons.unfocused;
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outlineVariant,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 65,
          paddingTop: 6,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          elevation: 8,
          shadowColor: theme.colors.shadow,
          shadowOpacity: 0.1,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -4 },
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'Inicio' }}
      />
      <Tab.Screen
        name="ConferenciasTab"
        component={ConferenciasScreen}
        options={{ tabBarLabel: 'Conferencias' }}
      />
      <Tab.Screen
        name="CatedrasTab"
        component={CatedrasScreen}
        options={{ tabBarLabel: 'Cátedras' }}
      />
      <Tab.Screen
        name="EquipoTab"
        component={EquipoScreen}
        options={{ tabBarLabel: 'Equipo' }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{ tabBarLabel: 'Más' }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
});
