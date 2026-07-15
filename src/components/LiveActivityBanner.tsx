import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from './GlassCard';
import { palette } from '../theme';

interface LiveActivityBannerProps {
  activity: string;
  time: string;
  responsible: string;
  location?: string;
  timeRemaining?: string;
}

export function LiveActivityBanner({ activity, time, responsible, location, timeRemaining }: LiveActivityBannerProps) {
  const theme = useTheme();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 0.85, duration: 1200, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  return (
    <GlassCard
      elevation={6}
      style={styles.container}
    >
      <View style={[styles.liveBar, { backgroundColor: palette.success }]} />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.liveIndicator}>
            <Animated.View
              style={[
                styles.liveDot,
                { backgroundColor: palette.success, transform: [{ scale: pulseAnim }] },
              ]}
            />
            <Text style={[styles.liveLabel, { color: palette.success }]}>AHORA MISMO</Text>
          </View>
          {timeRemaining && (
            <Text style={[styles.timeRemaining, { color: theme.colors.onSurfaceVariant }]}>
              {timeRemaining}
            </Text>
          )}
        </View>

        <Text style={[styles.activityName, { color: theme.colors.onSurface }]}>{activity}</Text>

        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={14} color={theme.colors.onSurfaceVariant} />
            <Text style={[styles.detailText, { color: theme.colors.onSurfaceVariant }]}>{time}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="person-outline" size={14} color={theme.colors.onSurfaceVariant} />
            <Text style={[styles.detailText, { color: theme.colors.onSurfaceVariant }]}>{responsible}</Text>
          </View>
        </View>

        {location ? (
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={13} color={theme.colors.onSurfaceVariant} />
            <Text style={[styles.locationText, { color: theme.colors.onSurfaceVariant }]}>{location}</Text>
          </View>
        ) : null}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 8,
    borderWidth: 1,
    borderColor: `${palette.success}30`,
    overflow: 'hidden',
  },
  liveBar: {
    height: 4,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  content: {
    paddingTop: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  liveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    shadowColor: palette.success,
    shadowOpacity: 0.6,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  liveLabel: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  timeRemaining: {
    fontSize: 12,
    fontWeight: '500',
  },
  activityName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    lineHeight: 26,
  },
  detailsRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 6,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 13,
    fontWeight: '500',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 6,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '400',
  },
});
