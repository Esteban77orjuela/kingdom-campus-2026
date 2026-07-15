import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevation?: number;
  color?: string;
}

export function GlassCard({ children, style, elevation = 2, color }: GlassCardProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: color || theme.colors.surface,
          shadowColor: color || theme.colors.shadow,
          elevation: elevation,
          shadowOpacity: 0.15,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
        },
        style,
      ]}
    >
      <View style={[styles.inner, { backgroundColor: color ? `${color}10` : 'rgba(255,255,255,0.5)' }]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  inner: {
    borderRadius: 20,
    padding: 16,
  },
});
