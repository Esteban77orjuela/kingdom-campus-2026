import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRetreatStatus } from '../hooks/useRetreatStatus';
import { CountdownTimer } from '../components/CountdownTimer';
import { ScheduleWheel } from '../components/ScheduleWheel';
import { GlassCard } from '../components/GlassCard';
import { palette } from '../theme';
import { RETIRO_START_DATE, RETIRO_NAME, RETIRO_SUBTITLE, RETIRO_VERSE } from '../utils/constants';

interface HomeScreenProps {
  navigation: any;
}

const allActivities = [
  // ── Sábado 15 ──────────────────────────────────────────────────
  { day: 'Sáb', date: '2026-08-15', time: '05:00', endTime: '05:30', label: 'Llegada al punto de encuentro' },
  { day: 'Sáb', date: '2026-08-15', time: '05:30', endTime: '09:00', label: 'Salida hacia la finca' },
  { day: 'Sáb', date: '2026-08-15', time: '09:00', endTime: '09:30', label: 'Llegada e instalación' },
  { day: 'Sáb', date: '2026-08-15', time: '09:30', endTime: '10:15', label: 'Apertura oficial del Kingdom Campus' },
  { day: 'Sáb', date: '2026-08-15', time: '10:15', endTime: '10:30', label: 'Receso' },
  { day: 'Sáb', date: '2026-08-15', time: '10:30', endTime: '11:00', label: 'Apertura Cátedra Magistral I' },
  { day: 'Sáb', date: '2026-08-15', time: '11:00', endTime: '12:30', label: 'Cátedra I – Cómo Tener una Vida Devocional' },
  { day: 'Sáb', date: '2026-08-15', time: '12:30', endTime: '13:30', label: 'Almuerzo' },
  { day: 'Sáb', date: '2026-08-15', time: '13:30', endTime: '14:00', label: 'Formación de Facultades' },
  { day: 'Sáb', date: '2026-08-15', time: '14:00', endTime: '14:30', label: 'Apertura Cátedra Magistral II' },
  { day: 'Sáb', date: '2026-08-15', time: '14:30', endTime: '16:00', label: 'Cátedra II – Comportamiento Cristiano en un Entorno Secular' },
  { day: 'Sáb', date: '2026-08-15', time: '16:00', endTime: '17:30', label: 'Piscina e Integración' },
  { day: 'Sáb', date: '2026-08-15', time: '17:30', endTime: '18:00', label: 'Aseo personal' },
  { day: 'Sáb', date: '2026-08-15', time: '18:00', endTime: '19:00', label: 'Cena' },
  { day: 'Sáb', date: '2026-08-15', time: '19:00', endTime: '19:30', label: 'Apertura Servicio General' },
  { day: 'Sáb', date: '2026-08-15', time: '19:30', endTime: '20:30', label: 'Servicio General y Palabra' },
  { day: 'Sáb', date: '2026-08-15', time: '20:30', endTime: '21:15', label: 'Diario Espiritual y Ranking' },
  { day: 'Sáb', date: '2026-08-15', time: '21:15', endTime: '22:00', label: 'Reunión por Facultades' },
  { day: 'Sáb', date: '2026-08-15', time: '22:00', endTime: '23:59', label: 'Descanso' },
  // ── Domingo 16 ─────────────────────────────────────────────────
  { day: 'Dom', date: '2026-08-16', time: '06:00', endTime: '06:30', label: 'Devocional Congregacional' },
  { day: 'Dom', date: '2026-08-16', time: '06:30', endTime: '06:50', label: 'Activación Física' },
  { day: 'Dom', date: '2026-08-16', time: '06:50', endTime: '07:30', label: 'Aseo Personal' },
  { day: 'Dom', date: '2026-08-16', time: '07:30', endTime: '07:50', label: 'Apertura Conferencia I' },
  { day: 'Dom', date: '2026-08-16', time: '07:50', endTime: '08:10', label: 'Alabanza' },
  { day: 'Dom', date: '2026-08-16', time: '08:10', endTime: '09:00', label: 'Conferencia I – Noviazgo, Sexualidad y Proyecto de Vida' },
  { day: 'Dom', date: '2026-08-16', time: '09:00', endTime: '09:20', label: 'Receso' },
  { day: 'Dom', date: '2026-08-16', time: '09:20', endTime: '10:20', label: 'Trabajo por Facultades' },
  { day: 'Dom', date: '2026-08-16', time: '10:20', endTime: '10:40', label: 'Apertura Conferencia II' },
  { day: 'Dom', date: '2026-08-16', time: '10:40', endTime: '11:00', label: 'Alabanza' },
  { day: 'Dom', date: '2026-08-16', time: '11:00', endTime: '12:00', label: 'Conferencia II – Relaciones, Emociones y Decisiones que Transforman tu Futuro' },
  { day: 'Dom', date: '2026-08-16', time: '12:00', endTime: '13:00', label: 'Almuerzo' },
  { day: 'Dom', date: '2026-08-16', time: '13:00', endTime: '13:20', label: 'Apertura Cátedra Magistral III' },
  { day: 'Dom', date: '2026-08-16', time: '13:20', endTime: '13:40', label: 'Alabanza' },
  { day: 'Dom', date: '2026-08-16', time: '13:40', endTime: '15:00', label: 'Cátedra III – ¿Por qué el Cristianismo? Fundamentos de la Fe' },
  { day: 'Dom', date: '2026-08-16', time: '15:00', endTime: '15:20', label: 'Receso' },
  { day: 'Dom', date: '2026-08-16', time: '15:20', endTime: '16:30', label: 'Integración por Facultades' },
  { day: 'Dom', date: '2026-08-16', time: '16:30', endTime: '17:30', label: 'Cena' },
  { day: 'Dom', date: '2026-08-16', time: '17:30', endTime: '17:50', label: 'Apertura Servicio General' },
  { day: 'Dom', date: '2026-08-16', time: '17:50', endTime: '18:20', label: 'Alabanza' },
  { day: 'Dom', date: '2026-08-16', time: '18:20', endTime: '19:20', label: 'Conferencia III – Una Vida Rendida a Cristo' },
  { day: 'Dom', date: '2026-08-16', time: '19:20', endTime: '19:40', label: 'Ministración' },
  { day: 'Dom', date: '2026-08-16', time: '19:40', endTime: '20:20', label: 'Diario Espiritual y Ranking' },
  { day: 'Dom', date: '2026-08-16', time: '20:20', endTime: '21:00', label: 'Reunión por Facultades' },
  { day: 'Dom', date: '2026-08-16', time: '21:00', endTime: '23:59', label: 'Descanso' },
  // ── Lunes 17 ───────────────────────────────────────────────────
  { day: 'Lun', date: '2026-08-17', time: '06:00', endTime: '06:30', label: 'Devocional Congregacional' },
  { day: 'Lun', date: '2026-08-17', time: '06:30', endTime: '06:50', label: 'Activación Física' },
  { day: 'Lun', date: '2026-08-17', time: '06:50', endTime: '07:30', label: 'Organización de Habitaciones y Equipaje' },
  { day: 'Lun', date: '2026-08-17', time: '07:30', endTime: '07:50', label: 'Apertura Cátedra Magistral IV' },
  { day: 'Lun', date: '2026-08-17', time: '07:50', endTime: '08:10', label: 'Alabanza' },
  { day: 'Lun', date: '2026-08-17', time: '08:10', endTime: '09:30', label: 'Cátedra IV – Defendiendo tu Fe: Apologética Cristiana' },
  { day: 'Lun', date: '2026-08-17', time: '09:30', endTime: '10:00', label: 'Receso' },
  { day: 'Lun', date: '2026-08-17', time: '10:00', endTime: '10:15', label: 'Clausura Académica' },
  { day: 'Lun', date: '2026-08-17', time: '10:15', endTime: '11:40', label: 'Exposición de Proyectos por Facultades' },
  { day: 'Lun', date: '2026-08-17', time: '11:40', endTime: '12:00', label: 'Premiación y Clausura' },
  { day: 'Lun', date: '2026-08-17', time: '12:00', endTime: '13:00', label: 'Almuerzo' },
  { day: 'Lun', date: '2026-08-17', time: '13:00', endTime: '15:00', label: 'Bautismos, Piscina y Tiempo Libre' },
  { day: 'Lun', date: '2026-08-17', time: '15:00', endTime: '16:00', label: 'Organización Final y Equipaje' },
  { day: 'Lun', date: '2026-08-17', time: '16:00', endTime: '17:00', label: 'Regreso a Bogotá' },
];

