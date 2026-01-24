/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // CSS variable-based colors for theming
        'background-secondary': 'rgb(var(--background-secondary))',
        'background-tertiary': 'rgb(var(--background-tertiary))',
        surface: {
          DEFAULT: 'rgb(var(--surface))',
          elevated: 'rgb(var(--surface-elevated))',
          hover: 'rgb(var(--surface-hover))',
          active: 'rgb(var(--surface-active))',
        },
        'foreground-secondary': 'rgb(var(--foreground-secondary))',
        'foreground-tertiary': 'rgb(var(--foreground-tertiary))',
        'foreground-muted': 'rgb(var(--foreground-muted))',
        'input-bg': 'rgb(var(--input-bg))',
        'input-border': 'rgb(var(--input-border))',
        'input-border-hover': 'rgb(var(--input-border-hover))',
        'input-border-focus': 'rgb(var(--input-border-focus))',
        'input-placeholder': 'rgb(var(--input-placeholder))',
        border: 'rgb(var(--border))',
        input: 'rgb(var(--input-bg))',
        ring: 'rgb(var(--border-focus))',
        background: 'rgb(var(--background))',
        foreground: 'rgb(var(--foreground))',
        'navbar-gradient-from': 'rgb(var(--navbar-gradient-from))',
        'navbar-gradient-via': 'rgb(var(--navbar-gradient-via))',
        'navbar-gradient-to': 'rgb(var(--navbar-gradient-to))',
        primary: {
          DEFAULT: 'rgb(var(--primary))',
          dark: 'rgb(var(--primary-dark))',
          hover: 'rgb(var(--primary-hover))',
          active: 'rgb(var(--primary-active))',
        },
        secondary: {
          DEFAULT: 'rgb(var(--secondary))',
          dark: 'rgb(var(--secondary-dark))',
          hover: 'rgb(var(--secondary-hover))',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent))',
          hover: 'rgb(var(--accent-hover))',
        },
        success: 'rgb(var(--success))',
        warning: 'rgb(var(--warning))',
        error: 'rgb(var(--danger))',
        danger: 'rgb(var(--danger))',
        info: 'rgb(var(--info))',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.25rem',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT:
          '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
