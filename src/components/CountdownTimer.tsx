import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useCountdown } from '../hooks/useCountdown';

interface CountdownTimerProps {
  targetDate: Date;
  onComplete?: () => void;
}

export function CountdownTimer({ targetDate, onComplete }: CountdownTimerProps) {
  const theme = useTheme();
  const countdown = useCountdown(targetDate);

  const units = [
    { value: countdown.days, label: 'Días' },
    { value: countdown.hours, label: 'Horas' },
    { value: countdown.minutes, label: 'Min' },
    { value: countdown.seconds, label: 'Seg' },
  ];

  if (countdown.isComplete) {
    onComplete?.();
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>
        El retiro comienza en
      </Text>
      <View style={styles.timerRow}>
        {units.map((unit, index) => (
          <Animated.View
            key={unit.label}
            entering={FadeInDown.delay(index * 100).springify()}
            style={[styles.unitContainer, { backgroundColor: `${theme.colors.primary}10` }]}
          >
            <Text style={[styles.value, { color: theme.colors.primary }]}>
              {String(unit.value).padStart(2, '0')}
            </Text>
            <Text style={[styles.unitLabel, { color: theme.colors.onSurfaceVariant }]}>
              {unit.label}
            </Text>
          </Animated.View>
        ))}
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');
const unitSize = (width - 72) / 4;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 16,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  timerRow: {
    flexDirection: 'row',
    gap: 8,
  },
  unitContainer: {
    width: unitSize,
    height: unitSize + 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  value: {
    fontSize: 28,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
    letterSpacing: -1,
  },
  unitLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
