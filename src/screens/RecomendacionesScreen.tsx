import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { RecommendationCard } from '../components/RecommendationCard';
import recommendationsData from '../data/recommendations.json';

export function RecomendacionesScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 100 }}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>Recomendaciones</Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Todo lo que necesitas saber
          </Text>
        </View>

        <View style={styles.grid}>
          {recommendationsData.map((rec, index) => (
            <Animated.View key={rec.id} entering={FadeInDown.delay(index * 60).springify()}>
              <RecommendationCard
                title={rec.title}
                icon={rec.icon as any}
                description={rec.description}
                color={rec.color}
              />
            </Animated.View>
          ))}
        </View>
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
  grid: {
    paddingTop: 8,
  },
});
