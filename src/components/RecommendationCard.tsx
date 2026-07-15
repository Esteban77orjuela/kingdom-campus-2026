import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from './GlassCard';

interface RecommendationCardProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  description: string;
  color: string;
}

export function RecommendationCard({ title, icon, description, color }: RecommendationCardProps) {
  const theme = useTheme();

  return (
    <GlassCard elevation={1} style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.iconCircle, { backgroundColor: `${color}15` }]}>
          <Ionicons name={icon} size={24} color={color} />
        </View>
        <View style={styles.textContent}>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>{title}</Text>
          <Text style={[styles.description, { color: theme.colors.onSurfaceVariant }]} numberOfLines={3}>
            {description}
          </Text>
        </View>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  content: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-start',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  textContent: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 13,
    lineHeight: 19,
  },
});
