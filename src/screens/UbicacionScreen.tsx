import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Platform } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import MapView, { Marker } from 'react-native-maps';
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
      default: `https://maps.google.com/maps?q=${latitude},${longitude}`,
    });
    Linking.openURL(url);
  };

  const callPhone = () => {
    Linking.openURL(`tel:${location.phone}`);
  };

  const region = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
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

        {/* Map */}
        <Animated.View entering={FadeInDown.delay(0).springify()} style={styles.mapContainer}>
          <GlassCard elevation={2} style={styles.mapCard}>
            <View style={styles.mapWrapper}>
              <MapView
                style={styles.map}
                initialRegion={region}
                showsUserLocation={false}
                showsCompass={false}
                toolbarEnabled={false}
              >
                <Marker
                  coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }}
                  title={location.name}
                  description={`${location.address}, ${location.city}`}
                />
              </MapView>
              <TouchableOpacity style={styles.mapOverlay} activeOpacity={0.8} onPress={openMaps}>
                <View style={[styles.mapButton, { backgroundColor: theme.colors.inverseSurface }]}>
                  <Ionicons name="compass-outline" size={18} color={theme.colors.inverseOnSurface} />
                  <Text style={[styles.mapButtonText, { color: theme.colors.inverseOnSurface }]}>Abrir en Google Maps</Text>
                </View>
              </TouchableOpacity>
            </View>
          </GlassCard>
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

        {/* Phone */}
        <Animated.View entering={FadeInDown.delay(250).springify()}>
          <TouchableOpacity activeOpacity={0.7} onPress={callPhone}>
            <GlassCard elevation={2} style={styles.infoCard}>
              <View style={[styles.iconCircle, { backgroundColor: `${theme.colors.secondary}15` }]}>
                <Ionicons name="call" size={24} color={theme.colors.secondary} />
              </View>
              <View style={styles.infoContent}>
                <Text style={[styles.placeName, { color: theme.colors.onSurface }]}>Teléfono</Text>
                <Text style={[styles.address, { color: theme.colors.onSurfaceVariant }]}>{location.phone}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={theme.colors.onSurfaceVariant} />
            </GlassCard>
          </TouchableOpacity>
        </Animated.View>

        {/* Quick Info */}
        <Animated.View entering={FadeInDown.delay(350).springify()} style={styles.quickInfo}>
          <GlassCard elevation={1} style={styles.quickInfoCard}>
            <Ionicons name="car-outline" size={20} color={theme.colors.primary} />
            <Text style={[styles.quickLabel, { color: theme.colors.onSurfaceVariant }]}>Parqueadero</Text>
            <Text style={[styles.quickValue, { color: theme.colors.onSurface }]}>Disponible</Text>
          </GlassCard>
          <GlassCard elevation={1} style={styles.quickInfoCard}>
            <Ionicons name="wifi-outline" size={20} color={theme.colors.primary} />
            <Text style={[styles.quickLabel, { color: theme.colors.onSurfaceVariant }]}>WiFi</Text>
            <Text style={[styles.quickValue, { color: theme.colors.onSurface }]}>Gratuito</Text>
          </GlassCard>
          <GlassCard elevation={1} style={styles.quickInfoCard}>
            <Ionicons name="restaurant-outline" size={20} color={theme.colors.primary} />
            <Text style={[styles.quickLabel, { color: theme.colors.onSurfaceVariant }]}>Comedor</Text>
            <Text style={[styles.quickValue, { color: theme.colors.onSurface }]}>Incluido</Text>
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
  mapWrapper: { position: 'relative' },
  map: { height: 220, borderRadius: 20 },
  mapOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
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
  mapButtonText: { fontSize: 14, fontWeight: '600' },
  infoCard: {
    marginHorizontal: 20, marginBottom: 10,
    flexDirection: 'row', alignItems: 'center', gap: 14,
  },
  iconCircle: {
    width: 48, height: 48, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center', flexShrink: 0,
  },
  infoContent: { flex: 1, gap: 2 },
  placeName: { fontSize: 16, fontWeight: '600' },
  address: { fontSize: 13, lineHeight: 18 },
  quickInfo: { flexDirection: 'row', paddingHorizontal: 20, gap: 10, marginTop: 8 },
  quickInfoCard: { flex: 1, alignItems: 'center', paddingVertical: 16, gap: 6 },
  quickLabel: { fontSize: 11, fontWeight: '500' },
  quickValue: { fontSize: 13, fontWeight: '700' },
});
