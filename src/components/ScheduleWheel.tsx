import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const ITEM_H = 64;
const VISIBLE = 3;
const WHEEL_H = ITEM_H * VISIBLE;

interface WheelData {
  day: string;
  date: string;
  time: string;
  endTime: string;
  label: string;
}

interface Props {
  activities: WheelData[];
  currentIndex: number;
  isCurrentOngoing: boolean;
}

function getTargetY(idx: number, len: number) {
  return idx >= len ? -(len * ITEM_H) : ITEM_H * (1 - idx);
}

export function ScheduleWheel({ activities, currentIndex, isCurrentOngoing }: Props) {
  const theme = useTheme();
  const ended = currentIndex >= activities.length;

  const scrollY = useRef(new Animated.Value(getTargetY(currentIndex, activities.length))).current;

  useEffect(() => {
    Animated.spring(scrollY, {
      toValue: getTargetY(currentIndex, activities.length),
      damping: 18,
      stiffness: 200,
      mass: 1,
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);

  if (ended) {
    return (
      <View style={[styles.endedBox, { backgroundColor: theme.colors.surface, shadowColor: theme.colors.shadow, borderColor: theme.dark ? 'rgba(255,255,255,0.06)' : `${theme.colors.primary}0D` }]}>
        <Ionicons name="checkmark-circle" size={28} color="#66BB6A" />
        <Text style={[styles.endedText, { color: '#66BB6A' }]}>¡Retiro Finalizado!</Text>
      </View>
    );
  }

  const current = activities[currentIndex];
  const dayLabel =
    current.day === 'Sáb' ? 'SÁB 15' :
    current.day === 'Dom' ? 'DOM 16' : 'LUN 17';

  const windowBg = theme.dark ? '#1A1A2E' : `${theme.colors.primary}06`;
  const fadeBg = theme.dark ? 'rgba(26,26,46,0.55)' : `${theme.colors.primary}04`;
  const trackBg = theme.dark ? `${theme.colors.secondary}15` : `${theme.colors.secondary}0A`;
  const trackBorder = theme.dark ? `${theme.colors.secondary}30` : `${theme.colors.secondary}18`;

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.surface, shadowColor: theme.colors.shadow, borderColor: theme.dark ? 'rgba(255,255,255,0.06)' : `${theme.colors.primary}0D` }]}>
      {/* Decorative screws */}
      <View style={[styles.screw, styles.screwTL, { backgroundColor: theme.colors.onSurfaceVariant }]} />
      <View style={[styles.screw, styles.screwTR, { backgroundColor: theme.colors.onSurfaceVariant }]} />
      <View style={[styles.screw, styles.screwBL, { backgroundColor: theme.colors.onSurfaceVariant }]} />
      <View style={[styles.screw, styles.screwBR, { backgroundColor: theme.colors.onSurfaceVariant }]} />

      {/* Top bar: badge + label */}
      <View style={styles.topBar}>
        <View style={[styles.badgePill, { backgroundColor: isCurrentOngoing ? '#66BB6A' : theme.colors.secondary }]}>
          <View style={[styles.badgeDot, { backgroundColor: theme.colors.surface }]} />
          <Text style={[styles.badgeLabel, { color: theme.colors.surface }]}>{isCurrentOngoing ? 'EN CURSO' : 'PRÓXIMO'}</Text>
        </View>
        <View style={[styles.dividerDot, { backgroundColor: theme.colors.outlineVariant }]} />
        <Text style={[styles.dayText, { color: theme.colors.onSurfaceVariant }]}>{dayLabel}</Text>
      </View>

      {/* Counter window */}
      <View style={[styles.window, { backgroundColor: windowBg, borderColor: theme.dark ? 'rgba(255,255,255,0.08)' : `${theme.colors.primary}0D` }]}>
        {/* Fade edges */}
        <View style={[styles.fadeTop, { backgroundColor: fadeBg }]} />
        <View style={[styles.fadeBot, { backgroundColor: fadeBg }]} />

        {/* Center glow track */}
        <View style={[styles.centerTrack, { backgroundColor: trackBg, borderColor: trackBorder }]} />

        {/* Strip */}
        <Animated.View style={{ transform: [{ translateY: scrollY }] }}>
          {activities.map((item, i) => {
            const dist = Math.abs(i - currentIndex);
            const isCenter = dist === 0;
            const adjacent = dist === 1;

            return (
              <View
                key={`${item.date}-${item.time}`}
                style={[
                  styles.row,
                  { height: ITEM_H, opacity: isCenter ? 1 : adjacent ? 0.65 : 0 },
                  i < activities.length - 1 && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.dark ? 'rgba(255,255,255,0.06)' : `${theme.colors.primary}10` },
                ]}
              >
                {/* Flip-card left edge accent */}
                {isCenter && <View style={[styles.flipEdge, { backgroundColor: theme.colors.secondary }]} />}

                {/* Time */}
                <Text style={[
                  styles.time,
                  isCenter && styles.timeCenter,
                  { color: isCenter ? (theme.dark ? '#FFFFFF' : theme.colors.primary) : (theme.dark ? '#B0B0B0' : theme.colors.onSurfaceVariant) },
                ]}>
                  {item.time}
                </Text>

                {/* Divider */}
                <Text style={[styles.colon, { color: theme.dark ? 'rgba(255,255,255,0.15)' : theme.colors.outlineVariant }]}>|</Text>

                {/* Label + badge */}
                <View style={styles.rightCol}>
                  <Text
                    style={[
                      styles.act,
                      isCenter && styles.actCenter,
                      { color: isCenter ? theme.colors.onSurface : (theme.dark ? '#B0B0B0' : theme.colors.onSurfaceVariant) },
                    ]}
                  >
                    {item.label}
                  </Text>

                  {isCenter && (
                    <Text style={[
                      styles.subLabel,
                      { color: isCurrentOngoing ? '#66BB6A' : theme.colors.secondary },
                    ]}>
                      {isCurrentOngoing ? '• Ahora' : '• Siguiente'}
                    </Text>
                  )}
                </View>
              </View>
            );
          })}
        </Animated.View>
      </View>

      {/* Bottom info */}
      <Text style={[styles.footer, { color: theme.colors.onSurfaceVariant }]}>
        {activities.length} actividades • {isCurrentOngoing ? 'Retiro en vivo' : 'Retiro próximo'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 16,
    paddingTop: 14,
    position: 'relative',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
    borderWidth: 1,
  },

  // Decorative screws
  screw: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    opacity: 0.4,
  },
  screwTL: { top: 8, left: 8 },
  screwTR: { top: 8, right: 8 },
  screwBL: { bottom: 8, left: 8 },
  screwBR: { bottom: 8, right: 8 },

  // Top bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  badgeLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  dividerDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
  },
  dayText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },

  // Counter window
  window: {
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    height: WHEEL_H,
    borderWidth: 1,
  },
  fadeTop: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: ITEM_H * 0.3,
    zIndex: 5,
  },
  fadeBot: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: ITEM_H * 0.3,
    zIndex: 5,
  },
  centerTrack: {
    position: 'absolute',
    left: 2, right: 2,
    top: '50%',
    height: ITEM_H,
    marginTop: -(ITEM_H / 2),
    borderRadius: 10,
    borderWidth: 1,
    zIndex: 2,
  },

  // Rows
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 10,
    position: 'relative',
  },
  flipEdge: {
    position: 'absolute',
    left: 0,
    top: 4,
    bottom: 4,
    width: 3,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },

  // Time
  time: {
    fontSize: 13,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
    width: 42,
    textAlign: 'right',
  },
  timeCenter: {
    fontSize: 16,
    fontWeight: '800',
  },

  colon: {
    fontSize: 14,
    fontWeight: '300',
  },

  // Activity
  rightCol: {
    flex: 1,
    justifyContent: 'center',
    gap: 1,
  },
  act: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 17,
  },
  actCenter: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 18,
  },
  subLabel: {
    fontSize: 10,
    fontWeight: '600',
  },

  // Footer
  footer: {
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
    letterSpacing: 0.3,
  },

  // Ended
  endedBox: {
    paddingVertical: 20,
    alignItems: 'center',
    gap: 8,
    borderRadius: 20,
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
    borderWidth: 1,
  },
  endedText: {
    fontSize: 16,
    fontWeight: '800',
  },
});