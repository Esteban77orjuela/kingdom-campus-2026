import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

interface StatusBadgeProps {
  status: 'upcoming' | 'ongoing' | 'completed';
  size?: 'small' | 'medium';
}

const statusConfig = {
  upcoming: { label: 'Próxima', bgColor: '#E3F2FD', textColor: '#1565C0', dotColor: '#1565C0' },
  ongoing: { label: 'En Curso', bgColor: '#E8F5E9', textColor: '#2E7D32', dotColor: '#2E7D32' },
  completed: { label: 'Finalizada', bgColor: '#F5F5F5', textColor: '#757575', dotColor: '#9E9E9E' },
};

export function StatusBadge({ status, size = 'medium' }: StatusBadgeProps) {
  const config = statusConfig[status];
  const isSmall = size === 'small';

  return (
    <View style={[styles.badge, { backgroundColor: config.bgColor }, isSmall && styles.smallBadge]}>
      <View style={[styles.dot, { backgroundColor: config.dotColor }, isSmall && styles.smallDot]} />
      <Text
        style={[
          styles.label,
          { color: config.textColor },
          isSmall && styles.smallLabel,
        ]}
      >
        {config.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  smallBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  smallDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
  smallLabel: {
    fontSize: 11,
  },
});
