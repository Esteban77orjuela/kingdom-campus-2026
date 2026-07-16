# Kingdom Campus 2026 — Contra Corriente

Aplicación móvil oficial del retiro juvenil **Kingdom Campus 2026**, basado en Romanos 12:2.
Diseñada para los participantes del retiro, con información clara y en tiempo real.

## Tecnologías

- **React Native** 0.81.5
- **Expo** SDK 54
- **TypeScript** 5.3
- **React Navigation** 7.x (Bottom Tabs + Stack)
- **React Native Paper** (Material Design 3)
- **React Native Reanimated** (animaciones)

## Requisitos

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- Expo Go (Android Play Store) — SDK 54

## Instalación y ejecución

```bash
cd KingdomCampus
npm install
npx expo start
```

Escanea el código QR con Expo Go en tu celular.

## Estructura del proyecto

```
KingdomCampus/
├── docs/                  # Documentación y plan de desarrollo
├── src/
│   ├── components/        # Componentes reutilizables
│   ├── data/              # Datos del retiro en JSON
│   ├── hooks/             # Hooks personalizados
│   ├── navigation/        # Navegación (tabs + stack)
│   ├── screens/           # Pantallas de la app
│   ├── theme/             # Colores, paleta, tema MD3
│   └── utils/             # Constantes y utilidades
├── App.tsx                # Punto de entrada
├── app.json               # Configuración de Expo
├── babel.config.js
├── tsconfig.json
└── package.json
```

## Funcionalidades

- **Contador regresivo** al inicio del retiro
- **Ruleta de actividades** con animación en vivo
- **Conferencias y Cátedras** con descripción y horarios
- **Equipo organizador** con roles
- **Recomendaciones** y código de vestimenta
- **Ubicación** del evento

## Licencia

Uso privado — Kingdom Campus 2026.
