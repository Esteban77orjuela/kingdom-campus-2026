# Changelog — Kingdom Campus 2026

## [1.0.0] — 2026-07-15

### Añadido
- Proyecto inicializado con Expo SDK 54 + TypeScript
- Sistema de navegación: Bottom Tabs (Inicio, Conferencias, Cátedras, Equipo, Más) + Stack modal
- Tema MD3 personalizado con paleta de marca (darkBlue, gold, amber, deepBlue)
- Pantalla de Inicio: contador regresivo, ruleta de actividades, qué llevar, recomendaciones, código de vestimenta, información importante
- Componente ScheduleWheel: ruleta/tragamonedas vertical con animación spring
- Pantalla de Conferencias con tarjetas informativas
- Pantalla de Cátedras con tarjetas informativas
- Pantalla de Equipo con el staff del retiro
- Pantalla Más con acceso a Ubicación y Recomendaciones
- CountdownTimer animado con Reanimated
- Todos los datos en JSON (schedule, conferences, catedras, team, retreat, faculties, recommendations)
- Hooks: useRetreatStatus, useCurrentActivity, useCountdown, useDataLoader
- Componentes reutilizables: GlassCard, ConferenceCard, TimelineCard, TeamCard, StatusBadge, SectionHeader, RecommendationCard, LiveActivityBanner, AnimatedTransition

### Corregido
- Fecha del retiro: 25–27 julio → 15–17 agosto
- RETIRO_START_DATE: Date.now()+20000 → 15 agosto 5:00 AM Bogotá
- getActivityStatus ahora acepta fecha del día (no comparaba contra hoy)
- Bug de misma hora inicio/fin (05:00–05:00) que mostraba actividad como "en curso" por 24h
- Badge "Ahora" ahora se muestra solo cuando la actividad específica está en curso, no solo porque el retiro empezó
- getCurrentActivityIndex ahora usa RETIRO_START_DATE/END_DATE desde constants (no hardcodeadas)
- Animación spring más fluida (stiffness 200, damping 18)

### Eliminado
- AGENTS.md (archivo de instrucciones IA)
- expo-notifications (causaba banner rojo en Expo Go)
- Pestaña Cronograma (reemplazada por ScheduleWheel en Inicio)
- Pestaña Facultades (no necesaria para el participante)
- Referencias a rutas antiguas (Conferencias, Cátedras como modales → ahora tabs)

## [Próximo]

### Pendiente
- Limpieza de archivos no usados (ScheduleScreen, FacultadesScreen, LiveActivityBanner, etc.)
- README.md profesional
- GitHub Actions (lint + typecheck)
- Pruebas con Jest
- Pulir diseño de pantallas secundarias
- Build APK para distribución
