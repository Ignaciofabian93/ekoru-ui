import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './Checkbox';
import '@testing-library/jest-dom';

describe('Checkbox', () => {
  it('renders correctly', () => {
    render(<Checkbox label="Test checkbox" />);
    expect(screen.getByText('Test checkbox')).toBeInTheDocument();
  });

  it('renders without label', () => {
    const { container } = render(<Checkbox aria-label="Unlabeled checkbox" />);
    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeInTheDocument();
  });

  it('renders with description', () => {
    render(
      <Checkbox label="Test checkbox" description="This is a description" />
    );
    expect(screen.getByText('This is a description')).toBeInTheDocument();
  });

  it('handles checked state', () => {
    render(<Checkbox label="Test" checked={true} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('handles unchecked state', () => {
    render(<Checkbox label="Test" checked={false} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('calls onCheckedChange when clicked', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Checkbox label="Test" checked={false} onCheckedChange={handleChange} />
    );

    const button = screen.getByRole('button');
    await user.click(button);

    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('calls onChange when checkbox input changes', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Checkbox label="Test" checked={false} onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(handleChange).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Checkbox label="Test" disabled={true} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('does not call onChange when disabled', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Checkbox label="Test" disabled={true} onCheckedChange={handleChange} />
    );

    const button = screen.getByRole('button');
    await user.click(button);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies different sizes', () => {
    const { rerender } = render(<Checkbox label="Test" size="sm" />);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('w-4');

    rerender(<Checkbox label="Test" size="md" />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('w-5');

    rerender(<Checkbox label="Test" size="lg" />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('w-6');
  });

  it('applies different variants', () => {
    const { rerender } = render(<Checkbox label="Test" variant="default" />);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('border-input-border');

    rerender(<Checkbox label="Test" variant="filled" />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('bg-background-secondary');

    rerender(<Checkbox label="Test" variant="outline" />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('border-primary');
  });

  it('displays error message', () => {
    render(<Checkbox label="Test" errorMessage="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('applies error styling to label', () => {
    render(<Checkbox label="Test" errorMessage="Error" />);
    const label = screen.getByText('Test');
    expect(label).toHaveClass('text-error');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Checkbox ref={ref} label="Test" />);
    expect(ref).toHaveBeenCalled();
  });

  it('uses provided id', () => {
    render(<Checkbox id="custom-id" label="Test" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('id', 'custom-id');
  });

  it('uses name for id when id is not provided', () => {
    render(<Checkbox name="test-name" label="Test" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('name', 'test-name');
  });

  it('supports custom className', () => {
    render(<Checkbox label="Test" className="custom-class" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('label is clickable', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Checkbox
        label="Clickable label"
        checked={false}
        onCheckedChange={handleChange}
      />
    );

    const label = screen.getByText('Clickable label');
    await user.click(label);

    expect(handleChange).toHaveBeenCalledWith(true);
  });
});
