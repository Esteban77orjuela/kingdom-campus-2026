import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { GlassCard } from '../components/GlassCard';
import { palette } from '../theme';

interface MoreScreenProps {
  navigation: any;
}

const moreModules = [
  { icon: 'bulb-outline', label: 'Recomendaciones', route: 'Recomendaciones', desc: 'Todo lo que debes saber', color: palette.amber },
  { icon: 'map-outline', label: 'Ubicación', route: 'Ubicacion', desc: 'Cómo llegar', color: '#1976D2' },
  { icon: 'information-circle-outline', label: 'Acerca de', route: '', desc: 'Información de la app', color: palette.gray400 },
];

export function MoreScreen({ navigation }: MoreScreenProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 100 }}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>Más</Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Todo lo que necesitas
          </Text>
        </View>

        <View style={styles.modulesGrid}>
          {moreModules.map((mod, index) => (
            <Animated.View key={mod.route} entering={FadeInDown.delay(index * 80).springify()}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate(mod.route)}
              >
                <GlassCard elevation={2} style={styles.moduleCard}>
                  <View style={styles.moduleRow}>
                    <View style={[styles.moduleIcon, { backgroundColor: `${mod.color}15` }]}>
                      <Ionicons name={mod.icon as any} size={24} color={mod.color} />
                    </View>
                    <View style={styles.moduleInfo}>
                      <Text style={[styles.moduleLabel, { color: theme.colors.onSurface }]}>{mod.label}</Text>
                      <Text style={[styles.moduleDesc, { color: theme.colors.onSurfaceVariant }]}>{mod.desc}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={theme.colors.onSurfaceVariant} />
                  </View>
                </GlassCard>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* App Info */}
        <Animated.View entering={FadeInDown.delay(400).springify()} style={styles.appInfo}>
          <GlassCard elevation={1} style={styles.appInfoCard}>
            <Text style={[styles.appName, { color: theme.colors.onSurface }]}>Kingdom Campus 2026</Text>
            <Text style={[styles.appVersion, { color: theme.colors.onSurfaceVariant }]}>Versión 1.0.0</Text>
            <View style={styles.appDivider} />
            <Text style={[styles.appDesc, { color: theme.colors.onSurfaceVariant }]}>
              Transformando vidas, edificando el Reino.
            </Text>
          </GlassCard>
        </Animated.View>
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
  modulesGrid: {
    paddingTop: 8,
  },
  moduleCard: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  moduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  moduleIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  moduleInfo: {
    flex: 1,
    gap: 2,
  },
  moduleLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  moduleDesc: {
    fontSize: 13,
  },
  appInfo: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  appInfoCard: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  appName: {
    fontSize: 16,
    fontWeight: '700',
  },
  appVersion: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  appDivider: {
    width: 40,
    height: 2,
    backgroundColor: palette.gold,
    borderRadius: 1,
    marginVertical: 12,
  },
  appDesc: {
    fontSize: 13,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
