# @ekoru/ui

> Internal design system and React component library for the Ekoru ecosystem.

[![npm version](https://img.shields.io/npm/v/@ekoru/ui.svg)](https://www.npmjs.com/package/@ekoru/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![codecov](https://codecov.io/gh/Ignaciofabian93/ekoru-ui/branch/main/graph/badge.svg)](https://codecov.io/gh/Ignaciofabian93/ekoru-ui)

## 🌱 About

Ekoru UI is an internal design system built specifically for Ekoru's product ecosystem. It ensures consistent branding, user experience, and maintainability across all Ekoru platforms with sustainability-focused components and design patterns.

### Used In

- **[www.ekoru.cl](https://www.ekoru.cl)** - Marketing and informational website
- **[app.ekoru.cl](https://app.ekoru.cl)** - E-commerce platform (in development)
- **[admin.ekoru.cl](https://admin.ekoru.cl)** - Admin dashboard (in development)
- Future Ekoru products

## ✨ Features

- 🎨 **Ekoru Branding** - Custom design system with Ekoru's sustainable aesthetic
- 🌍 **Sustainability-focused** - Components like Environmental Impact Modal, Product Impact Cards
- ♿ **Accessible** - WCAG 2.1 compliant
- 🎯 **TypeScript** - Full type safety
- 🎭 **Customizable** - Built on Tailwind CSS
- 📦 **Tree-shakeable** - Optimized bundle size
- 🧪 **Well tested** - Comprehensive test coverage
- 📚 **Documented** - Storybook for all components

## 🚨 Note for External Developers

This library is **internal to Ekoru** and contains branding-specific components and styling. While it's published as open source, it's designed specifically for Ekoru products and may not be suitable for external projects.

## 📦 Installation

```bash
pnpm add @ekoru/ui
```

## 🚀 Quick Start

```tsx
import { Button } from '@ekoru/ui';
import '@ekoru/ui/styles';

export default function App() {
  return (
    <Button variant="primary" onClick={() => console.log('clicked')}>
      Shop Sustainable
    </Button>
  );
}
```

## 📖 Usage

### Importing Styles

Import styles in your root file:

```tsx
// app.tsx or layout.tsx
import '@ekoru/ui/styles';
```

### Basic Example

```tsx
import { Button, Card, Input, ProductCard } from '@ekoru/ui';

function CheckoutPage() {
  return (
    <div>
      <ProductCard
        name="Eco Water Bottle"
        price={25000}
        image="/products/bottle.jpg"
        environmentalImpact={{
          co2Saved: 2.5,
          waterSaved: 150,
          treesPlanted: 1,
        }}
      />
      <Card>
        <Input label="Email" placeholder="your@email.com" />
        <Button variant="primary" size="lg" fullWidth>
          Complete Purchase
        </Button>
      </Card>
    </div>
  );
}
```

### Using with Next.js

```tsx
// Next.js App Router (app/layout.tsx)
import '@ekoru/ui/styles';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
```

### Customizing Theme

Extend the Ekoru theme in your Tailwind config:

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
        // Ekoru brand colors are already included
        // Add custom extensions if needed
      },
    },
  },
};
```

## 🎨 Component Categories

### Core Components

General-purpose UI components used across all platforms.

- **Button** - Primary actions with variants
- **Input** - Form inputs with validation
- **Card** - Content containers
- **Modal** - Dialogs and overlays
- **Select** - Dropdown selections
- **Textarea** - Multi-line text inputs
- **Checkbox** - Boolean inputs

### Ekoru-Specific Components

Custom components for Ekoru's unique features.

- **ProductCard** - E-commerce product display with impact metrics
- **EnvironmentalImpactModal** - Sustainability impact visualization
- **HeroCarousel** - Homepage banner carousel

### Layout Components

- **Navbar** - Navigation headers
- **Footer** - Page footers

## 🛠️ Development

### Prerequisites

- Node.js >= 20
- pnpm >= 9

### Setup

```bash
# Clone the repository
git clone https://github.com/Ignaciofabian93/ekoru-ui.git
cd ekoru-ui

# Install dependencies
pnpm install

# Start Storybook
pnpm storybook

# Run tests
pnpm test

# Build
pnpm build
```

### Project Structure

```
ekoru-ui/
├── src/
│   ├── components/          # React components
│   │   ├── Button/
│   │   ├── ProductCard/
│   │   └── ...
│   ├── utils/               # Utilities
│   ├── styles/              # Global styles
│   └── index.ts             # Main export
├── test/                    # Test setup
├── .storybook/              # Storybook config
└── .changeset/              # Changesets
```

### Scripts

| Command              | Description              |
| -------------------- | ------------------------ |
| `pnpm dev`           | Start development mode   |
| `pnpm build`         | Build for production     |
| `pnpm test`          | Run tests                |
| `pnpm test:watch`    | Run tests in watch mode  |
| `pnpm test:coverage` | Generate coverage report |
| `pnpm storybook`     | Start Storybook          |
| `pnpm lint`          | Lint code                |
| `pnpm type-check`    | Check TypeScript types   |
| `pnpm changeset`     | Create a changeset       |

## 🔄 Release Workflow

We use [Changesets](https://github.com/changesets/changesets) for automated versioning and publishing.

### Making Changes

1. Create a feature branch

```bash
   git checkout -b feature/new-component
```

2. Make your changes

3. Create a changeset

```bash
   pnpm changeset
```

- Select change type: `patch` / `minor` / `major`
- Write a clear description

4. Commit and push

```bash
   git add .
   git commit -m "feat: add ProductCard component"
   git push
```

5. GitHub Actions will:
   - Run tests and builds
   - Create a Version PR when merged to `main`
   - Auto-publish to npm when Version PR is merged

📖 **See [CHANGESETS.md](./docs/CHANGESETS.md) for detailed workflow guide**

## 🤝 Contributing

This is an internal project for Ekoru team members. If you're part of the team:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `pnpm test`
5. Create a changeset: `pnpm changeset`
6. Open a Pull Request

### Contribution Guidelines

- Write tests for new components
- Update Storybook stories
- Follow the existing code style
- Keep components accessible (WCAG 2.1)
- Use TypeScript strictly
- Document props and usage

## 📚 Documentation

- **Storybook**: Component documentation and playground
- **Changesets**: [CHANGESETS.md](./CHANGESETS.md) - Release workflow guide
- **TypeScript**: Full type definitions included

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:coverage

# UI mode
pnpm test:ui
```

We use:

- **Vitest** for unit testing
- **React Testing Library** for component testing
- **Codecov** for coverage tracking

## 📄 License

MIT © [Ekoru](https://ekoru.cl)

## 🌐 Links

- [GitHub Repository](https://github.com/Ignaciofabian93/ekoru-ui)
- [npm Package](https://www.npmjs.com/package/@ekoru/ui)
- [Ekoru Website](https://www.ekoru.cl)
- [Ekoru Platform](https://app.ekoru.cl)

## 📞 Internal Support

For Ekoru team members:

- Slack: `#ekoru-ui` channel
- Issues: [GitHub Issues](https://github.com/Ignaciofabian93/ekoru-ui/issues)
- Lead: Ignacio Rodriguez (ignaciorodriguez@ekoru.cl)

---

Built with 💚 by the Ekoru team for a sustainable future.
