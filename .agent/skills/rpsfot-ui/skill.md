---
description: Estándares de desarrollo UI para RPSoft usando React y Tailwind CSS
---

# RPSoft UI Skill

Este documento define los estándares obligatorios para el desarrollo de interfaces en el proyecto RPSoft. El objetivo es mantener consistencia visual, accesibilidad y calidad de código.

## 1. Stack Técnico

- **Framework**: React.
  - Se **requiere** el uso exclusivo de **Componentes Funcionales** y **Hooks**.
  - No utilizar Class Components.
- **Estilos**: Tailwind CSS.
  - Utilizar clases de utilidad para todo el estilizado.
  - Evitar CSS custom o archivos `.css` separados a menos que sea estrictamente necesario para animaciones complejas no soportadas por Tailwind.

## 2. Reglas de Diseño

### Estética General (Antigravity Theme)
La interfaz debe sentirse moderna, limpia y consistente con la estética "Antigravity".
- **Colores Base**: Usar la escala de grises de Tailwind (Slate o Zinc) para fondos y textos.
  - Fondo Principal: `bg-slate-900` (Dark mode default)
  - Paneles/Tarjetas: `bg-slate-800`
  - Texto Principal: `text-slate-50`
  - Texto Secundario: `text-slate-400`
- **Acentos**: Usar colores vibrantes pero profesionales para acciones (ej. Indigo, Violet).

### Componentes Específicos
- **Botones**:
  - **Bordes**: Siempre redondeados. Usar `rounded-lg` para botones estándar o `rounded-full` para acciones tipo "pill" o iconos.
  - **Interacción**: Definir estados visuales claros.
    - `hover:`: Cambio de luminosidad o fondo (ej. `hover:bg-indigo-500`).
    - `active:`: Pequeño escalado o cambio de color para feedback táctil.
    - `focus:`: Ring visible para accesibilidad (ej. `focus:ring-2 focus:ring-indigo-400`).

## 3. Estructura de Archivos

- **Atomicidad**: Los componentes deben ser atómicos y seguir el principio de responsabilidad única.
- **Organización**:
  - Todos los componentes de UI deben residir en `src/components/`.
  - Agrupar por dominio o tipo si la carpeta crece demasiado (ej. `src/components/ui/`, `src/components/layout/`).
- **Nombrado**:
  - Carpetas y Archivos en **PascalCase** (ej. `PrimaryButton.tsx`).
  - `index.ts` (barrel file) opcional para exportaciones limpias.

## 4. Criterios de Validación

Antes de considerar una tarea de UI como "Terminada", se debe verificar:

1.  **Responsive Design (Mobile First)**:
    - El diseño base debe ser para móviles.
    - Usar breakpoints (`sm:`, `md:`, `lg:`) para adaptar a pantallas más grandes.
    - No debe haber scroll horizontal no intencionado.
2.  **Accesibilidad (a11y)**:
    - Elementos interactivos accesibles por teclado.
    - Contraste de colores adecuado.
    - Uso correcto de etiquetas HTML semánticas (`<nav>`, `<main>`, `<button>` en lugar de `<div>`).
