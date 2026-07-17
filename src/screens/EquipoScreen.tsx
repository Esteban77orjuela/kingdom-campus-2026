import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { TeamCard } from '../components/TeamCard';
import teamData from '../data/team.json';

const roleOrder = [
  'Pastor',
  'Director General',
  'Conferencista',
  'Coordinador',
  'Líder',
  'Bienestar',
  'Facilitador',
  'Equipo',
  'Apertura',
  'Staff',
];

function getGroup(role: string): string {
  if (role.includes('Pastor')) return 'Pastoral';
  if (role.includes('Director')) return 'Dirección';
  if (role.includes('Conferencista')) return 'Conferencistas';
  if (role.includes('Coordinador')) return 'Coordinación';
  if (role.includes('Líder')) return 'Liderazgo';
  if (role.includes('Bienestar')) return 'Bienestar';
  if (role.includes('Facilitador')) return 'Facilitación';
  if (role.includes('Medios')) return 'Equipo de Medios';
  if (role.includes('Apertura') || role.includes('Staff')) return 'Staff General';
  return 'Staff General';
}

function groupedTeam() {
  const groups: Record<string, typeof teamData> = {};
  teamData.forEach((m) => {
    const g = getGroup(m.role);
    if (!groups[g]) groups[g] = [];
    groups[g].push(m);
  });
  return groups;
}

const groupIcons: Record<string, string> = {
  'Dirección': 'shield-checkmark-outline',
  'Pastoral': 'church-outline',
  'Conferencistas': 'mic-outline',
  'Coordinación': 'git-network-outline',
  'Liderazgo': 'musical-notes-outline',
  'Bienestar': 'heart-outline',
  'Facilitación': 'people-outline',
  'Equipo de Medios': 'camera-outline',
  'Staff General': 'hand-left-outline',
};

const groupColors: Record<string, string> = {
  'Pastoral': '#4A148C',
  'Conferencistas': '#C9A84C',
  'Coordinación': '#C9A84C',
  'Liderazgo': '#FF8F00',
  'Bienestar': '#D32F2F',
  'Facilitación': '#7B1FA2',
  'Equipo de Medios': '#01579B',
  'Staff General': '#388E3C',
};

export function EquipoScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const groups = groupedTeam();
  const groupKeys = Object.keys(groups);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 100 }}
      >
        <View style={styles.header}>
          <View style={styles.headerAccent}>
            <View style={[styles.accentDot, { backgroundColor: theme.colors.primary }]} />
            <View style={[styles.accentLine, { backgroundColor: `${theme.colors.primary}30` }]} />
          </View>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>Equipo</Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Conoce a quienes hacen esto posible
          </Text>
        </View>

        {groupKeys.map((group, gi) => {
          const groupColor = group === 'Dirección' ? theme.colors.primary : (groupColors[group] || theme.colors.primary);
          return (
          <Animated.View key={group} entering={FadeInDown.delay(gi * 80).springify()}>
            <View style={styles.groupHeader}>
              <View style={[styles.groupIconBg, { backgroundColor: `${groupColor}18` }]}>
                <Ionicons name={groupIcons[group] as any} size={16} color={groupColor} />
              </View>
              <Text style={[styles.groupTitle, { color: theme.colors.onSurface }]}>{group}</Text>
              <View style={[styles.groupLine, { backgroundColor: `${groupColor}25` }]} />
            </View>
            {groups[group].map((member, mi) => (
              <Animated.View key={member.id} entering={FadeInDown.delay(gi * 80 + mi * 40).springify()}>
                <TeamCard
                  name={member.name}
                  role={member.role}
                  color={member.color}
                  description={member.description}
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
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
  },
  groupIconBg: {
    width: 30,
    height: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupTitle: { fontSize: 16, fontWeight: '700' },
  groupLine: { flex: 1, height: 1 },
});
