import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  MainTabs: undefined;
  Recomendaciones: undefined;
  Ubicacion: undefined;
};

export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;
