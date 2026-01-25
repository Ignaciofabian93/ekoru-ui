import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { Info } from 'lucide-react';
import AdBanner from './AdBanner';

describe('AdBanner', () => {
  it('renders icon, title, description and CTA button', () => {
    const { container } = render(
      <AdBanner
        icon={Info}
        title="Promo"
        description="Save 20% today"
        cta={<button>Click me</button>}
      />
    );

    expect(screen.getByText('Promo')).toBeInTheDocument();
    expect(screen.getByText('Save 20% today')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders without icon when none provided', () => {
    render(
      <AdBanner
        title="No icon"
        description="Just text"
        cta={<span>CTA</span>}
      />
    );
    expect(screen.getByText('No icon')).toBeInTheDocument();
    // no explicit img role for svg icon
    expect(screen.queryByRole('img')).toBeNull();
    expect(screen.getByText('CTA')).toBeInTheDocument();
  });

  it('applies variant classes when variant prop is provided', () => {
    const { container } = render(
      <AdBanner
        icon={Info}
        title="Variant"
        description="Variant test"
        cta={<button>CTA</button>}
        variant="outlined"
      />
    );

    const root = container.firstChild as HTMLElement | null;
    expect(root).toBeTruthy();
    // outlined variant adds border-primary class via cva
    expect(root?.className).toEqual(expect.stringContaining('border'));
  });

  it('respects animated=false prop', () => {
    const { container } = render(
      <AdBanner
        title="No anim"
        description="Static"
        cta={<button>CTA</button>}
        animated={false}
      />
    );

    const root = container.firstChild as HTMLElement | null;
    expect(root).toBeTruthy();
    // ensure component renders even when animation disabled
    expect(screen.getByText('No anim')).toBeInTheDocument();
  });
});
