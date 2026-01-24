# 🚀 Quick Start Guide - Ekoru UI

## Instalación Inicial

```bash
# 1. Clonar o inicializar el proyecto
cd ekoru-ui

# 2. Instalar dependencias (usar pnpm)
pnpm install

# 3. Verificar que todo funciona
pnpm build
```

## 🎨 Desarrollo con Storybook (Recomendado)

```bash
# Iniciar Storybook en http://localhost:6006
pnpm storybook
```

**¿Qué hace Storybook?**
- Muestra todos tus componentes visualmente
- Hot reload automático
- Puedes jugar con las props en tiempo real
- Documentación automática

## 🛠️ Crear un Nuevo Componente

### Paso 1: Crear la estructura

```bash
mkdir -p src/components/Input
touch src/components/Input/Input.tsx
touch src/components/Input/Input.test.tsx
touch src/components/Input/Input.stories.tsx
touch src/components/Input/index.ts
```

### Paso 2: Crear el componente

```tsx
// src/components/Input/Input.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const inputVariants = cva(
  'w-full rounded-lg border transition-colors focus:outline-none focus:ring-2',
  {
    variants: {
      variant: {
        default: 'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
        error: 'border-red-500 focus:border-red-600 focus:ring-red-500',
      },
      size: {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-2.5 text-base',
        lg: 'px-5 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <input
        className={cn(inputVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
```

### Paso 3: Crear stories

```tsx
// src/components/Input/Input.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-80">
      <label className="block text-sm font-medium mb-2">Email</label>
      <Input type="email" placeholder="tu@email.com" />
    </div>
  ),
};
```

### Paso 4: Exportar

```tsx
// src/components/Input/index.ts
export { Input } from './Input';
export type { InputProps } from './Input';

// src/components/index.ts
export * from './Button';
export * from './Input'; // ← Agregar nueva línea
```

### Paso 5: Ver en Storybook

```bash
# Si ya está corriendo, hot reload automático
# Si no, iniciar:
pnpm storybook
```

## 🧪 Testing

```bash
# Correr tests
pnpm test

# Tests en watch mode (mientras desarrollas)
pnpm test:watch

# Ver UI de tests
pnpm test:ui

# Coverage
pnpm test:coverage
```

## 📦 Build y Publicación

### Build local

```bash
# Compilar la librería
pnpm build

# Esto genera:
# - dist/index.js (CommonJS)
# - dist/index.mjs (ES Modules)
# - dist/index.d.ts (TypeScript definitions)
# - dist/styles.css (CSS compilado)
```

### Probar localmente en tu app Ekoru

```bash
# En ekoru-ui/
pnpm link --global

# En ekoru-marketplace/
pnpm link --global @ekoru/ui

# En tu app
import { Button } from '@ekoru/ui';
import '@ekoru/ui/styles';
```

### Publicar a NPM

```bash
# 1. Crear changeset
pnpm changeset

# Selecciona:
# - Paquetes a cambiar: @ekoru/ui
# - Tipo: major | minor | patch
# - Describe los cambios

# 2. Commit
git add .
git commit -m "feat: add new Input component"

# 3. Push a main
git push

# 4. GitHub Actions automáticamente:
#    - Corre tests
#    - Hace build
#    - Crea PR de versión
#    - Publica a NPM cuando haces merge
```

## 🎯 Workflow Diario Recomendado

```bash
# 1. Abrir Storybook
pnpm storybook

# 2. En otra terminal, watch tests
pnpm test:watch

# 3. Desarrollar componente
# - Editar .tsx
# - Ver cambios en Storybook (hot reload)
# - Ver tests pasar en tiempo real

# 4. Cuando termines
pnpm changeset
git commit
git push
```

## 📁 Estructura de Archivos

```
src/components/ComponentName/
├── ComponentName.tsx         # Componente principal
├── ComponentName.test.tsx    # Tests
├── ComponentName.stories.tsx # Storybook
└── index.ts                  # Export
```

## 🎨 Diseñando con Tailwind

### Usar class-variance-authority (CVA)

```tsx
const componentVariants = cva(
  'base-classes', // Clases siempre presentes
  {
    variants: {
      color: {
        primary: 'bg-primary-500',
        secondary: 'bg-secondary-500',
      },
      size: {
        sm: 'text-sm',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      color: 'primary',
      size: 'sm',
    },
  }
);
```

### Usar la utilidad cn()

```tsx
// Merge de clases con cn()
<div className={cn(
  'base-class',
  condition && 'conditional-class',
  className // Permite override del usuario
)} />
```

## 🐛 Troubleshooting

### "Module not found"
```bash
pnpm install
```

### "Cannot find name 'React'"
```bash
# Verificar tsconfig.json tiene "jsx": "react-jsx"
```

### Hot reload no funciona
```bash
# Reiniciar Storybook
pnpm storybook
```

### Build falla
```bash
# Limpiar y rebuild
pnpm clean
pnpm install
pnpm build
```

## 📚 Recursos

- [Storybook Docs](https://storybook.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [CVA Documentation](https://cva.style/docs)
- [Vitest](https://vitest.dev/)
- [Changesets](https://github.com/changesets/changesets)

## 🆘 Ayuda

Si algo no funciona:

1. Verificar versión de Node >= 18
2. Usar pnpm, no npm
3. `pnpm install --frozen-lockfile`
4. `pnpm clean && pnpm build`

¡Listo para desarrollar! 🚀
