import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ConferenceCard } from '../components/ConferenceCard';
import { SectionHeader } from '../components/SectionHeader';
import catedrasData from '../data/catedras.json';

export function CatedrasScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const saturday = catedrasData.filter((c) => c.day === 'Sábado 15');
  const sunday = catedrasData.filter((c) => c.day === 'Domingo 16');
  const monday = catedrasData.filter((c) => c.day === 'Lunes 17');

  const renderSection = (title: string, data: typeof catedrasData, index: number) => {
    if (data.length === 0) return null;
    return (
      <Animated.View key={title} entering={FadeInDown.delay(index * 150).springify()}>
        <SectionHeader title={title} icon="calendar-outline" />
        {data.map((cat, i) => (
          <Animated.View key={cat.id} entering={FadeInDown.delay(index * 150 + i * 80).springify()}>
            <ConferenceCard
              title={cat.name}
              speaker={cat.teacher}
              day={cat.day}
              time={cat.time}
              description={cat.description}
              location={cat.location}
              color={cat.color}
              type="catedra"
            />
          </Animated.View>
        ))}
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 100 }}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>Cátedras</Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Enseñanza profunda para tu crecimiento
          </Text>
        </View>

        {renderSection('Sábado 15', saturday, 0)}
        {renderSection('Domingo 16', sunday, 1)}
        {renderSection('Lunes 17', monday, 2)}
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
});
