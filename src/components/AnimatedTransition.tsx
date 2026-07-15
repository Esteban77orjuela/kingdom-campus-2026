import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';

interface AnimatedTransitionProps {
  children: React.ReactNode;
  delay?: number;
}

export function AnimatedTransition({ children, delay = 0 }: AnimatedTransitionProps) {
  return (
    <Animated.View
      entering={FadeInDown.delay(delay).duration(400).springify().damping(20)}
      exiting={FadeOutUp.duration(200)}
      style={styles.container}
    >
      {children}
    </Animated.View>
  );
}

interface AnimatedListProps {
  children: React.ReactNode;
  index: number;
}

export function AnimatedListItem({ children, index }: AnimatedListProps) {
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 80).duration(350).springify()}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
