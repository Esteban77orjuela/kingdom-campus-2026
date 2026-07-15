import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from './GlassCard';

interface FacultyCardProps {
  name: string;
  color: string;
  description?: string;
  members?: number;
  leader?: string;
  points?: number;
}

const FACULTY_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  Jerusalén: 'home',
  Antioquía: 'business',
  Berea: 'book',
  Éfeso: 'briefcase',
  Galilea: 'water',
};

export function FacultyCard({ name, color, description, members, leader, points }: FacultyCardProps) {
  const theme = useTheme();
  const iconName = FACULTY_ICONS[name] || 'people';

  return (
    <GlassCard elevation={2} style={styles.container}>
      <View style={[styles.accentBar, { backgroundColor: color }]} />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={[styles.iconCircle, { backgroundColor: `${color}18` }]}>
            <Ionicons name={iconName} size={24} color={color} />
          </View>
          <View style={styles.headerInfo}>
            <Text style={[styles.name, { color: theme.colors.onSurface }]}>{name}</Text>
            {leader && (
              <View style={styles.leaderRow}>
                <Ionicons name="person-outline" size={12} color={theme.colors.onSurfaceVariant} />
                <Text style={[styles.leader, { color: theme.colors.onSurfaceVariant }]}>{leader}</Text>
              </View>
            )}
          </View>
          {points !== undefined && (
            <View style={[styles.pointsBadge, { backgroundColor: `${color}15` }]}>
              <Text style={[styles.pointsValue, { color }]}>{points}</Text>
              <Text style={[styles.pointsLabel, { color: theme.colors.onSurfaceVariant }]}>pts</Text>
            </View>
          )}
        </View>

        {description && (
          <Text style={[styles.description, { color: theme.colors.onSurfaceVariant }]} numberOfLines={2}>
            {description}
          </Text>
        )}

        {members !== undefined && (
          <View style={styles.membersRow}>
            <Ionicons name="people-outline" size={14} color={theme.colors.onSurfaceVariant} />
            <Text style={[styles.members, { color: theme.colors.onSurfaceVariant }]}>
              {members} miembros
            </Text>
          </View>
        )}
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
    alignItems: 'center',
    gap: 14,
    marginBottom: 10,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
  },
  leaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  leader: {
    fontSize: 13,
    fontWeight: '500',
  },
  pointsBadge: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  pointsValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  pointsLabel: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 8,
  },
  membersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 8,
  },
  members: {
    fontSize: 13,
    fontWeight: '500',
  },
});
