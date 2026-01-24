# @ekoru/ui

> Professional React component library for the Ekoru sustainable marketplace ecosystem.

[![npm version](https://img.shields.io/npm/v/@ekoru/ui.svg)](https://www.npmjs.com/package/@ekoru/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## 🌱 About

Ekoru UI is a comprehensive design system built with sustainability and user experience in mind. It provides a set of accessible, customizable, and beautiful React components for building modern web applications.

## ✨ Features

- 🎨 **Beautiful Design** - Carefully crafted components with a sustainable aesthetic
- ♿ **Accessible** - WCAG 2.1 compliant components
- 🎯 **TypeScript** - Full type safety out of the box
- 🎭 **Customizable** - Easy theming with Tailwind CSS
- 📦 **Tree-shakeable** - Only bundle what you use
- 🧪 **Well tested** - Comprehensive test coverage
- 📚 **Documented** - Storybook documentation for all components

## 📦 Installation

```bash
npm install @ekoru/ui
# or
pnpm add @ekoru/ui
# or
yarn add @ekoru/ui
```

## 🚀 Quick Start

```tsx
import { Button } from '@ekoru/ui';
import '@ekoru/ui/styles';

export default function App() {
  return (
    <Button variant="primary" onClick={() => console.log('clicked')}>
      Click me
    </Button>
  );
}
```

## 📖 Usage

### Importing Styles

Make sure to import the styles in your main app file:

```tsx
// app.tsx or main.tsx
import '@ekoru/ui/styles';
```

### Using Components

```tsx
import { Button, Card, Input } from '@ekoru/ui';

function MyComponent() {
  return (
    <Card>
      <h2>Welcome to Ekoru</h2>
      <Input placeholder="Enter your email" />
      <Button variant="primary" size="lg">
        Get Started
      </Button>
    </Card>
  );
}
```

### Customizing Theme

You can customize the theme by extending your Tailwind config:

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@ekoru/ui/dist/**/*.{js,mjs}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          // Your custom colors
        },
      },
    },
  },
};
```

## 🎨 Components

### Button

A versatile button component with multiple variants and sizes.

```tsx
<Button variant="primary" size="md" isLoading={false}>
  Click me
</Button>
```

**Variants:** `primary` | `secondary` | `outline` | `ghost` | `success` | `warning` | `error`

**Sizes:** `sm` | `md` | `lg`

### More components coming soon!

- Input
- Card
- Modal
- Select
- Checkbox
- Radio
- Toast
- And many more...

## 🛠️ Development

### Prerequisites

- Node.js >= 18
- pnpm >= 8

### Setup

```bash
# Clone the repository
git clone https://github.com/ekoru/ekoru-ui.git
cd ekoru-ui

# Install dependencies
pnpm install

# Start Storybook
pnpm storybook

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Build the library
pnpm build
```

### Project Structure

```
ekoru-ui/
├── src/
│   ├── components/      # React components
│   ├── utils/           # Utility functions
│   ├── styles/          # Global styles
│   └── index.ts         # Main entry point
├── test/                # Test utilities
├── .storybook/          # Storybook configuration
└── dist/                # Build output (generated)
```

### Creating a New Component

1. Create component folder in `src/components/`
2. Create component file: `ComponentName.tsx`
3. Create test file: `ComponentName.test.tsx`
4. Create stories file: `ComponentName.stories.tsx`
5. Export from `index.ts`

Example:

```tsx
// src/components/MyComponent/MyComponent.tsx
import { cn } from '@/utils/cn';

export interface MyComponentProps {
  className?: string;
  children: React.ReactNode;
}

export const MyComponent = ({ className, children }: MyComponentProps) => {
  return <div className={cn('my-component', className)}>{children}</div>;
};
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage

# Run tests with UI
pnpm test:ui
```

### Building

```bash
# Build for production
pnpm build

# Build CSS
pnpm build:css

# Type check
pnpm type-check
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Run tests: `pnpm test`
5. Create a changeset: `pnpm changeset`
6. Commit your changes: `git commit -m "feat: add new feature"`
7. Push to your fork: `git push origin feature/my-feature`
8. Open a Pull Request

## 📝 Versioning

We use [Changesets](https://github.com/changesets/changesets) for version management.

To create a changeset:

```bash
pnpm changeset
```

Follow the prompts to describe your changes.

## 📄 License

MIT © [Ekoru](https://ekoru.cl)

## 🌐 Links

- [Documentation](https://ui.ekoru.cl)
- [Storybook](https://storybook.ekoru.cl)
- [GitHub](https://github.com/ekoru/ekoru-ui)
- [npm](https://www.npmjs.com/package/@ekoru/ui)

## 💚 Support

If you like this project, please consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🤝 Contributing to the codebase

---

Made with 💚 by the Ekoru team for a more sustainable future.
