import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Platform } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { GlassCard } from '../components/GlassCard';
import retreatData from '../data/retreat.json';

export function UbicacionScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { location } = retreatData;

  const openMaps = () => {
    const { latitude, longitude } = location;
    const label = encodeURIComponent(location.name);
    const url = Platform.select({
      ios: `maps:0,0?q=${label}@${latitude},${longitude}`,
      android: `geo:0,0?q=${latitude},${longitude}(${label})`,
      default: location.googleMapsLink,
    });
    Linking.openURL(url);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 100 }}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>Ubicación</Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Encuéntranos aquí
          </Text>
        </View>

        {/* Map Preview */}
        <Animated.View entering={FadeInDown.delay(0).springify()} style={styles.mapContainer}>
          <TouchableOpacity activeOpacity={0.85} onPress={openMaps}>
            <GlassCard elevation={2} style={styles.mapCard}>
              <View style={styles.mapPreview}>
                {/* Terrain layers */}
                <View style={[styles.terrainBase, { backgroundColor: theme.dark ? '#1B2A1B' : '#E8F5E9' }]} />
                <View style={[styles.terrainPatch1, { backgroundColor: theme.dark ? '#2A3A2A' : '#C8E6C9' }]} />
                <View style={[styles.terrainPatch2, { backgroundColor: theme.dark ? '#1E2E1E' : '#A5D6A7' }]} />
                {/* Roads */}
                <View style={[styles.roadH, { backgroundColor: theme.dark ? '#3A3A3A' : '#F5F5F5' }]} />
                <View style={[styles.roadV, { backgroundColor: theme.dark ? '#3A3A3A' : '#F5F5F5' }]} />
                {/* Pin */}
                <View style={[styles.pinContainer, { top: '42%', left: '55%' }]}>
                  <Ionicons name="location" size={28} color="#D32F2F" />
                </View>
                {/* Overlay button */}
                <View style={styles.mapOverlay}>
                  <View style={[styles.mapButton, { backgroundColor: theme.dark ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.6)' }]}>
                    <Ionicons name="compass-outline" size={16} color="#FFFFFF" />
                    <Text style={styles.mapButtonText}>Ver en Google Maps</Text>
                  </View>
                </View>
              </View>
            </GlassCard>
          </TouchableOpacity>
        </Animated.View>

        {/* Location Info */}
        <Animated.View entering={FadeInDown.delay(150).springify()}>
          <GlassCard elevation={2} style={styles.infoCard}>
            <View style={[styles.iconCircle, { backgroundColor: `${theme.colors.primary}15` }]}>
              <Ionicons name="location" size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={[styles.placeName, { color: theme.colors.onSurface }]}>{location.name}</Text>
              <Text style={[styles.address, { color: theme.colors.onSurfaceVariant }]}>
                {location.address}, {location.city}
              </Text>
            </View>
          </GlassCard>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 8 },
  title: { fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, marginTop: 4 },
  mapContainer: { paddingHorizontal: 20, marginBottom: 12 },
  mapCard: { overflow: 'hidden' },
  mapPreview: {
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  terrainBase: { ...StyleSheet.absoluteFillObject },
  terrainPatch1: {
    position: 'absolute',
    top: '10%', left: '20%',
    width: '60%', height: '40%',
    borderRadius: 80,
  },
  terrainPatch2: {
    position: 'absolute',
    bottom: '15%', right: '10%',
    width: '45%', height: '35%',
    borderRadius: 100,
  },
  roadH: {
    position: 'absolute',
    top: '50%', left: 0, right: 0,
    height: 6,
    marginTop: -3,
  },
  roadV: {
    position: 'absolute',
    left: '30%', top: 0, bottom: 0,
    width: 4,
  },
  pinContainer: { position: 'absolute' },
  mapOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 0, right: 0,
    alignItems: 'center',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  mapButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  infoCard: {
    marginHorizontal: 20,
    flexDirection: 'row', alignItems: 'center', gap: 14,
  },
  iconCircle: {
    width: 48, height: 48, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center', flexShrink: 0,
  },
  infoContent: { flex: 1, gap: 2 },
  placeName: { fontSize: 16, fontWeight: '600' },
  address: { fontSize: 13, lineHeight: 18 },
});
