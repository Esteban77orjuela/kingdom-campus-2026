import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from './src/navigation/RootNavigator';
import { lightTheme, darkTheme } from './src/theme';

export default function App() {
  const [isDark] = React.useState(false);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider theme={isDark ? darkTheme : lightTheme}>
          <NavigationContainer
            theme={{
              dark: isDark,
              colors: {
                primary: lightTheme.colors.primary,
                background: lightTheme.colors.background,
                card: lightTheme.colors.surface,
                text: lightTheme.colors.onSurface,
                border: lightTheme.colors.outline,
                notification: lightTheme.colors.error,
              },
            }}
          >
            <StatusBar style="dark" />
            <RootNavigator />
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