function getCurrentActivityIndex(activities: typeof allActivities): number {
  const now = new Date();
  const retreatStart = new Date('2026-08-15T05:00:00');
  const retreatEnd = new Date('2026-08-17T17:00:00');

  if (now < retreatStart) return 0;
  if (now >= retreatEnd) return activities.length;

  for (let i = 0; i < activities.length; i++) {
    const act = activities[i];
    const start = new Date(`${act.date}T${act.time}`);
    const end = new Date(`${act.date}T${act.endTime}`);
    if (end <= start) end.setMinutes(end.getMinutes() + 30);

    if (now < start) return i;
    if (now >= start && now <= end) return i;
  }

  return activities.length;
}

const queLlevar = [
  { icon: 'book-outline', label: 'Biblia (física)' },
  { icon: 'document-text-outline', label: 'Cuaderno de apuntes' },
  { icon: 'create-outline', label: 'Esfero' },
  { icon: 'shirt-outline', label: 'Ropa cómoda 3 días' },
  { icon: 'cloudy-night-outline', label: 'Chaqueta para la noche' },
  { icon: 'water-outline', label: 'Implementos de aseo' },
  { icon: 'umbrella-outline', label: 'Toalla' },
  { icon: 'water-outline', label: 'Vestido de baño' },
  { icon: 'footsteps-outline', label: 'Sandalias' },
  { icon: 'walk-outline', label: 'Tenis' },
  { icon: 'sunny-outline', label: 'Protector solar' },
  { icon: 'baseball-cap-outline', label: 'Gorra' },
  { icon: 'medkit-outline', label: 'Medicamentos (si aplica)' },
  { icon: 'cafe-outline', label: 'Botella para agua' },
];

