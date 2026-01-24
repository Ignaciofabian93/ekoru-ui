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
    expect(screen.queryByRole('img')).toBeNull();
    expect(screen.getByText('CTA')).toBeInTheDocument();
  });
});
