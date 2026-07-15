import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  action?: React.ReactNode;
  style?: ViewStyle;
}

export function SectionHeader({ title, subtitle, icon, action, style }: SectionHeaderProps) {
  const theme = useTheme();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.left}>
        {icon && (
          <Ionicons
            name={icon}
            size={22}
            color={theme.colors.primary}
            style={styles.icon}
          />
        )}
        <View>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>{title}</Text>
          {subtitle && (
            <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {action && <View style={styles.right}>{action}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  right: {
    marginLeft: 12,
  },
  icon: {
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },
});
