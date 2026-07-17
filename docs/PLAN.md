# Kingdom Campus 2026 — Plan de Desarrollo

## Visión del Producto

App móvil para los participantes del retiro Kingdom Campus 2026: acceso rápido a cronograma, conferencias, cátedras, equipo, recomendaciones, ubicación y código de vestimenta — sin papel, sin redes sociales.

**Usuarios:** Jóvenes 15–30 años.  
**Stack:** React Native + Expo SDK 54 + TypeScript + React Navigation + MD3.

---

## Estado por fase

| Fase | Estado |
|------|--------|
| **0 — Visión** | Completada |
| **1 — Requerimientos** | Completada |
| **2 — Arquitectura** | Completada |
| **3 — Diseño Técnico** | Completada |
| **4 — Desarrollo** | Completada |
| **5 — Base de Datos** | No aplica (datos JSON) |
| **6 — Testing** | Completada (Vitest, 34 tests) |
| **7 — Ciberseguridad** | No aplica (sin auth) |
| **8 — Docker** | No aplica |
| **9 — CI/CD** | Completada (GitHub Actions) |
| **10 — Cloud** | No aplica (100% offline) |
| **11 — Observabilidad** | No aplica |
| **12 — Escalabilidad** | No aplica |
| **13 — Mantenimiento** | En progreso |

---

## Funcionalidades entregadas

- Navegación Bottom Tabs (5 tabs) + Stack modal
- Header con logo real, sombra dorada, versículo
- Contador regresivo al inicio del retiro
- ScheduleWheel: ruleta vertical con animación spring
- Mensaje de cierre al finalizar (Romanos 12:2 + bendición)
- Conferencias con tarjetas detalladas
- Cátedras agrupadas por día con cabeceras de color
- Equipo organizador agrupado por rol
- Más: módulos (Recomendaciones, Ubicación) + versículo + info app
- Código de vestimenta (General + Piscina)
- Qué llevar, Recomendaciones, Durante cátedras, Info importante
- Secciones colapsables con estilo unificado
- Testing automatizado (34 tests)
- CI: typecheck + tests en cada push
- Iconografía: app icon 1024×1024, splash, favicon, adaptive icon
- Paleta MD3 personalizada (azul profundo, dorado, ámbar)

---

## Pendiente

1. **Build APK** para distribución (`npx expo run:android`)

---

## Stack Tecnológico

| Herramienta | Versión | Propósito |
|-------------|---------|-----------|
| React Native | 0.81.5 | Framework mobile |
| Expo | SDK 54 | Plataforma |
| TypeScript | ~5.9.2 | Tipado |
| React Navigation | 7.x | Navegación |
| React Native Paper | 5.x | UI (MD3) |
| Reanimated | ~4.1.1 | Animaciones |
| Vitest | ^4.1.10 | Testing |
| @expo/vector-icons | ^15.0.3 | Iconografía |
