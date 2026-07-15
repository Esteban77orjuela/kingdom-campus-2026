import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { TimelineCard } from '../components/TimelineCard';
import { getActivityStatus, formatTime } from '../utils/dateUtils';
import { palette } from '../theme';
import scheduleData from '../data/schedule.json';

const { width } = Dimensions.get('window');

export function ScheduleScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedDay, setSelectedDay] = useState(0);

  const currentDayData = scheduleData[selectedDay];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 100 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>Cronograma</Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Todo el retiro día a día
          </Text>
        </View>

        {/* Day Selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.daySelector}
          contentContainerStyle={styles.daySelectorContent}
        >
          {scheduleData.map((day, index) => {
            const isSelected = index === selectedDay;
            return (
              <TouchableOpacity
                key={day.day}
                activeOpacity={0.7}
                onPress={() => setSelectedDay(index)}
                style={[
                  styles.dayChip,
                  isSelected && { backgroundColor: palette.darkBlue },
                  !isSelected && { backgroundColor: `${theme.colors.surface}` },
                ]}
              >
                <Text
                  style={[
                    styles.dayChipText,
                    { color: isSelected ? palette.white : theme.colors.onSurface },
                    isSelected && styles.dayChipTextSelected,
                  ]}
                >
                  {day.label}
                </Text>
                <Text
                  style={[
                    styles.dayChipCount,
                    { color: isSelected ? 'rgba(255,255,255,0.7)' : theme.colors.onSurfaceVariant },
                  ]}
                >
                  {day.activities.length} act.
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: palette.success }]} />
            <Text style={[styles.legendText, { color: theme.colors.onSurfaceVariant }]}>En curso</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: palette.gold }]} />
            <Text style={[styles.legendText, { color: theme.colors.onSurfaceVariant }]}>Próxima</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: palette.gray300 }]} />
            <Text style={[styles.legendText, { color: theme.colors.onSurfaceVariant }]}>Finalizada</Text>
          </View>
        </View>

        {/* Timeline */}
        {currentDayData && (
          <View style={styles.timeline}>
            {currentDayData.activities.map((act, index) => {
              const status = getActivityStatus(act.time, act.endTime, currentDayData.day);
              return (
                <Animated.View
                  key={`${act.time}-${act.activity}`}
                  entering={FadeInDown.delay(index * 40).springify()}
                >
                  <TimelineCard
                    time={`${act.time} - ${act.endTime}`}
                    activity={act.activity}
                    responsible={act.responsible}
                    location={act.location}
                    status={status}
                    isLast={index === currentDayData.activities.length - 1}
                    type={act.type}
                  />
                </Animated.View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  daySelector: {
    marginTop: 12,
    marginBottom: 8,
  },
  daySelectorContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  dayChip: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    alignItems: 'center',
    minWidth: 100,
  },
  dayChipText: {
    fontSize: 14,
    fontWeight: '700',
  },
  dayChipTextSelected: {
    color: palette.white,
  },
  dayChipCount: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
  legend: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    fontWeight: '500',
  },
  timeline: {
    paddingTop: 8,
  },
});
