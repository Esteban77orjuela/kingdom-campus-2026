import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRetreatStatus } from '../hooks/useRetreatStatus';
import { CountdownTimer } from '../components/CountdownTimer';
import { ScheduleWheel } from '../components/ScheduleWheel';
import { GlassCard } from '../components/GlassCard';
import { palette } from '../theme';
import { RETIRO_START_DATE, RETIRO_END_DATE, RETIRO_NAME, RETIRO_SUBTITLE, RETIRO_VERSE, RETIRO_VERSE_TEXT } from '../utils/constants';
import { ActivityData, getCurrentActivityIndex, isActivityInProgress } from '../utils/scheduleLogic';

interface HomeScreenProps {
  navigation: any;
}

const allActivities: ActivityData[] = [
  // ── Sábado 15 ──
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
  { day: 'Sáb', date: '2026-08-15', time: '14:30', endTime: '16:00', label: 'Cátedra II – Comportamiento Cristiano' },
  { day: 'Sáb', date: '2026-08-15', time: '16:00', endTime: '17:30', label: 'Piscina e Integración' },
  { day: 'Sáb', date: '2026-08-15', time: '17:30', endTime: '18:00', label: 'Aseo personal' },
  { day: 'Sáb', date: '2026-08-15', time: '18:00', endTime: '19:00', label: 'Cena' },
  { day: 'Sáb', date: '2026-08-15', time: '19:00', endTime: '19:30', label: 'Apertura Servicio General' },
  { day: 'Sáb', date: '2026-08-15', time: '19:30', endTime: '20:30', label: 'Servicio General y Palabra' },
  { day: 'Sáb', date: '2026-08-15', time: '20:30', endTime: '21:15', label: 'Diario Espiritual y Ranking' },
  { day: 'Sáb', date: '2026-08-15', time: '21:15', endTime: '22:00', label: 'Reunión por Facultades' },
  { day: 'Sáb', date: '2026-08-15', time: '22:00', endTime: '23:00', label: 'Descanso' },
  // ── Domingo 16 ──
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
  { day: 'Dom', date: '2026-08-16', time: '11:00', endTime: '12:00', label: 'Conferencia II – Relaciones, Emociones y Decisiones' },
  { day: 'Dom', date: '2026-08-16', time: '12:00', endTime: '13:00', label: 'Almuerzo' },
  { day: 'Dom', date: '2026-08-16', time: '13:00', endTime: '13:20', label: 'Apertura Cátedra Magistral III' },
  { day: 'Dom', date: '2026-08-16', time: '13:20', endTime: '13:40', label: 'Alabanza' },
  { day: 'Dom', date: '2026-08-16', time: '13:40', endTime: '15:00', label: 'Cátedra III – ¿Por qué el Cristianismo?' },
  { day: 'Dom', date: '2026-08-16', time: '15:00', endTime: '15:20', label: 'Receso' },
  { day: 'Dom', date: '2026-08-16', time: '15:20', endTime: '16:30', label: 'Integración por Facultades' },
  { day: 'Dom', date: '2026-08-16', time: '16:30', endTime: '17:30', label: 'Cena' },
  { day: 'Dom', date: '2026-08-16', time: '17:30', endTime: '17:50', label: 'Apertura Servicio General' },
  { day: 'Dom', date: '2026-08-16', time: '17:50', endTime: '18:20', label: 'Alabanza' },
  { day: 'Dom', date: '2026-08-16', time: '18:20', endTime: '19:20', label: 'Conferencia III – Una Vida Rendida a Cristo' },
  { day: 'Dom', date: '2026-08-16', time: '19:20', endTime: '19:40', label: 'Ministración' },
  { day: 'Dom', date: '2026-08-16', time: '19:40', endTime: '20:20', label: 'Diario Espiritual y Ranking' },
  { day: 'Dom', date: '2026-08-16', time: '20:20', endTime: '21:00', label: 'Reunión por Facultades' },
  { day: 'Dom', date: '2026-08-16', time: '21:00', endTime: '22:00', label: 'Descanso' },
  // ── Lunes 17 ──
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

  const [currentIndex, setCurrentIndex] = useState(() => getCurrentActivityIndex(allActivities, RETIRO_START_DATE, RETIRO_END_DATE));
  const hasStarted = status.hasStarted;
  const hasEnded = status.hasEnded;

  const currentAct = allActivities[currentIndex];
  const isCurrentOngoing = hasStarted && currentAct ? isActivityInProgress(currentAct) : false;

  const tick = useCallback(() => {
    setCurrentIndex(getCurrentActivityIndex(allActivities, RETIRO_START_DATE, RETIRO_END_DATE));
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
        {/* Header con logo */}
        <Animated.View entering={FadeInDown.delay(0).springify()} style={styles.header}>
          <View style={styles.logoShadow}>
            <Image
              source={require('../../assets/images/Logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>{RETIRO_NAME}</Text>
          <Text style={[styles.subtitle, { color: palette.gold }]}>{RETIRO_SUBTITLE}</Text>
          <View style={styles.verseContainer}>
            <Ionicons name="book-outline" size={14} color={palette.gold} />
            <Text style={[styles.verse, { color: theme.colors.onSurfaceVariant }]}>{RETIRO_VERSE}</Text>
          </View>
        </Animated.View>

        {/* Countdown */}
        {!hasStarted && (
          <Animated.View entering={FadeInDown.delay(150).springify()} style={styles.countdownSection}>
            <CountdownTimer targetDate={RETIRO_START_DATE} />
          </Animated.View>
        )}

        {/* Mensaje de cierre */}
        {hasEnded && (
          <Animated.View entering={FadeInDown.delay(150).springify()} style={styles.closingSection}>
            <View style={styles.closingCard}>
              <Ionicons name="heart" size={36} color={palette.gold} />
              <Text style={[styles.closingTitle, { color: theme.colors.onSurface }]}>
                ¡Gracias por vivir el{'\n'}Kingdom Campus 2026!
              </Text>
              <Text style={[styles.closingSubtitle, { color: palette.gold }]}>Contra Corriente</Text>
              <View style={[styles.closingDivider, { backgroundColor: theme.colors.outlineVariant }]} />
              <Text style={[styles.closingVerse, { color: theme.colors.onSurfaceVariant }]}>
                {RETIRO_VERSE_TEXT}
              </Text>
              <Text style={[styles.closingRef, { color: theme.colors.onSurfaceVariant }]}>{RETIRO_VERSE}</Text>
              <View style={[styles.closingDivider, { backgroundColor: theme.colors.outlineVariant }]} />
              <Text style={[styles.closingBlessing, { color: theme.colors.onSurface }]}>
                Que el Señor los siga transformando y guiando{'\n'}en todo su caminar.
              </Text>
              <View style={styles.closingIcons}>
                <Ionicons name="leaf-outline" size={18} color={palette.amber} />
                <Ionicons name="star-outline" size={18} color={palette.gold} />
                <Ionicons name="leaf-outline" size={18} color={palette.amber} />
              </View>
            </View>
          </Animated.View>
        )}

        {/* Schedule Wheel */}
        {!hasEnded && (
          <Animated.View entering={FadeInDown.delay(250).springify()} style={styles.wheelSection}>
            <ScheduleWheel
              activities={allActivities}
              currentIndex={currentIndex}
              isCurrentOngoing={isCurrentOngoing}
            />
          </Animated.View>
        )}

        {/* Secciones colapsables */}
        {([
          { key: 'vestimenta', icon: 'shirt-outline' as const, color: palette.darkBlue, title: 'Código de Vestimenta' },
          { key: 'llevar', icon: 'bag-check-outline' as const, color: palette.gold, title: '¿Qué debo llevar?' },
          { key: 'recomendaciones', icon: 'bulb-outline' as const, color: palette.amber, title: 'Recomendaciones' },
          { key: 'catedras', icon: 'school-outline' as const, color: palette.darkBlue, title: 'Durante las Cátedras' },
          { key: 'infoExtra', icon: 'information-circle-outline' as const, color: palette.amber, title: 'Info Importante' },
        ] as const).map(({ key, icon, color, title }, idx) => (
          <Animated.View key={key} entering={FadeInDown.delay(350 + idx * 100).springify()} style={styles.sectionOuter}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => toggleSection(key)}
              style={[styles.sectionHeader, { backgroundColor: `${color}0D` }]}
            >
              <View style={[styles.sectionHeaderIcon, { backgroundColor: `${color}18` }]}>
                <Ionicons name={icon} size={18} color={color} />
              </View>
              <Text style={[styles.sectionHeaderTitle, { color: theme.colors.onSurface }]}>{title}</Text>
              <Ionicons
                name={expandedSection === key ? 'chevron-up' : 'chevron-down'}
                size={18}
                color={theme.colors.onSurfaceVariant}
                style={{ marginLeft: 'auto' }}
              />
            </TouchableOpacity>

            {expandedSection === key && key === 'vestimenta' && (
              <GlassCard elevation={2} style={styles.vestimentaCard}>
                <Text style={[styles.vestimentaSectionLabel, { color: theme.colors.onSurfaceVariant }]}>General</Text>
                <View style={styles.genderRow}>
                  <View style={[styles.genderDot, { backgroundColor: '#E91E63' }]} />
                  <View style={styles.genderContent}>
                    <Text style={[styles.genderLabel, { color: theme.colors.onSurface }]}>Chicas</Text>
                    <Text style={[styles.genderText, { color: theme.colors.onSurfaceVariant }]}>
                      Vestimenta modesta y cómoda: evitar escotes pronunciados, ropa demasiado ajustada o shorts muy cortos.
                    </Text>
                  </View>
                </View>
                <View style={[styles.genderDivider, { backgroundColor: theme.colors.outlineVariant }]} />
                <View style={styles.genderRow}>
                  <View style={[styles.genderDot, { backgroundColor: palette.darkBlue }]} />
                  <View style={styles.genderContent}>
                    <Text style={[styles.genderLabel, { color: theme.colors.onSurface }]}>Chicos</Text>
                    <Text style={[styles.genderText, { color: theme.colors.onSurfaceVariant }]}>
                      Vestimenta cómoda y respetuosa: evitar camisetas con mensajes inapropiados.
                    </Text>
                  </View>
                </View>

                <View style={[styles.vestimentaDivider, { backgroundColor: theme.colors.outlineVariant }]} />

                <Text style={[styles.vestimentaSectionLabel, { color: theme.colors.onSurfaceVariant }]}>Para la piscina</Text>
                <View style={styles.genderRow}>
                  <View style={[styles.genderDot, { backgroundColor: '#E91E63' }]} />
                  <View style={styles.genderContent}>
                    <Text style={[styles.genderLabel, { color: theme.colors.onSurface }]}>Chicas</Text>
                    <Text style={[styles.genderText, { color: theme.colors.onSurfaceVariant }]}>
                      Vestido de baño tipo enterizo, o camiseta con pantaloneta.
                    </Text>
                  </View>
                </View>
                <View style={[styles.genderDivider, { backgroundColor: theme.colors.outlineVariant }]} />
                <View style={styles.genderRow}>
                  <View style={[styles.genderDot, { backgroundColor: palette.darkBlue }]} />
                  <View style={styles.genderContent}>
                    <Text style={[styles.genderLabel, { color: theme.colors.onSurface }]}>Chicos</Text>
                    <Text style={[styles.genderText, { color: theme.colors.onSurfaceVariant }]}>
                      Camiseta y pantaloneta.
                    </Text>
                  </View>
                </View>
              </GlassCard>
            )}

            {expandedSection === key && key === 'llevar' && (
              <View style={styles.itemsGrid}>
                {queLlevar.map((item) => (
                  <View key={item.label} style={styles.itemBox}>
                    <View style={[styles.itemIconBg, { backgroundColor: `${palette.gold}18` }]}>
                      <Ionicons name={item.icon as any} size={18} color={palette.gold} />
                    </View>
                    <Text style={[styles.itemLabel, { color: theme.colors.onSurface }]}>{item.label}</Text>
                  </View>
                ))}
              </View>
            )}

            {expandedSection === key && key === 'recomendaciones' && (
              <GlassCard elevation={2} style={styles.contentCard}>
                {recomendaciones.map((rec) => (
                  <View key={rec.text} style={styles.recRow}>
                    <View style={[styles.recDot, { backgroundColor: palette.amber }]} />
                    <Text style={[styles.recText, { color: theme.colors.onSurface }]}>{rec.text}</Text>
                  </View>
                ))}
              </GlassCard>
            )}

            {expandedSection === key && key === 'catedras' && (
              <GlassCard elevation={2} style={styles.contentCard}>
                <Text style={[styles.catedrasIntro, { color: theme.colors.onSurfaceVariant }]}>
                  Llevar únicamente:
                </Text>
                {duranteCatedras.map((item) => (
                  <View key={item.text} style={styles.recRow}>
                    <View style={[styles.itemIconBgSm, { backgroundColor: `${palette.darkBlue}18` }]}>
                      <Ionicons name={item.icon as any} size={14} color={palette.darkBlue} />
                    </View>
                    <Text style={[styles.recText, { color: theme.colors.onSurface }]}>{item.text}</Text>
                  </View>
                ))}
              </GlassCard>
            )}

            {expandedSection === key && key === 'infoExtra' && (
              <View style={styles.infoGrid}>
                {[
                  { icon: 'cafe-outline' as const, color: palette.amber, title: 'Ayuno', desc: 'Habrá momentos de ayuno voluntario. Si necesitas alimentarte por condición médica, avísanos.' },
                  { icon: 'water-outline' as const, color: palette.darkBlue, title: 'Piscina', desc: 'Trae ropa de cambio, sandalias y toalla.' },
                  { icon: 'document-text-outline' as const, color: palette.amber, title: 'Menores de edad', desc: 'Permiso firmado por tus padres + documento de la organización.' },
                  { icon: 'chatbubble-ellipses-outline' as const, color: palette.darkBlue, title: '¿Dudas?', desc: 'Contacta al equipo organizador antes del retiro.' },
                ].map((card) => (
                  <GlassCard key={card.title} elevation={1} style={styles.infoCard}>
                    <View style={[styles.infoIconBg, { backgroundColor: `${card.color}18` }]}>
                      <Ionicons name={card.icon} size={20} color={card.color} />
                    </View>
                    <Text style={[styles.infoTitle, { color: theme.colors.onSurface }]}>{card.title}</Text>
                    <Text style={[styles.infoDesc, { color: theme.colors.onSurfaceVariant }]}>{card.desc}</Text>
                  </GlassCard>
                ))}
              </View>
            )}
          </Animated.View>
        ))}

        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 32 },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 6,
  },
  logoShadow: {
    shadowColor: palette.gold,
    shadowOpacity: 0.4,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 4 },
    elevation: 12,
  },
  logo: {
    width: 130,
    height: 130,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  verseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  verse: { fontSize: 12, fontWeight: '500', fontStyle: 'italic' },
  countdownSection: { paddingHorizontal: 20, marginTop: 4 },
  closingSection: { paddingHorizontal: 20, marginTop: 8 },
  closingCard: {
    alignItems: 'center',
    padding: 28,
    borderRadius: 20,
    backgroundColor: `${palette.gold}0A`,
    gap: 12,
  },
  closingTitle: { fontSize: 20, fontWeight: '800', textAlign: 'center', lineHeight: 26 },
  closingSubtitle: { fontSize: 13, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase' },
  closingDivider: { height: 1, width: '60%', marginVertical: 4 },
  closingVerse: { fontSize: 14, fontWeight: '500', fontStyle: 'italic', textAlign: 'center', lineHeight: 20 },
  closingRef: { fontSize: 12, fontWeight: '600' },
  closingBlessing: { fontSize: 14, fontWeight: '600', textAlign: 'center', lineHeight: 20 },
  closingIcons: { flexDirection: 'row', gap: 12, marginTop: 4 },
  wheelSection: { marginTop: 8, paddingHorizontal: 16 },
  // Secciones colapsables
  sectionOuter: { marginTop: 16, paddingHorizontal: 20 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
  },
  sectionHeaderIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeaderTitle: { fontSize: 16, fontWeight: '700', letterSpacing: -0.2 },
  contentCard: { padding: 16, gap: 0, marginTop: 8 },
  // Vestimenta
  vestimentaCard: { padding: 16, gap: 0, marginTop: 8 },
  vestimentaSectionLabel: { fontSize: 12, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 },
  genderRow: { flexDirection: 'row', gap: 12, paddingVertical: 8 },
  genderDot: { width: 8, height: 8, borderRadius: 4, marginTop: 6 },
  genderContent: { flex: 1, gap: 2 },
  genderLabel: { fontSize: 15, fontWeight: '700' },
  genderText: { fontSize: 13, lineHeight: 18 },
  genderDivider: { height: 1, marginVertical: 4, marginLeft: 20 },
  vestimentaDivider: { height: 1, marginVertical: 8 },
  // Qué llevar
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8,
  },
  itemBox: {
    width: '46%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: `${palette.gold}0A`,
  },
  itemIconBg: {
    width: 32,
    height: 32,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemLabel: { fontSize: 13, fontWeight: '600', flex: 1 },
  itemIconBgSm: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Recomendaciones
  recRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
  },
  recDot: { width: 6, height: 6, borderRadius: 3 },
  recText: { fontSize: 14, fontWeight: '500', flex: 1 },
  // Cátedras
  catedrasIntro: { fontSize: 13, fontWeight: '600', marginBottom: 8 },
  // Info extra
  infoGrid: { gap: 10, marginTop: 8 },
  infoCard: { padding: 14, gap: 6 },
  infoIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  infoTitle: { fontSize: 15, fontWeight: '700' },
  infoDesc: { fontSize: 12, lineHeight: 17 },
});
