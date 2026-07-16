# Changelog — Kingdom Campus 2026

## [1.0.0] — 2026-07-15

### Añadido
- Proyecto inicializado con Expo SDK 54 + TypeScript
- Sistema de navegación: Bottom Tabs (Inicio, Conferencias, Cátedras, Equipo, Más) + Stack modal
- Tema MD3 personalizado con paleta de marca (darkBlue, gold, amber)
- Pantalla de Inicio: logo, contador regresivo, ruleta de actividades, código de vestimenta, qué llevar, recomendaciones, durante cátedras, info importante
- Mensaje de cierre del retiro con versículo y bendición
- Componente ScheduleWheel: ruleta vertical con animación spring
- Pantalla de Conferencias con tarjetas informativas
- Pantalla de Cátedras con horarios por día
- Pantalla de Equipo con el staff del retiro
- Pantalla Más con acceso a Ubicación y Recomendaciones
- CountdownTimer animado con Reanimated
- Todos los datos en JSON (schedule, conferences, catedras, team, retreat, recommendations)
- GlassCard con efecto cristal
- Testing automatizado con Vitest (34 pruebas)
- CI en GitHub Actions (typecheck + tests)
- Documentación: README, PLAN, CHANGELOG

### Corregido
- Fecha del retiro: 25–27 julio → 15–17 agosto
- RETIRO_START_DATE corregido (antes tenía Date.now()+20000)
- getActivityStatus ahora acepta fecha del día
- Bug de misma hora inicio/fin que mostraba actividad como "en curso" por 24h
- Badge "Ahora" ahora solo cuando la actividad específica está en curso
- getCurrentActivityIndex usa constantes (no valores hardcodeados)

### Eliminado
- expo-notifications (causaba banner rojo en Expo Go)
- Pestañas Cronograma y Facultades
- Archivos no usados (ScheduleScreen, FacultadesScreen, TimelineCard, StatusBadge, etc.)
- AGENTS.md y CLAUDE.md (archivos de configuración del editor)

### Iconos y presentación
- Ícono principal actualizado (appstore.png 1024×1024)
- Splash screen configurada con logo e imagen
- Favicon web redimensionado
- Header rediseñado con logo real centrado
