# 📄 Especificación de Requerimientos

## Aplicación Web Comercial de Control y Gestión de Horarios Laborales

---

# 1. Introducción

## 1.1 Propósito

Este documento define los requerimientos funcionales, no funcionales y técnicos para el desarrollo de una aplicación web moderna de control horario orientada a uso comercial.

El sistema permitirá registrar jornadas laborales, gestionar pausas, calcular horas trabajadas y generar reportes visuales.

## 1.2 Alcance

La aplicación será un sistema SaaS (Software as a Service) accesible vía navegador web que permitirá:

- Registro de entrada y salida
- Gestión de pausas
- Cálculo automático de horas trabajadas
- Visualización de reportes
- Administración de usuarios
- Escalabilidad para múltiples empresas

## 1.3 Definiciones

- **Jornada:** Periodo entre check-in y check-out.
- **Pausa:** Intervalo dentro de una jornada que no cuenta como tiempo trabajado.
- **MVP:** Producto mínimo viable.
- **Multi-tenant:** Arquitectura que soporta múltiples empresas aisladas.

---

# 2. Visión del Producto

Aplicación SaaS dirigida a:

- Empresas pequeñas y medianas
- Equipos remotos
- Freelancers
- Startups

### Modelo comercial

- Plan gratuito limitado
- Plan Pro por usuario
- Plan Empresa

---

# 3. Arquitectura General

## 3.1 Frontend

- Next.js
- TypeScript obligatorio
- TailwindCSS
- Librería de gráficos (Recharts o Chart.js)

## 3.2 Backend

- Supabase
  - PostgreSQL
  - Supabase Auth
  - Row Level Security
- Edge Functions (fase 2)

## 3.3 Arquitectura

- SPA con App Router
- Separación por features
- Servicios desacoplados
- Cálculos críticos protegidos

---

# 4. Tipos de Usuario

## 4.1 Usuario estándar

- Registra jornadas
- Gestiona pausas
- Visualiza reportes propios

## 4.2 Administrador

- Visualiza usuarios
- Consulta jornadas
- Exporta datos
- Suspende cuentas

---

# 5. Requerimientos Funcionales

## RF-01 Autenticación

- Registro con email y contraseña
- Verificación de correo
- Recuperación de contraseña
- Cierre de sesión
- Gestión de perfil

## RF-02 Registro de Jornada

El sistema permitirá:

- Iniciar jornada (check-in)
- Finalizar jornada (check-out)
- Visualizar estado actual
- Temporizador en tiempo real

**Restricción:**  
Solo una jornada activa por usuario.

## RF-03 Gestión de Pausas

- Iniciar pausa
- Finalizar pausa
- Múltiples pausas por jornada
- Indicador visual de estado

## RF-04 Cálculo Automático

**Fórmula:**

`Horas trabajadas = (Salida - Entrada) - Total pausas`

- Precisión en minutos
- Manejo de múltiples pausas
- Soporte para jornadas cruzando medianoche

## RF-05 Historial

- Vista diaria
- Vista semanal
- Vista mensual
- Filtro por rango de fechas

## RF-06 Reportes

- Total horas trabajadas
- Promedio diario
- Total pausas
- Gráficos visuales
- Exportación CSV (MVP)
- Exportación PDF (fase 2)

## RF-07 Panel Administrativo

- Gestión de usuarios
- Filtro por fechas
- Visualización de jornadas
- Exportación de datos

---

# 6. Requerimientos No Funcionales

## RNF-01 Rendimiento

- Respuesta menor a 2 segundos
- Cálculos en tiempo real

## RNF-02 Seguridad

- RLS obligatorio
- HTTPS
- Validaciones backend
- Protección contra manipulación de datos

## RNF-03 Usabilidad

- Interfaz moderna
- Diseño intuitivo
- Feedback visual inmediato

## RNF-04 Escalabilidad

- Índices optimizados
- Preparado para miles de usuarios
- Preparado para multiempresa

## RNF-05 Disponibilidad

- Servicio 24/7
- Infraestructura dependiente de Supabase

---

# 7. Modelo de Datos

## Tabla: profiles

- id (uuid PK)
- full_name
- role (user/admin)
- company_id
- created_at

## Tabla: work_sessions

- id (uuid PK)
- user_id (uuid FK)
- company_id
- date (date)
- check_in (timestamp)
- check_out (timestamp)
- total_minutes (integer)
- status (active | paused | completed)
- created_at

**Índices:**

- user_id
- date
- user_id + date

## Tabla: breaks

- id (uuid PK)
- work_session_id (uuid FK)
- break_start (timestamp)
- break_end (timestamp)
- duration_minutes (integer)

---

# 8. Estados del Sistema

Una jornada puede estar en:

- ACTIVE
- PAUSED
- COMPLETED

No se permitirán estados inválidos.

---

# 9. Definición del MVP Comercial

Incluye:

- Autenticación
- Registro jornada
- Gestión pausas
- Dashboard
- Reportes básicos
- Exportación CSV
- Responsive completo
- Panel admin básico
