import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigator } from './BottomTabNavigator';
import { RecomendacionesScreen } from '../screens/RecomendacionesScreen';
import { UbicacionScreen } from '../screens/UbicacionScreen';
import { palette } from '../theme';

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: palette.backgroundLight },
      }}
    >
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen
        name="Recomendaciones"
        component={RecomendacionesScreen}
        options={{
          animation: 'slide_from_bottom',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="Ubicacion"
        component={UbicacionScreen}
        options={{
          animation: 'slide_from_bottom',
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
}
