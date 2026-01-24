import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { TrendingUp } from 'lucide-react';
import StatsCard from './StatsCard';

describe('StatsCard', () => {
  it('renders mainText, description and icon for numeric mainText', () => {
    const { container } = render(
      <StatsCard icon={TrendingUp} mainText={1200} description="Sales" />
    );

    expect(screen.getByText('Sales')).toBeInTheDocument();
    expect(screen.getByText('1200')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders mainText as title and description as detail', () => {
    render(
      <StatsCard
        icon={TrendingUp}
        mainText={'Fashion'}
        description="240 products"
      />
    );

    expect(screen.getByText('Fashion')).toBeInTheDocument();
    expect(screen.getByText('240 products')).toBeInTheDocument();
  });
});
