import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { ConferenceCard } from '../components/ConferenceCard';
import catedrasData from '../data/catedras.json';

export function CatedrasScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const dayColors = [theme.colors.primary, theme.colors.secondary, theme.colors.tertiary];

  const saturday = catedrasData.filter((c) => c.day === 'Sábado 15');
  const sunday = catedrasData.filter((c) => c.day === 'Domingo 16');
  const monday = catedrasData.filter((c) => c.day === 'Lunes 17');

  const sections = [
    { title: 'Sábado 15', data: saturday, icon: 'sunny-outline' as const },
    { title: 'Domingo 16', data: sunday, icon: 'sunny-outline' as const },
    { title: 'Lunes 17', data: monday, icon: 'sunny-outline' as const },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 100 }}
      >
        <View style={styles.header}>
          <View style={styles.headerAccent}>
            <View style={[styles.accentDot, { backgroundColor: theme.colors.tertiary }]} />
            <View style={[styles.accentLine, { backgroundColor: `${theme.colors.tertiary}30` }]} />
          </View>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>Cátedras</Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Enseñanza profunda para tu crecimiento
          </Text>
        </View>

        {sections.map((section, idx) => {
          if (section.data.length === 0) return null;
          return (
            <Animated.View key={section.title} entering={FadeInDown.delay(idx * 100).springify()}>
              <View style={styles.dayHeader}>
                <View style={[styles.dayIconBg, { backgroundColor: `${dayColors[idx]}18` }]}>
                  <Ionicons name={section.icon} size={16} color={dayColors[idx]} />
                </View>
                <Text style={[styles.dayTitle, { color: theme.colors.onSurface }]}>{section.title}</Text>
                <View style={[styles.dayLine, { backgroundColor: `${dayColors[idx]}25` }]} />
              </View>
              {section.data.map((cat, i) => (
                <Animated.View key={cat.id} entering={FadeInDown.delay(idx * 100 + i * 60).springify()}>
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
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingBottom: 8 },
  headerAccent: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  accentDot: { width: 8, height: 8, borderRadius: 4 },
  accentLine: { flex: 1, height: 1 },
  title: { fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, marginTop: 4 },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  dayIconBg: {
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayTitle: { fontSize: 17, fontWeight: '700' },
  dayLine: { flex: 1, height: 1 },
});
