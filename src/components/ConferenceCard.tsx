import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from './GlassCard';

interface ConferenceCardProps {
  title: string;
  speaker: string;
  day: string;
  time: string;
  description: string;
  location?: string;
  color?: string;
  type?: 'conference' | 'catedra';
}

export function ConferenceCard({ title, speaker, day, time, description, location, color, type = 'conference' }: ConferenceCardProps) {
  const theme = useTheme();
  const accentColor = color || theme.colors.primary;
  const iconName = type === 'conference' ? 'mic-outline' : 'school-outline';
  const typeLabel = type === 'conference' ? 'Conferencia' : 'Cátedra';

  return (
    <GlassCard elevation={2} style={styles.container}>
      <View style={[styles.accentBar, { backgroundColor: accentColor }]} />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={[styles.typeBadge, { backgroundColor: `${accentColor}15` }]}>
            <Ionicons name={iconName} size={14} color={accentColor} />
            <Text style={[styles.typeText, { color: accentColor }]}>{typeLabel}</Text>
          </View>
        </View>

        <Text style={[styles.title, { color: theme.colors.onSurface }]}>{title}</Text>

        <View style={styles.speakerRow}>
          <View style={[styles.avatar, { backgroundColor: `${accentColor}20` }]}>
            <Ionicons name="person" size={16} color={accentColor} />
          </View>
          <Text style={[styles.speaker, { color: theme.colors.onSurface }]}>{speaker}</Text>
        </View>

        <Text style={[styles.description, { color: theme.colors.onSurfaceVariant }]} numberOfLines={2}>
          {description}
        </Text>

        <View style={[styles.metaRow, { borderTopColor: theme.colors.outlineVariant }]}>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={14} color={theme.colors.onSurfaceVariant} />
            <Text style={[styles.metaText, { color: theme.colors.onSurfaceVariant }]}>{day}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={14} color={theme.colors.onSurfaceVariant} />
            <Text style={[styles.metaText, { color: theme.colors.onSurfaceVariant }]}>{time}</Text>
          </View>
          {location && (
            <View style={styles.metaItem}>
              <Ionicons name="location-outline" size={14} color={theme.colors.onSurfaceVariant} />
              <Text style={[styles.metaText, { color: theme.colors.onSurfaceVariant }]}>{location}</Text>
            </View>
          )}
        </View>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 12,
    overflow: 'hidden',
  },
  accentBar: {
    height: 4,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  content: {
    paddingTop: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 10,
  },
  speakerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  speaker: {
    fontSize: 14,
    fontWeight: '600',
  },
  description: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingTop: 10,
    borderTopWidth: 1,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
