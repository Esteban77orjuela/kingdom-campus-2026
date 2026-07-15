import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { FacultyCard } from '../components/FacultyCard';
import facultiesData from '../data/faculties.json';

export function FacultadesScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 100 }}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>Facultades</Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Las facultades del retiro
          </Text>
        </View>

        {facultiesData.map((faculty, index) => (
          <Animated.View key={faculty.id} entering={FadeInDown.delay(index * 100).springify()}>
            <FacultyCard
              name={faculty.name}
              color={faculty.color}
              description={faculty.description}
              members={faculty.members}
              leader={faculty.leader}
              points={faculty.points}
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
