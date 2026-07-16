# Kingdom Campus 2026 — Plan de Desarrollo

## Visión del Producto

**¿Qué problema resuelve?**
Una aplicación móvil para que los participantes del retiro Kingdom Campus 2026 tengan acceso rápido a: cronograma de actividades, información de conferencias y cátedras, equipo organizador, recomendaciones, ubicación y código de vestimenta — todo en un solo lugar, sin papel, sin redes sociales.

**¿Quién lo usará?**
Jóvenes de 15–30 años que asisten al retiro. Usuarios no técnicos que necesitan información clara, visual y rápida.

**Objetivo de negocio:**
Entregar una experiencia digital que acompañe al participante desde antes del retiro (countdown, qué llevar) hasta el final (cronograma en vivo).

**Valor que entrega:**
- Reducción de incertidumbre (saben qué llevar, qué hacer, a qué hora)
- Engagement antes y durante el retiro (countdown, ruleta de actividades)
- Profesionalismo (la organización se percibe seria y preparada)

---

## Fases aplicadas al proyecto

### Fase 0 — Visión (completada)
- Definición del problema y público objetivo
- Stack tecnológico definido: React Native + Expo SDK 54
- Diseño visual definido: Material Design 3 con paleta personalizada

### Fase 1 — Requerimientos (completada)
- Funcionales: contador regresivo, ruleta de actividades, conferencias, cátedras, equipo, recomendaciones, ubicación
- No funcionales: tiempo real (countdown), animaciones fluidas, offline first (datos locales)

### Fase 2 — Arquitectura (completada)
- Arquitectura: Frontend mobile (SPA nativa), datos en JSON local (preparado para migrar a API/REST)
- Principios: KISS, Separation of Concerns (data / components / screens / hooks / navigation / theme)
- Estructura de carpetas profesional

### Fase 3 — Diseño Técnico (completada)
- Navegación: Bottom Tabs + Stack
- Componentes reutilizables (GlassCard, ConferenceCard, etc.)
- Datos separados en archivos JSON (src/data/)
- Hooks personalizados (useRetreatStatus, useCurrentActivity, etc.)

### Fase 4 — Desarrollo (en progreso)
- Estándares: Clean Code, TypeScript estricto
- Control: Git + GitHub (rama main)
- No hay comentarios IA visibles

### Fase 5 — Base de Datos (no aplica)
- Datos embebidos en JSON. No hay base de datos relacional.
- Preparado para migrar a PostgreSQL + REST API si el proyecto escala.

### Fase 6 — Testing (pendiente)
- Pruebas manuales realizadas (rueda de prueba con 10 actividades)
- Pendiente: Jest para unit testing de funciones críticas (getCurrentActivityIndex, getActivityStatus)

### Fase 7 — Ciberseguridad (no aplica)
- App sin autenticación ni datos sensibles de usuarios.
- No hay formularios ni login.

### Fase 8 — Docker (no aplica)
- App React Native, no corre en servidor.
- Se despliega vía Expo Go o APK.

### Fase 9 — CI/CD (pendiente)
- Pendiente: GitHub Actions para lint + typecheck automáticos en cada push

### Fase 10 — Cloud (no aplica)
- App 100% offline. No requiere cloud.

### Fase 11 — Observabilidad (no aplica)
- Sin backend que monitorear.

### Fase 12 — Escalabilidad (no aplica)

### Fase 13 — Mantenimiento (en progreso)
- Refactor continuo
- Technical debt controlado
- Changelog activo

---

## Estructura del proyecto

```
KingdomCampus/
├── docs/                  # Documentación
│   ├── PLAN.md            # Este archivo
│   └── CHANGELOG.md       # Bitácora de cambios
├── src/
│   ├── components/        # Componentes reutilizables
│   ├── data/              # Datos en JSON
│   ├── hooks/             # Hooks personalizados
│   ├── navigation/        # Navegación (tabs + stack)
│   ├── screens/           # Pantallas
│   ├── services/          # Servicios (storage, etc.)
│   ├── theme/             # Colores, paleta, MD3 theme
│   └── utils/             # Utilidades, constantes, fechas
├── App.tsx                # Entry point
├── app.json               # Expo config
├── babel.config.js        # Babel config
├── package.json           # Dependencias
├── tsconfig.json          # TypeScript config
└── README.md              # (pendiente)
```

---

## Stack Tecnológico

| Herramienta | Versión | Propósito |
|-------------|---------|-----------|
| React Native | 0.81.5 | Framework mobile |
| Expo | SDK 54 | Plataforma de desarrollo |
| TypeScript | 5.3.3 | Tipado estático |
| React Navigation | 7.x | Navegación |
| React Native Paper | 5.x | UI components (MD3) |
| React Native Reanimated | 4.5.0 | Animaciones |
| expo-linear-gradient | ~14.x | Gradientes |
| @expo/vector-icons | 14.x | Iconografía |

---

## Pendientes Priorizados

1. Limpiar archivos no usados (ScheduleScreen, FacultadesScreen, LiveActivityBanner, etc.)
2. README.md profesional
3. GitHub Actions (lint + typecheck on push)
4. Testing con Jest
5. Pulir diseño de pantallas restantes (Conferencias, Cátedras, Equipo, Más)
6. Preparar build APK para distribución
