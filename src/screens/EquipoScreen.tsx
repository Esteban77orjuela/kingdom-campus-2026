import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { TeamCard } from '../components/TeamCard';
import teamData from '../data/team.json';

export function EquipoScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 100 }}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>Equipo</Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Conoce a quienes hacen esto posible
          </Text>
        </View>

        {teamData.map((member, index) => (
          <Animated.View key={member.id} entering={FadeInDown.delay(index * 60).springify()}>
            <TeamCard
              name={member.name}
              role={member.role}
              color={member.color}
              description={member.description}
            />
          </Animated.View>
        ))}
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
    paddingTop: 8,
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
