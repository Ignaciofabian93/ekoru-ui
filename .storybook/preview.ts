import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    darkMode: {
      // Set the initial theme
      current: 'light',
      // Override the default dark theme
      dark: { ...themes.dark, appBg: '#1e293b' },
      // Override the default light theme
      light: { ...themes.normal, appBg: '#ffffff' },
      // Apply dark class to body
      darkClass: 'dark',
      lightClass: 'light',
      classTarget: 'html',
      stylePreview: true,
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1e293b',
        },
        {
          name: 'ekoru',
          value: '#f0fdf4',
        },
      ],
    },
  },
};

export default preview;
