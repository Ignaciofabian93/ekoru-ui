import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Text } from './Text';
import '@testing-library/jest-dom';

describe('Text', () => {
  it('renders correctly', () => {
    render(<Text>Test Text</Text>);
    expect(screen.getByText('Test Text')).toBeInTheDocument();
  });

  it('renders as paragraph by default', () => {
    render(<Text>Default Text</Text>);
    const text = screen.getByText('Default Text');
    expect(text.tagName).toBe('P');
  });

  it('renders different variants', () => {
    const { rerender } = render(<Text variant="p">Paragraph</Text>);
    expect(screen.getByText('Paragraph').tagName).toBe('P');

    rerender(<Text variant="span">Span</Text>);
    expect(screen.getByText('Span').tagName).toBe('SPAN');

    rerender(<Text variant="label">Label</Text>);
    expect(screen.getByText('Label').tagName).toBe('LABEL');

    rerender(<Text variant="blockquote">Blockquote</Text>);
    expect(screen.getByText('Blockquote').tagName).toBe('BLOCKQUOTE');

    rerender(<Text variant="small">Small</Text>);
    expect(screen.getByText('Small').tagName).toBe('SMALL');

    rerender(<Text variant="code">Code</Text>);
    expect(screen.getByText('Code').tagName).toBe('CODE');
  });

  it('applies different sizes', () => {
    const { rerender } = render(<Text size="xs">Extra Small</Text>);
    expect(screen.getByText('Extra Small')).toHaveClass('text-xs');

    rerender(<Text size="sm">Small</Text>);
    expect(screen.getByText('Small')).toHaveClass('text-sm');

    rerender(<Text size="base">Base</Text>);
    expect(screen.getByText('Base')).toHaveClass('text-base');

    rerender(<Text size="lg">Large</Text>);
    expect(screen.getByText('Large')).toHaveClass('text-lg');

    rerender(<Text size="xl">Extra Large</Text>);
    expect(screen.getByText('Extra Large')).toHaveClass('text-xl');
  });

  it('applies different weights', () => {
    const { rerender } = render(<Text weight="normal">Normal</Text>);
    expect(screen.getByText('Normal')).toHaveClass('font-normal');

    rerender(<Text weight="medium">Medium</Text>);
    expect(screen.getByText('Medium')).toHaveClass('font-medium');

    rerender(<Text weight="semibold">Semibold</Text>);
    expect(screen.getByText('Semibold')).toHaveClass('font-semibold');

    rerender(<Text weight="bold">Bold</Text>);
    expect(screen.getByText('Bold')).toHaveClass('font-bold');
  });

  it('applies different colors', () => {
    const { rerender } = render(<Text color="default">Default</Text>);
    expect(screen.getByText('Default')).toHaveClass('text-foreground');

    rerender(<Text color="primary">Primary</Text>);
    expect(screen.getByText('Primary')).toHaveClass('text-primary');

    rerender(<Text color="secondary">Secondary</Text>);
    expect(screen.getByText('Secondary')).toHaveClass(
      'text-foreground-secondary'
    );

    rerender(<Text color="tertiary">Tertiary</Text>);
    expect(screen.getByText('Tertiary')).toHaveClass(
      'text-foreground-tertiary'
    );

    rerender(<Text color="error">Error</Text>);
    expect(screen.getByText('Error')).toHaveClass('text-error');

    rerender(<Text color="success">Success</Text>);
    expect(screen.getByText('Success')).toHaveClass('text-success');

    rerender(<Text color="warning">Warning</Text>);
    expect(screen.getByText('Warning')).toHaveClass('text-warning');

    rerender(<Text color="muted">Muted</Text>);
    expect(screen.getByText('Muted')).toHaveClass('text-muted');
  });

  it('applies different alignments', () => {
    const { rerender } = render(<Text align="left">Left</Text>);
    expect(screen.getByText('Left')).toHaveClass('text-left');

    rerender(<Text align="center">Center</Text>);
    expect(screen.getByText('Center')).toHaveClass('text-center');

    rerender(<Text align="right">Right</Text>);
    expect(screen.getByText('Right')).toHaveClass('text-right');

    rerender(<Text align="justify">Justify</Text>);
    expect(screen.getByText('Justify')).toHaveClass('text-justify');
  });

  it('applies custom className', () => {
    render(<Text className="custom-class">Custom</Text>);
    expect(screen.getByText('Custom')).toHaveClass('custom-class');
  });

  it('renders label with htmlFor attribute', () => {
    render(
      <Text variant="label" htmlFor="input-id">
        Label Text
      </Text>
    );
    const label = screen.getByText('Label Text');
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveAttribute('for', 'input-id');
  });

  it('does not apply htmlFor to non-label variants', () => {
    render(
      <Text variant="p" htmlFor="input-id">
        Paragraph Text
      </Text>
    );
    const paragraph = screen.getByText('Paragraph Text');
    expect(paragraph).not.toHaveAttribute('for');
  });

  it('renders different element using as prop', () => {
    render(
      <Text variant="p" as="div">
        Paragraph as Div
      </Text>
    );
    const element = screen.getByText('Paragraph as Div');
    expect(element.tagName).toBe('DIV');
    expect(element).toHaveClass('block');
  });

  it('applies htmlFor when as is label', () => {
    render(
      <Text variant="p" as="label" htmlFor="test-input">
        Label via as prop
      </Text>
    );
    const label = screen.getByText('Label via as prop');
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveAttribute('for', 'test-input');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Text ref={ref}>Ref Test</Text>);
    expect(ref).toHaveBeenCalled();
  });

  it('supports HTML attributes', () => {
    render(
      <Text id="test-id" data-testid="custom-test">
        Attributes Test
      </Text>
    );
    const text = screen.getByText('Attributes Test');
    expect(text).toHaveAttribute('id', 'test-id');
    expect(text).toHaveAttribute('data-testid', 'custom-test');
  });

  it('applies default variants', () => {
    render(<Text>Default Variants</Text>);
    const text = screen.getByText('Default Variants');
    expect(text).toHaveClass('font-normal');
    expect(text).toHaveClass('text-foreground');
    expect(text).toHaveClass('text-left');
    expect(text).toHaveClass('text-base');
  });

  it('combines multiple variants', () => {
    render(
      <Text variant="p" size="lg" weight="bold" color="primary" align="center">
        Combined
      </Text>
    );
    const text = screen.getByText('Combined');
    expect(text.tagName).toBe('P');
    expect(text).toHaveClass('text-lg');
    expect(text).toHaveClass('font-bold');
    expect(text).toHaveClass('text-primary');
    expect(text).toHaveClass('text-center');
  });

  it('applies blockquote styling', () => {
    render(<Text variant="blockquote">Quote</Text>);
    const quote = screen.getByText('Quote');
    expect(quote).toHaveClass('border-l-4');
    expect(quote).toHaveClass('border-primary');
    expect(quote).toHaveClass('italic');
  });

  it('applies code styling', () => {
    render(<Text variant="code">const x = 42;</Text>);
    const code = screen.getByText('const x = 42;');
    expect(code).toHaveClass('font-mono');
    expect(code).toHaveClass('bg-background-secondary');
    expect(code).toHaveClass('rounded');
  });

  it('applies label cursor pointer', () => {
    render(<Text variant="label">Click me</Text>);
    expect(screen.getByText('Click me')).toHaveClass('cursor-pointer');
  });
});
