# Estándares de Base de Datos y Documentación del Esquema

> [!NOTE]
> Este documento refleja el esquema de producción actual definido en `db_scripts/complete-setup.sql`.

## 1. Protocolo y Convenciones
- **Nomenclatura**: Todos los identificadores de base de datos (tablas, columnas) usan `snake_case`.
- **Claves Primarias**: Todas las tablas usan claves primarias `UUID`.
- **Claves Foráneas**: Integridad referencial estricta con `ON DELETE CASCADE` donde sea apropiado.
- **Seguridad**:
  - RLS (Seguridad a Nivel de Fila) está **HABILITADO** en TODAS las tablas.
  - Las políticas se definen por acción (SELECT, INSERT, UPDATE, DELETE).
  - Los usuarios pueden acceder estrictamente SOLO a sus propios datos (`auth.uid() = user_id`).

## 2. Referencia del Esquema

### Tabla: `public.profiles`
Almacena información del perfil de usuario, sincronizada automáticamente con `auth.users`.

| Columna      | Tipo                     | Restricciones | Descripción |
|--------------|--------------------------|-------------|-------------|
| `id`         | `uuid`                   | PK, FK -> `auth.users.id` | Coincide exactamente con el ID de Auth. |
| `full_name`  | `text`                   | Nullable    | Nombre para mostrar del usuario. |
| `role`       | `text`                   | Default 'user' | Enum: 'user', 'admin'. |
| `company_id` | `text`                   | Nullable    | Identificador de la organización. |
| `created_at` | `timestamp with time zone` | Default NOW() | |

### Tabla: `public.work_sessions`
Representa una entrada diaria de trabajo (entrada / salida).

| Columna               | Tipo                     | Restricciones | Descripción |
|-----------------------|--------------------------|-------------|-------------|
| `id`                  | `uuid`                   | PK          | UUID generado automáticamente. |
| `user_id`             | `uuid`                   | FK -> `profiles.id` | Propietario de la sesión. |
| `company_id`          | `text`                   | Not Null    | Agrupación de Inquilino/Empresa. |
| `date`                | `date`                   | Not Null    | La fecha efectiva de trabajo. |
| `check_in`            | `timestamp with time zone` | Not Null    | Marca de tiempo ISO de inicio. |
| `check_out`           | `timestamp with time zone` | Nullable    | Marca de tiempo ISO de fin. |
| `total_minutes`       | `integer`                | Default 0   | Duración calculada/caché. |
| `accumulated_seconds` | `integer`                | Default 0   | Duración de alta precisión. |
| `status`              | `text`                   | Not Null    | Enum: 'active', 'paused', 'completed'. |
| `created_at`          | `timestamp with time zone` | Default NOW() | |

### Tabla: `public.breaks`
Rastrea períodos de pausa dentro de una sesión de trabajo.

| Columna            | Tipo                     | Restricciones | Descripción |
|--------------------|--------------------------|-------------|-------------|
| `id`               | `uuid`                   | PK          | UUID generado automáticamente. |
| `work_session_id`  | `uuid`                   | FK -> `work_sessions.id` | Sesión padre. |
| `break_start`      | `timestamp with time zone` | Not Null    | Hora de inicio de la pausa. |
| `break_end`        | `timestamp with time zone` | Nullable    | Hora de reanudación de la pausa. |
| `duration_minutes` | `integer`                | Default 0   | Duración calculada. |
| `created_at`       | `timestamp with time zone` | Default NOW() | |

## 3. Políticas de Seguridad (RLS)

Todas las políticas siguen el principio de **Aislamiento de Usuario**:
- `auth.uid() = id` (para perfiles)
- `auth.uid() = user_id` (para sesiones)
- Verificación de subconsulta para pausas a través de la propiedad de `work_sessions`.

**Políticas Implementadas:**
- `Users can view own profile` (Los usuarios pueden ver su propio perfil)
- `Users can update own profile` (Los usuarios pueden actualizar su propio perfil)
- `Users can insert own profile` (Los usuarios pueden insertar su propio perfil)
- `Users can view own sessions` (Los usuarios pueden ver sus propias sesiones)
- `Users can insert own sessions` (Los usuarios pueden insertar sus propias sesiones)
- `Users can update own sessions` (Los usuarios pueden actualizar sus propias sesiones)
- `Users can delete own sessions` (Los usuarios pueden eliminar sus propias sesiones)
- `Users can view own breaks` (Los usuarios pueden ver sus propias pausas)
- `Users can insert own breaks` (Los usuarios pueden insertar sus propias pausas)
- `Users can update own breaks` (Los usuarios pueden actualizar sus propias pausas)
- `Users can delete own breaks` (Los usuarios pueden eliminar sus propias pausas)
