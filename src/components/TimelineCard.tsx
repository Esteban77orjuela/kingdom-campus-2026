import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from './GlassCard';
import { StatusBadge } from './StatusBadge';
import { palette } from '../theme';

interface TimelineCardProps {
  time: string;
  activity: string;
  responsible: string;
  location?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  isLast?: boolean;
  type?: string;
}

const ACTIVITY_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  conference: 'mic-outline',
  catedra: 'book-outline',
  worship: 'musical-notes-outline',
  break: 'cafe-outline',
  game: 'football-outline',
  general: 'people-outline',
  workshop: 'build-outline',
  free: 'time-outline',
  rest: 'moon-outline',
  default: 'ellipse-outline',
};

export function TimelineCard({ time, activity, responsible, location, status, isLast, type }: TimelineCardProps) {
  const theme = useTheme();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  const isOngoing = status === 'ongoing';
  const iconName = type ? ACTIVITY_ICONS[type] || ACTIVITY_ICONS.default : ACTIVITY_ICONS.default;

  useEffect(() => {
    if (isOngoing) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 0.85, duration: 1000, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
        ])
      );
      const glow = Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, { toValue: 1, duration: 1500, useNativeDriver: false }),
          Animated.timing(glowAnim, { toValue: 0, duration: 1500, useNativeDriver: false }),
        ])
      );
      pulse.start();
      glow.start();
      return () => { pulse.stop(); glow.stop(); };
    }
  }, [isOngoing, pulseAnim, glowAnim]);

  const statusColor = isOngoing
    ? palette.success
    : status === 'upcoming'
    ? palette.info
    : palette.gray400;

  const timelineColor = isOngoing
    ? palette.success
    : status === 'completed'
    ? palette.gray300
    : palette.gold;

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(46, 125, 50, 0)', 'rgba(46, 125, 50, 0.15)'],
  });

  return (
    <View style={styles.row}>
      <View style={styles.timelineColumn}>
        <Animated.View
          style={[
            styles.dot,
            {
              backgroundColor: timelineColor,
              borderColor: timelineColor,
              transform: [{ scale: pulseAnim }],
            },
            isOngoing && styles.ongoingDot,
          ]}
        />
        {!isLast && (
          <View style={[styles.line, { backgroundColor: status === 'completed' ? palette.gray200 : palette.gray200 }]} />
        )}
      </View>

      <View style={[styles.cardContainer, ...(isOngoing ? [styles.ongoingCardContainer] : [])]}>
        {isOngoing && (
          <Animated.View
            style={[
              styles.glowOverlay,
              { backgroundColor: glowOpacity },
            ]}
          />
        )}
        <GlassCard
          elevation={isOngoing ? 4 : 2}
          style={isOngoing ? { borderWidth: 1, borderColor: `${palette.success}40` } : undefined}
        >
          {isOngoing && (
            <View style={[styles.liveBar, { backgroundColor: palette.success }]} />
          )}
          <View style={styles.cardHeader}>
            <View style={styles.timeContainer}>
              <Ionicons name="time-outline" size={14} color={theme.colors.onSurfaceVariant} />
              <Text style={[styles.time, { color: theme.colors.onSurfaceVariant }]}>{time}</Text>
            </View>
            <StatusBadge status={status} size="small" />
          </View>

          <View style={styles.activityRow}>
            <View style={[styles.iconContainer, { backgroundColor: `${timelineColor}15` }]}>
              <Ionicons
                name={iconName}
                size={20}
                color={timelineColor}
              />
            </View>
            <View style={styles.activityInfo}>
              <Text style={[styles.activityTitle, { color: theme.colors.onSurface }]}>{activity}</Text>
              <Text style={[styles.responsible, { color: theme.colors.onSurfaceVariant }]}>
                <Ionicons name="person-outline" size={12} color={theme.colors.onSurfaceVariant} /> {responsible}
              </Text>
            </View>
          </View>

          {location ? (
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={13} color={theme.colors.onSurfaceVariant} />
              <Text style={[styles.location, { color: theme.colors.onSurfaceVariant }]}>{location}</Text>
            </View>
          ) : null}
        </GlassCard>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  timelineColumn: {
    width: 32,
    alignItems: 'center',
    paddingTop: 4,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 3,
    zIndex: 1,
  },
  ongoingDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 4,
    shadowColor: palette.success,
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
  line: {
    flex: 1,
    width: 2,
    minHeight: 30,
  },
  cardContainer: {
    flex: 1,
    marginLeft: 12,
    marginBottom: 12,
  },
  ongoingCardContainer: {
    shadowColor: palette.success,
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  glowOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    zIndex: 0,
  },
  liveBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  time: {
    fontSize: 13,
    fontWeight: '500',
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityInfo: {
    flex: 1,
    gap: 4,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  responsible: {
    fontSize: 13,
    lineHeight: 18,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    gap: 4,
  },
  location: {
    fontSize: 12,
  },
});
