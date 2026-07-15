import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ConferenceCard } from '../components/ConferenceCard';
import conferencesData from '../data/conferences.json';

export function ConferenciasScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 100 }}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>Conferencias</Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Mensajes poderosos para tu vida
          </Text>
        </View>

        {conferencesData.length === 0 ? (
          <Text style={[{ paddingHorizontal: 20, color: theme.colors.onSurfaceVariant }]}>Próximamente</Text>
        ) : (
          conferencesData.map((conf, i) => (
            <Animated.View key={conf.id} entering={FadeInDown.delay(i * 80).springify()}>
              <ConferenceCard
                title={conf.title}
                speaker={conf.speaker}
                day={conf.day}
                time={conf.time}
                description={conf.description}
                location={conf.location}
                color={conf.color}
                type="conference"
              />
            </Animated.View>
          ))
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
});
