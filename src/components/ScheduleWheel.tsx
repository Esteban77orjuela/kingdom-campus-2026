import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { palette } from '../theme';

const ITEM_H = 72;
const VISIBLE_ITEMS = 3;
const WHEEL_H = ITEM_H * VISIBLE_ITEMS;

interface WheelData {
  day: string;
  date: string;
  time: string;
  endTime: string;
  label: string;
}

interface Props {
  activities: WheelData[];
  currentIndex: number;
  hasStarted: boolean;
}

export function ScheduleWheel({ activities, currentIndex, hasStarted }: Props) {
  const theme = useTheme();
  const ended = currentIndex >= activities.length;

  // Fórmula: mover la tira para que el item[currentIndex] quede en el slot del medio (slot 1 de 3)
  // El centro del slot 1 está en y = ITEM_H (la altura de 1 item desde el top del área)
  // El top del item[currentIndex] dentro de la tira está en y = currentIndex * ITEM_H
  // Por tanto translateY = ITEM_H - currentIndex * ITEM_H = ITEM_H * (1 - currentIndex)
  const getTargetY = (idx: number) =>
    idx >= activities.length
      ? -(activities.length * ITEM_H)
      : ITEM_H * (1 - idx);

  // Inicializar directamente en la posición correcta (sin animación inicial de ida y vuelta)
  const scrollY = useRef(new Animated.Value(getTargetY(currentIndex))).current;

  useEffect(() => {
    Animated.spring(scrollY, {
      toValue: getTargetY(currentIndex),
      damping: 22,
      stiffness: 140,
      mass: 1,
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);

  if (ended) {
    return (
      <View style={styles.endedBox}>
        <Ionicons name="checkmark-circle" size={30} color={palette.success} />
        <Text style={styles.endedText}>¡Retiro Finalizado!</Text>
      </View>
    );
  }

  const current = activities[currentIndex];
  const dayLabel =
    current.day === 'Sáb' ? 'SÁB 15' :
    current.day === 'Dom' ? 'DOM 16' : 'LUN 17';

  return (
    <View style={styles.wrapper}>

      {/* Fila superior: pill del día + estado */}
      <View style={styles.topRow}>
        <View style={[styles.dayPill, { backgroundColor: palette.darkBlue }]}>
          <Text style={styles.dayPillText}>{dayLabel}</Text>
        </View>
        <View style={styles.statusRow}>
          <View style={[
            styles.statusDot,
            { backgroundColor: hasStarted ? palette.success : palette.gold }
          ]} />
          <Text style={[
            styles.statusText,
            { color: hasStarted ? palette.success : palette.gold }
          ]}>
            {hasStarted ? 'En curso' : 'Próximo'}
          </Text>
        </View>
      </View>

      {/* Área de la ruleta */}
      <View style={{ height: WHEEL_H, overflow: 'hidden', position: 'relative' }}>

        {/* Degradado superior: mezcla con el fondo para el efecto de fade */}
        <LinearGradient
          colors={[theme.colors.background, 'transparent']}
          style={[StyleSheet.absoluteFill, { bottom: undefined, height: ITEM_H }]}
          pointerEvents="none"
        />
        {/* Degradado inferior */}
        <LinearGradient
          colors={['transparent', theme.colors.background]}
          style={[StyleSheet.absoluteFill, { top: undefined, height: ITEM_H }]}
          pointerEvents="none"
        />

        {/* Tira deslizante */}
        <Animated.View style={{ transform: [{ translateY: scrollY }] }}>
          {activities.map((item, i) => {
            const dist = Math.abs(i - currentIndex);
            // Solo mostramos 1 item arriba y 1 abajo del actual (distancia máx 1)
            const isCenter = dist === 0;
            const isAdjacent = dist === 1;
            const opacity = isCenter ? 1 : isAdjacent ? 0.32 : 0;

            return (
              <View
                key={`${item.date}-${item.time}`}
                style={[
                  styles.item,
                  {
                    height: ITEM_H,
                    opacity,
                    transform: [{ scale: isCenter ? 1 : 0.86 }],
                  },
                ]}
              >
                {/* Hora */}
                <Text style={[
                  styles.timeText,
                  isCenter && styles.timeTextCenter,
                  { color: isCenter ? palette.darkBlue : theme.colors.onSurfaceVariant },
                ]}>
                  {item.time}
                </Text>

                {/* Nombre de la actividad + badge */}
                <View style={styles.itemRight}>
                  <Text
                    style={[
                      styles.actText,
                      isCenter && styles.actTextCenter,
                      { color: isCenter ? theme.colors.onSurface : theme.colors.onSurfaceVariant },
                    ]}
                    numberOfLines={2}
                  >
                    {item.label}
                  </Text>

                  {isCenter && (
                    <View style={[
                      styles.badge,
                      {
                        backgroundColor: hasStarted
                          ? `${palette.success}18`
                          : `${palette.gold}18`,
                      },
                    ]}>
                      <View style={[
                        styles.badgeDot,
                        { backgroundColor: hasStarted ? palette.success : palette.gold },
                      ]} />
                      <Text style={[
                        styles.badgeLabel,
                        { color: hasStarted ? palette.success : palette.gold },
                      ]}>
                        {hasStarted ? 'Ahora' : 'Próximo'}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 10,
  },

  // Fila superior
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  dayPill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  dayPillText: {
    color: palette.white,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },

  // Items de la tira
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    gap: 14,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
    width: 46,
    textAlign: 'right',
  },
  timeTextCenter: {
    fontSize: 16,
    fontWeight: '800',
  },
  itemRight: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  actText: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 17,
  },
  actTextCenter: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 19,
  },

  // Badge "Ahora" / "Próximo"
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  badgeLabel: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Estado "Finalizado"
  endedBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 24,
  },
  endedText: {
    fontSize: 17,
    fontWeight: '800',
    color: palette.success,
  },
});
