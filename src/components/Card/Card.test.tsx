import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import Card from './Card';

describe('Card', () => {
  it('renders image, title, description and CTA', () => {
    render(
      <Card
        image={
          <img
            src="/test-image.jpg"
            alt="Test"
            className="w-full h-full object-cover"
          />
        }
        title="Post title"
        description="Short description"
        cta={<a href="/post">Read more →</a>}
      />
    );

    const img = screen.getByAltText('Test') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('/test-image.jpg');

    expect(screen.getByText('Post title')).toBeInTheDocument();
    expect(screen.getByText('Short description')).toBeInTheDocument();
    const link = screen.getByText(/Read more/).closest('a');
    expect(link).toHaveAttribute('href', '/post');
  });

  it('renders badge when provided', () => {
    render(
      <Card
        image={
          <img
            src="/test-image.jpg"
            alt="Test"
            className="w-full h-full object-cover"
          />
        }
        title="Post title"
        description="Short description"
        cta={<a href="/post">Read more →</a>}
        hasBadge
        badgeText="New"
        badgeColor="bg-green-500"
        textColor="text-white"
      />
    );

    const badge = screen.getByText('New');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-green-500');
    expect(badge).toHaveClass('text-white');
  });
});