const recomendaciones = [
  { icon: 'time-outline', text: 'Llegar puntualmente al punto de encuentro.' },
  { icon: 'people-outline', text: 'Mantener siempre una actitud de respeto.' },
  { icon: 'football-outline', text: 'Participar en todas las actividades.' },
  { icon: 'home-outline', text: 'Cuidar las instalaciones.' },
  { icon: 'shield-checkmark-outline', text: 'Seguir las instrucciones del Staff.' },
  { icon: 'trash-outline', text: 'Mantener limpio el lugar.' },
  { icon: 'people-outline', text: 'Permanecer siempre con tu Facultad.' },
];

const duranteCatedras = [
  { icon: 'book-outline', text: 'Biblia' },
  { icon: 'document-text-outline', text: 'Cuaderno' },
  { icon: 'create-outline', text: 'Esfero' },
  { icon: 'phone-portrait-outline', text: 'Sin celular (para concentrarnos)' },
];

export function HomeScreen({ navigation }: HomeScreenProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const status = useRetreatStatus();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(() => getCurrentActivityIndex(allActivities));
  const hasStarted = status.hasStarted;

  const tick = useCallback(() => {
    setCurrentIndex(getCurrentActivityIndex(allActivities));
  }, []);

  useEffect(() => {
    const interval = setInterval(tick, 30000);
    return () => clearInterval(interval);
  }, [tick]);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16 }]}
      >
        {/* Header compacto */}
        <Animated.View entering={FadeInDown.delay(0).springify()} style={styles.header}>
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={[palette.darkBlue, palette.deepBlue]}
              style={styles.logoGradient}
            >
              <Text style={styles.logoText}>KC</Text>
            </LinearGradient>
          </View>
          <View style={styles.headerTextCol}>
            <Text style={[styles.title, { color: theme.colors.onSurface }]}>{RETIRO_NAME}</Text>
            <Text style={[styles.subtitle, { color: palette.gold }]}>{RETIRO_SUBTITLE}</Text>
            <View style={styles.verseContainer}>
              <Ionicons name="book-outline" size={12} color={palette.gold} />
              <Text style={[styles.verse, { color: theme.colors.onSurfaceVariant }]}>{RETIRO_VERSE}</Text>
            </View>
          </View>
        </Animated.View>

        {/* Countdown */}
        {!hasStarted && (
          <Animated.View entering={FadeInDown.delay(150).springify()} style={styles.countdownSection}>
            <CountdownTimer targetDate={RETIRO_START_DATE} />
          </Animated.View>
        )}

        {/* Schedule Wheel */}
        <Animated.View entering={FadeInDown.delay(250).springify()} style={styles.wheelSection}>
          <View style={styles.wheelHeader}>
            <Ionicons name="calendar-outline" size={16} color={palette.gold} />
            <Text style={[styles.wheelTitle, { color: theme.colors.onSurface }]}>
              {hasStarted ? 'Actividades' : 'Lo que viene'}
            </Text>
          </View>
          <ScheduleWheel
            activities={allActivities}
            currentIndex={currentIndex}
            hasStarted={hasStarted}
          />
        </Animated.View>

        {/* Código de Vestimenta */}
        <Animated.View entering={FadeInDown.delay(350).springify()} style={styles.section}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => toggleSection('vestimenta')}
            style={styles.sectionHeaderRow}
          >
            <Ionicons name="shirt-outline" size={20} color={palette.darkBlue} />
            <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>Código de Vestimenta</Text>
            <Ionicons
              name={expandedSection === 'vestimenta' ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={theme.colors.onSurfaceVariant}
              style={{ marginLeft: 'auto' }}
            />
          </TouchableOpacity>

          {expandedSection === 'vestimenta' && (
            <GlassCard elevation={2} style={styles.vestimentaCard}>
              <View style={styles.vestimentaRow}>
                <View style={[styles.vestimentaIcon, { backgroundColor: `${palette.darkBlue}15` }]}>
                  <Ionicons name="woman-outline" size={22} color={palette.darkBlue} />
                </View>
                <View style={styles.vestimentaInfo}>
                  <Text style={[styles.vestimentaLabel, { color: theme.colors.onSurface }]}>Chicas</Text>
                  <Text style={[styles.vestimentaText, { color: theme.colors.onSurfaceVariant }]}>
                    Para la piscina: camiseta y pantaloneta obligatorias. Nada de vestido de baño de dos piezas.
                  </Text>
                </View>
              </View>
              <View style={[styles.vestimentaDivider, { backgroundColor: theme.colors.outlineVariant }]} />
              <View style={styles.vestimentaRow}>
                <View style={[styles.vestimentaIcon, { backgroundColor: `${palette.darkBlue}15` }]}>
                  <Ionicons name="man-outline" size={22} color={palette.darkBlue} />
                </View>
                <View style={styles.vestimentaInfo}>
                  <Text style={[styles.vestimentaLabel, { color: theme.colors.onSurface }]}>Chicos</Text>
                  <Text style={[styles.vestimentaText, { color: theme.colors.onSurfaceVariant }]}>
                    Para la piscina: camiseta y pantaloneta obligatorias.
                  </Text>
                </View>
              </View>
            </GlassCard>
          )}
        </Animated.View>

        {/* ¿Qué debo llevar? */}
        <Animated.View entering={FadeInDown.delay(450).springify()} style={styles.section}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => toggleSection('llevar')}
            style={styles.sectionHeaderRow}
          >
            <Ionicons name="bag-check-outline" size={20} color={palette.gold} />
            <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>¿Qué debo llevar?</Text>
            <Ionicons
              name={expandedSection === 'llevar' ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={theme.colors.onSurfaceVariant}
              style={{ marginLeft: 'auto' }}
            />
          </TouchableOpacity>

          {expandedSection === 'llevar' && (
            <View style={styles.llevarGrid}>
              {queLlevar.map((item) => (
                <View key={item.label} style={styles.llevarItem}>
                  <View style={[styles.llevarIconBg, { backgroundColor: `${palette.gold}15` }]}>
                    <Ionicons name={item.icon as any} size={16} color={palette.gold} />
                  </View>
                  <Text style={[styles.llevarLabel, { color: theme.colors.onSurface }]}>{item.label}</Text>
                </View>
              ))}
            </View>
          )}
        </Animated.View>

        {/* Recomendaciones */}
        <Animated.View entering={FadeInDown.delay(550).springify()} style={styles.section}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => toggleSection('recomendaciones')}
            style={styles.sectionHeaderRow}
          >
            <Ionicons name="bulb-outline" size={20} color={palette.amber} />
            <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>Recomendaciones</Text>
            <Ionicons
              name={expandedSection === 'recomendaciones' ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={theme.colors.onSurfaceVariant}
              style={{ marginLeft: 'auto' }}
            />
          </TouchableOpacity>

          {expandedSection === 'recomendaciones' && (
            <View style={styles.recList}>
              {recomendaciones.map((rec) => (
                <View key={rec.text} style={styles.recItem}>
                  <View style={[styles.recIconBg, { backgroundColor: `${palette.amber}15` }]}>
                    <Ionicons name={rec.icon as any} size={16} color={palette.amber} />
                  </View>
                  <Text style={[styles.recText, { color: theme.colors.onSurface }]}>{rec.text}</Text>
                </View>
              ))}
            </View>
          )}
        </Animated.View>

        {/* Durante las Cátedras */}
        <Animated.View entering={FadeInDown.delay(650).springify()} style={styles.section}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => toggleSection('catedras')}
            style={styles.sectionHeaderRow}
          >
            <Ionicons name="school-outline" size={20} color={palette.darkBlue} />
            <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>Durante las Cátedras</Text>
            <Ionicons
              name={expandedSection === 'catedras' ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={theme.colors.onSurfaceVariant}
              style={{ marginLeft: 'auto' }}
            />
          </TouchableOpacity>

          {expandedSection === 'catedras' && (
            <GlassCard elevation={2} style={styles.catedrasCard}>
              <Text style={[styles.catedrasIntro, { color: theme.colors.onSurfaceVariant }]}>
                Llevar únicamente:
              </Text>
              <View style={styles.catedrasList}>
                {duranteCatedras.map((item) => (
                  <View key={item.text} style={styles.catedrasItem}>
                    <View style={[styles.catedrasIconBg, { backgroundColor: `${palette.darkBlue}15` }]}>
                      <Ionicons name={item.icon as any} size={16} color={palette.darkBlue} />
                    </View>
                    <Text style={[styles.catedrasText, { color: theme.colors.onSurface }]}>{item.text}</Text>
                  </View>
                ))}
              </View>
            </GlassCard>
          )}
        </Animated.View>

        {/* Info Importante */}
        <Animated.View entering={FadeInDown.delay(750).springify()} style={styles.section}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => toggleSection('infoExtra')}
            style={styles.sectionHeaderRow}
          >
            <Ionicons name="information-circle-outline" size={20} color={palette.amber} />
            <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>Info Importante</Text>
            <Ionicons
              name={expandedSection === 'infoExtra' ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={theme.colors.onSurfaceVariant}
              style={{ marginLeft: 'auto' }}
            />
          </TouchableOpacity>

          {expandedSection === 'infoExtra' && (
            <View style={styles.infoGrid}>
              <GlassCard elevation={1} style={styles.infoCard}>
                <Ionicons name="cafe-outline" size={22} color={palette.amber} />
                <Text style={[styles.infoTitle, { color: theme.colors.onSurface }]}>Ayuno</Text>
                <Text style={[styles.infoDesc, { color: theme.colors.onSurfaceVariant }]}>
                  Habrá momentos de ayuno voluntario. Si necesitas alimentarte por condición médica, avísanos.
                </Text>
              </GlassCard>
              <GlassCard elevation={1} style={styles.infoCard}>
                <Ionicons name="water-outline" size={22} color={palette.darkBlue} />
                <Text style={[styles.infoTitle, { color: theme.colors.onSurface }]}>Piscina</Text>
                <Text style={[styles.infoDesc, { color: theme.colors.onSurfaceVariant }]}>
                  Trae ropa de cambio, sandalias y toalla.
                </Text>
              </GlassCard>
              <GlassCard elevation={1} style={styles.infoCard}>
                <Ionicons name="document-text-outline" size={22} color={palette.amber} />
                <Text style={[styles.infoTitle, { color: theme.colors.onSurface }]}>Menores de edad</Text>
                <Text style={[styles.infoDesc, { color: theme.colors.onSurfaceVariant }]}>
                  Permiso firmado por tus padres + documento de la organización.
                </Text>
              </GlassCard>
              <GlassCard elevation={1} style={styles.infoCard}>
                <Ionicons name="chatbubble-ellipses-outline" size={22} color={palette.darkBlue} />
                <Text style={[styles.infoTitle, { color: theme.colors.onSurface }]}>¿Dudas?</Text>
                <Text style={[styles.infoDesc, { color: theme.colors.onSurfaceVariant }]}>
                  Contacta al equipo organizador antes del retiro.
                </Text>
              </GlassCard>
            </View>
          )}
        </Animated.View>

        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 32 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  logoContainer: {
    shadowColor: palette.darkBlue,
    shadowOpacity: 0.3,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  logoGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: '800',
    color: palette.gold,
    letterSpacing: 1,
  },
  headerTextCol: { flex: 1, gap: 1 },
  title: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  verseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  verse: { fontSize: 11, fontWeight: '500', fontStyle: 'italic' },
  countdownSection: { paddingHorizontal: 20, marginTop: 4 },
  wheelSection: { marginTop: 12, paddingHorizontal: 16 },
  wheelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  wheelTitle: { fontSize: 15, fontWeight: '700' },
  section: { marginTop: 20, paddingHorizontal: 20 },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', letterSpacing: -0.3 },
  // Vestimenta
  vestimentaCard: { padding: 16, gap: 0 },
  vestimentaRow: { flexDirection: 'row', gap: 12, paddingVertical: 8 },
  vestimentaIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vestimentaInfo: { flex: 1, gap: 2 },
  vestimentaLabel: { fontSize: 15, fontWeight: '700' },
  vestimentaText: { fontSize: 13, lineHeight: 18 },
  vestimentaDivider: { height: 1, marginVertical: 4, marginLeft: 52 },
  // Qué llevar
  llevarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 0,
  },
  llevarItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 7,
    paddingRight: 8,
  },
  llevarIconBg: {
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  llevarLabel: { fontSize: 13, fontWeight: '500', flex: 1 },
  // Recomendaciones
  recList: { gap: 2 },
  recItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 7,
  },
  recIconBg: {
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recText: { fontSize: 14, fontWeight: '500', flex: 1 },
  // Cátedras
  catedrasCard: { padding: 16 },
  catedrasIntro: { fontSize: 13, fontWeight: '600', marginBottom: 8 },
  catedrasList: { gap: 4 },
  catedrasItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 5,
  },
  catedrasIconBg: {
    width: 28,
    height: 28,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  catedrasText: { fontSize: 14, fontWeight: '500' },
  // Info extra
  infoGrid: { gap: 10 },
  infoCard: { padding: 14, gap: 4 },
  infoTitle: { fontSize: 15, fontWeight: '700' },
  infoDesc: { fontSize: 12, lineHeight: 17 },
});
