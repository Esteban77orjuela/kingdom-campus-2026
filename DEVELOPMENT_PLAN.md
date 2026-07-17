# Kingdom Campus 2026 - Plan de Desarrollo Profesional

Este documento sirve como bitácora y guía de arquitectura para el proyecto Kingdom Campus 2026, siguiendo estándares de ingeniería de software a nivel Senior/Architect.

## VISIÓN GENERAL DEL PRODUCTO (FASE 0)
**Objetivo:** Aplicación móvil (React Native / Expo) para gestionar la experiencia del retiro "Kingdom Campus 2026".
**Valor:** Proveer información en tiempo real (cronogramas, vestimenta, recomendaciones) y guiar a los asistentes (jóvenes) durante el evento, mejorando la organización y la interacción.

## ROADMAP & FASES APLICADAS AL PROYECTO

### Fase 1: Requerimientos
- [x] Cronograma interactivo (ScheduleWheel).
- [x] Información estática (Vestimenta, Qué llevar, Recomendaciones).
- [ ] Autenticación de usuarios (si aplica).
- [ ] Gestión de estado sin conexión (Offline first, importante para retiros en fincas).

### Fase 2 & 3: Arquitectura y Diseño Técnico
- **Framework:** React Native con Expo (SDK 54).
- **UI/UX:** React Native Paper, componentes personalizados (Glassmorphism).
- **Patrones:** Separación de UI y Lógica (Custom Hooks como `useRetreatStatus`).
- **Estructura de carpetas:**
  - `src/components`: Componentes reutilizables.
  - `src/screens`: Vistas completas.
  - `src/hooks`: Lógica de negocio y estado.
  - `src/theme`: Sistema de diseño.
  - `src/utils`: Constantes y helpers.

### Fase 4: Desarrollo (Current)
- Flujo de trabajo Agile: Iteraciones cortas, revisión constante.
- Clean Code: Nombres descriptivos, sin código muerto, sin comentarios residuales de IA.
- Control de Versiones: Git (Commits limpios, push al repositorio público).

### Fases 5 a 13: Futuro (Si el alcance del proyecto lo requiere)
- **Base de Datos / Backend:** Firebase o Supabase para datos dinámicos (Ranking, anuncios en tiempo real).
- **Testing:** Implementación de Jest para lógica core (ej. cálculo de fechas del retiro).
- **CI/CD:** GitHub Actions para compilación automática de Expo (EAS Build).

## BITÁCORA DE CAMBIOS
1. **[Core]** Actualización del proyecto a Expo SDK 54, resolución de conflictos de dependencias (Reanimated).
2. **[UI/Feature]** Refactorización total de `ScheduleWheel` para un efecto slot-machine nativo (`useNativeDriver: true`), eliminando errores de interpolación de color.
3. **[Data]** Actualización del cronograma oficial del retiro en `HomeScreen`.
