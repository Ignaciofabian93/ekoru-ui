import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { Banner } from './Banner';

describe('Banner', () => {
  it('renders correctly with title and description', () => {
    render(<Banner title="Test Title" description="Test Description" />);
    expect(screen.getByRole('heading')).toHaveTextContent('Test Title');
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('applies primary variant by default', () => {
    const { container } = render(
      <Banner title="Title" description="Description" />
    );
    const banner = container.querySelector('.bg-gradient-to-r');
    expect(banner).toBeInTheDocument();
  });

  it('applies secondary variant correctly', () => {
    const { container } = render(
      <Banner title="Title" description="Description" variant="secondary" />
    );
    const banner = container.querySelector('.from-secondary-dark');
    expect(banner).toBeInTheDocument();
  });

  it('applies outlined variant correctly', () => {
    const { container } = render(
      <Banner title="Title" description="Description" variant="outlined" />
    );
    const banner = container.querySelector('.border-primary');
    expect(banner).toBeInTheDocument();
  });

  it('applies ghost variant correctly', () => {
    const { container } = render(
      <Banner title="Title" description="Description" variant="ghost" />
    );
    const banner = container.querySelector('.bg-white\\/50');
    expect(banner).toBeInTheDocument();
  });

  it('shows decorative dots by default', () => {
    const { container } = render(
      <Banner title="Title" description="Description" />
    );
    const dots = container.querySelectorAll('.rounded-full');
    expect(dots.length).toBe(2);
  });

  it('hides decorative dots when showDots is false', () => {
    const { container } = render(
      <Banner title="Title" description="Description" showDots={false} />
    );
    const dots = container.querySelectorAll('.rounded-full');
    expect(dots.length).toBe(0);
  });

  it('renders animated background for primary variant', () => {
    const { container } = render(
      <Banner
        title="Title"
        description="Description"
        variant="primary"
        animated={true}
      />
    );
    const animatedBg = container.querySelector('.from-transparent');
    expect(animatedBg).toBeInTheDocument();
  });

  it('does not render animated background when animated is false', () => {
    const { container } = render(
      <Banner
        title="Title"
        description="Description"
        variant="primary"
        animated={false}
      />
    );
    const animatedBg = container.querySelector('.from-transparent');
    expect(animatedBg).not.toBeInTheDocument();
  });

  it('does not render animated background for non-primary variants', () => {
    const { container } = render(
      <Banner
        title="Title"
        description="Description"
        variant="secondary"
        animated={true}
      />
    );
    const animatedBg = container.querySelector('.from-transparent');
    expect(animatedBg).not.toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Banner ref={ref} title="Title" description="Description" />);
    expect(ref).toHaveBeenCalled();
  });

  it('merges custom className with variant classes', () => {
    const { container } = render(
      <Banner
        title="Title"
        description="Description"
        className="custom-class"
      />
    );
    const banner = container.firstChild;
    expect(banner).toHaveClass('custom-class');
    expect(banner).toHaveClass('p-4'); // Has base class
  });

  it('passes additional HTML attributes', () => {
    render(
      <Banner
        title="Title"
        description="Description"
        data-testid="custom-banner"
      />
    );
    expect(screen.getByTestId('custom-banner')).toBeInTheDocument();
  });

  it('renders with long content', () => {
    const longTitle = 'Long Title That Spans Multiple Lines';
    const longDescription =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(10);
    render(<Banner title={longTitle} description={longDescription} />);
    expect(screen.getByRole('heading')).toHaveTextContent(longTitle);
    // Check that description paragraph exists and contains the repeated text
    const description = screen.getByText(/Lorem ipsum dolor sit amet/);
    expect(description).toBeInTheDocument();
  });

  it('applies correct dot variant for primary', () => {
    const { container } = render(
      <Banner title="Title" description="Description" variant="primary" />
    );
    const dots = container.querySelectorAll('.bg-white.shadow-lg');
    expect(dots.length).toBeGreaterThan(0);
  });

  it('applies correct dot variant for outlined', () => {
    const { container } = render(
      <Banner title="Title" description="Description" variant="outlined" />
    );
    const dots = container.querySelectorAll('.bg-primary');
    expect(dots.length).toBeGreaterThan(0);
  });

  it('applies correct dot variant for ghost', () => {
    const { container } = render(
      <Banner title="Title" description="Description" variant="ghost" />
    );
    const dots = container.querySelectorAll('.bg-gray-600');
    expect(dots.length).toBeGreaterThan(0);
  });
});
