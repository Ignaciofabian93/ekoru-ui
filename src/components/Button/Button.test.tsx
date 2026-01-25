import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';
import { Download } from 'lucide-react';
import '@testing-library/jest-dom';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('applies primary variant by default', () => {
    render(<Button>Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-primary');
  });

  it('applies secondary variant correctly', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-secondary');
  });

  it('applies outline variant correctly', () => {
    render(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-2');
  });

  it('applies secondary_outline variant correctly', () => {
    render(<Button variant="secondary_outline">Secondary Outline</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('border-2');
    expect(btn).toHaveClass('text-secondary');
  });

  it('applies different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('min-h-[36px]');

    rerender(<Button size="md">Medium</Button>);
    expect(screen.getByRole('button')).toHaveClass('min-h-[44px]');

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('min-h-[56px]');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows loading state', () => {
    render(<Button isLoading>Loading</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button.querySelector('svg')).toBeInTheDocument();
    expect(button).toHaveTextContent('Loading...');
  });

  it('shows custom loading text', () => {
    render(
      <Button isLoading loadingText="Please wait...">
        Submit
      </Button>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Please wait...');
    expect(button).not.toHaveTextContent('Submit');
  });

  it('renders with left icon', () => {
    render(
      <Button leftIcon={<span data-testid="left-icon">←</span>}>
        With Icon
      </Button>
    );

    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders with both left and right icons', () => {
    render(
      <Button
        leftIcon={<span data-testid="left-icon">←</span>}
        rightIcon={<span data-testid="right-icon">→</span>}
      >
        Both Icons
      </Button>
    );

    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Both Icons');
  });

  it('renders lucide-react icon components', () => {
    render(<Button leftIcon={Download}>Download</Button>);

    const button = screen.getByRole('button');
    const svg = button.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('hides icons when loading', () => {
    render(
      <Button
        leftIcon={<span data-testid="left-icon">←</span>}
        rightIcon={<span data-testid="right-icon">→</span>}
        isLoading
      >
        Loading
      </Button>
    );

    expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument();
  });

  it('applies correct icon spacing classes', () => {
    const { container } = render(
      <Button leftIcon={<span data-testid="left-icon">←</span>}>
        With Icon
      </Button>
    );

    const iconSpan = container.querySelector('span.mr-2');
    expect(iconSpan).toBeInTheDocument();
  });

  it('renders icons with flex-shrink-0 class for alignment', () => {
    const { container } = render(<Button leftIcon={Download}>Download</Button>);

    const iconSpan = container.querySelector('.flex-shrink-0');
    expect(iconSpan).toBeInTheDocument();
  });

  it('renders with right icon', () => {
    render(
      <Button rightIcon={<span data-testid="right-icon">→</span>}>
        With Icon
      </Button>
    );

    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('applies fullWidth variant', () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Button ref={ref}>Button</Button>);
    expect(ref).toHaveBeenCalled();
  });

  it('merges custom className with variant classes', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('bg-primary'); // Still has variant class
  });
});
