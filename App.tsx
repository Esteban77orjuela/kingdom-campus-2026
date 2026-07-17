import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { RootNavigator } from './src/navigation/RootNavigator';
import { ThemeProvider, useThemeMode } from './src/context/ThemeContext';
import { lightTheme, darkTheme } from './src/theme';

function AppContent() {
  const { isDark, toggle } = useThemeMode();
  const theme = isDark ? darkTheme : lightTheme;
  const insets = useSafeAreaInsets();

  return (
    <>
      <PaperProvider theme={theme}>
        <NavigationContainer
          theme={{
            dark: isDark,
            colors: {
              primary: theme.colors.primary,
              background: theme.colors.background,
              card: theme.colors.surface,
              text: theme.colors.onSurface,
              border: theme.colors.outline,
              notification: theme.colors.error,
            },
          }}
        >
          <StatusBar style={isDark ? 'light' : 'dark'} />
          <RootNavigator />
        </NavigationContainer>
      </PaperProvider>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={toggle}
        style={[
          styles.toggle,
          {
            top: insets.top + 8,
            backgroundColor: isDark ? '#2A2A2A' : '#FFFFFF',
            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
          },
        ]}
      >
        <Ionicons
          name={isDark ? 'sunny-outline' : 'moon-outline'}
          size={20}
          color={isDark ? '#E0E0E0' : '#424242'}
        />
      </TouchableOpacity>
    </>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  toggle: {
    position: 'absolute',
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 1,
  },
});
