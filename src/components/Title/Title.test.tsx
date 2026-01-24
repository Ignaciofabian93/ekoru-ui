import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Title } from './Title';
import '@testing-library/jest-dom';

describe('Title', () => {
  it('renders correctly', () => {
    render(<Title>Test Title</Title>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders as h1 by default', () => {
    render(<Title>Default Heading</Title>);
    const heading = screen.getByText('Default Heading');
    expect(heading.tagName).toBe('H1');
  });

  it('renders different heading levels', () => {
    const { rerender } = render(<Title level="h1">Heading 1</Title>);
    expect(screen.getByText('Heading 1').tagName).toBe('H1');

    rerender(<Title level="h2">Heading 2</Title>);
    expect(screen.getByText('Heading 2').tagName).toBe('H2');

    rerender(<Title level="h3">Heading 3</Title>);
    expect(screen.getByText('Heading 3').tagName).toBe('H3');

    rerender(<Title level="h4">Heading 4</Title>);
    expect(screen.getByText('Heading 4').tagName).toBe('H4');

    rerender(<Title level="h5">Heading 5</Title>);
    expect(screen.getByText('Heading 5').tagName).toBe('H5');

    rerender(<Title level="h6">Heading 6</Title>);
    expect(screen.getByText('Heading 6').tagName).toBe('H6');
  });

  it('applies different weights', () => {
    const { rerender } = render(
      <Title level="h2" weight="normal">
        Normal
      </Title>
    );
    expect(screen.getByText('Normal')).toHaveClass('font-normal');

    rerender(
      <Title level="h2" weight="medium">
        Medium
      </Title>
    );
    expect(screen.getByText('Medium')).toHaveClass('font-medium');

    rerender(
      <Title level="h2" weight="semibold">
        Semibold
      </Title>
    );
    expect(screen.getByText('Semibold')).toHaveClass('font-semibold');

    rerender(
      <Title level="h2" weight="bold">
        Bold
      </Title>
    );
    expect(screen.getByText('Bold')).toHaveClass('font-bold');

    rerender(
      <Title level="h2" weight="extrabold">
        Extrabold
      </Title>
    );
    expect(screen.getByText('Extrabold')).toHaveClass('font-extrabold');
  });

  it('applies different colors', () => {
    const { rerender } = render(<Title color="default">Default</Title>);
    expect(screen.getByText('Default')).toHaveClass('text-foreground');

    rerender(<Title color="primary">Primary</Title>);
    expect(screen.getByText('Primary')).toHaveClass('text-primary');

    rerender(<Title color="secondary">Secondary</Title>);
    expect(screen.getByText('Secondary')).toHaveClass(
      'text-foreground-secondary'
    );

    rerender(<Title color="tertiary">Tertiary</Title>);
    expect(screen.getByText('Tertiary')).toHaveClass(
      'text-foreground-tertiary'
    );

    rerender(<Title color="error">Error</Title>);
    expect(screen.getByText('Error')).toHaveClass('text-error');

    rerender(<Title color="success">Success</Title>);
    expect(screen.getByText('Success')).toHaveClass('text-success');

    rerender(<Title color="warning">Warning</Title>);
    expect(screen.getByText('Warning')).toHaveClass('text-warning');
  });

  it('applies different alignments', () => {
    const { rerender } = render(<Title align="left">Left</Title>);
    expect(screen.getByText('Left')).toHaveClass('text-left');

    rerender(<Title align="center">Center</Title>);
    expect(screen.getByText('Center')).toHaveClass('text-center');

    rerender(<Title align="right">Right</Title>);
    expect(screen.getByText('Right')).toHaveClass('text-right');
  });

  it('applies custom className', () => {
    render(<Title className="custom-class">Custom</Title>);
    expect(screen.getByText('Custom')).toHaveClass('custom-class');
  });

  it('renders visual level different from semantic level using as prop', () => {
    render(
      <Title level="h3" as="h1">
        Visual H3, Semantic H1
      </Title>
    );
    const heading = screen.getByText('Visual H3, Semantic H1');
    expect(heading.tagName).toBe('H1');
    expect(heading).toHaveClass('text-3xl');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Title ref={ref}>Ref Test</Title>);
    expect(ref).toHaveBeenCalled();
  });

  it('supports HTML attributes', () => {
    render(
      <Title id="test-id" data-testid="custom-test">
        Attributes Test
      </Title>
    );
    const heading = screen.getByText('Attributes Test');
    expect(heading).toHaveAttribute('id', 'test-id');
    expect(heading).toHaveAttribute('data-testid', 'custom-test');
  });

  it('applies default variants', () => {
    render(<Title>Default Variants</Title>);
    const heading = screen.getByText('Default Variants');
    expect(heading).toHaveClass('font-bold');
    expect(heading).toHaveClass('text-foreground');
    expect(heading).toHaveClass('text-left');
  });

  it('combines multiple variants', () => {
    render(
      <Title level="h2" weight="semibold" color="primary" align="center">
        Combined
      </Title>
    );
    const heading = screen.getByText('Combined');
    expect(heading.tagName).toBe('H2');
    expect(heading).toHaveClass('font-semibold');
    expect(heading).toHaveClass('text-primary');
    expect(heading).toHaveClass('text-center');
  });
});
