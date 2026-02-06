---
name: rpsoft-supabase
description: >
  Estándar RPSoft para trabajar con Supabase (Auth + Database + RLS).
  Define convenciones de tablas, seguridad, policies y checklist obligatorio
  para proyectos fullstack con Next.js/React.
---

# RPSoft Supabase Skill (DB + Security Standard)

## 🎯 Propósito
Esta skill define el estándar oficial RPSoft para manejar Supabase en proyectos web.

Debe garantizar:
- Autenticación segura (Supabase Auth)
- Persistencia real en PostgreSQL
- Row Level Security (RLS) obligatoria
- Políticas por usuario para evitar filtración de datos
- Código limpio, reusable y mantenible

---

## 🧱 Stack estándar
- Supabase Auth
- Supabase Database (PostgreSQL)
- Supabase Storage (opcional)
- Next.js / React + TypeScript
- supabase-js v2

---

## 📁 Convención de estructura del proyecto

### Cliente Supabase
El cliente siempre debe estar en:

`src/lib/supabaseClient.ts`

Ejemplo:

```ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
