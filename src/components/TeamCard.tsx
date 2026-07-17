import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from './GlassCard';

interface TeamCardProps {
  name: string;
  role: string;
  color?: string;
  photo?: string | null;
  description?: string;
}

export function TeamCard({ name, role, color, photo, description }: TeamCardProps) {
  const theme = useTheme();
  const accentColor = color || theme.colors.primary;
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2);

  return (
    <GlassCard elevation={1} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
          {photo ? (
            <View style={styles.photoContainer}>
              <View style={[styles.photoPlaceholder, { backgroundColor: `${accentColor}20` }]}>
                <Text style={[styles.initials, { color: accentColor }]}>{initials}</Text>
              </View>
            </View>
          ) : (
            <View style={[styles.avatarCircle, { backgroundColor: `${accentColor}15` }]}>
              <Ionicons name="person" size={22} color={accentColor} />
            </View>
          )}
          <View style={styles.info}>
            <Text style={[styles.name, { color: theme.colors.onSurface }]}>{name}</Text>
            <View style={[styles.roleBadge, { backgroundColor: `${accentColor}12` }]}>
              <Text style={[styles.role, { color: accentColor }]}>{role}</Text>
            </View>
          </View>
        </View>
        {description && (
          <Text style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>
            {description}
          </Text>
        )}
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
    padding: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  photoContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    overflow: 'hidden',
  },
  photoPlaceholder: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    fontSize: 18,
    fontWeight: '700',
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
  },
  roleBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  role: {
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    fontSize: 12,
    lineHeight: 17,
    marginTop: 8,
    paddingLeft: 66,
  },
});
