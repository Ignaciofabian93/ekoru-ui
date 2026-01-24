import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { TextInput } from './TextInput';
import { Mail, User } from 'lucide-react';

describe('TextInput', () => {
  it('renders correctly', () => {
    render(<TextInput placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<TextInput label="Email" placeholder="Enter email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
  });

  it('handles input changes', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<TextInput placeholder="Type here" onChange={handleChange} />);

    const input = screen.getByPlaceholderText('Type here');
    await user.type(input, 'Hello');

    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue('Hello');
  });

  it('renders with left icon', () => {
    const { container } = render(
      <TextInput placeholder="Email" leftIcon={Mail} />
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies default variant by default', () => {
    render(<TextInput placeholder="Test" />);
    const input = screen.getByPlaceholderText('Test');
    expect(input).toHaveClass('bg-input-bg');
  });

  it('applies filled variant correctly', () => {
    render(<TextInput placeholder="Test" variant="filled" />);
    const input = screen.getByPlaceholderText('Test');
    expect(input).toHaveClass('bg-background-secondary');
  });

  it('applies outline variant correctly', () => {
    render(<TextInput placeholder="Test" variant="outline" />);
    const input = screen.getByPlaceholderText('Test');
    expect(input).toHaveClass('bg-transparent');
  });

  it('applies different sizes', () => {
    const { rerender } = render(<TextInput placeholder="Test" size="sm" />);
    expect(screen.getByPlaceholderText('Test')).toHaveClass('h-9');

    rerender(<TextInput placeholder="Test" size="md" />);
    expect(screen.getByPlaceholderText('Test')).toHaveClass('h-11');

    rerender(<TextInput placeholder="Test" size="lg" />);
    expect(screen.getByPlaceholderText('Test')).toHaveClass('h-14');
  });

  it('is disabled when disabled prop is true', () => {
    render(<TextInput placeholder="Test" disabled />);
    expect(screen.getByPlaceholderText('Test')).toBeDisabled();
  });

  it('displays error message', () => {
    render(
      <TextInput placeholder="Test" errorMessage="This field is required" />
    );
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('applies error styling when hasError is true', () => {
    render(<TextInput placeholder="Test" hasError />);
    const input = screen.getByPlaceholderText('Test');
    expect(input).toHaveClass('border-error');
  });

  it('renders password input with toggle', () => {
    render(<TextInput placeholder="Password" type="password" />);
    const input = screen.getByPlaceholderText('Password');
    expect(input).toHaveAttribute('type', 'password');

    // Check for eye icon button
    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();
  });

  it('toggles password visibility', async () => {
    const user = userEvent.setup();
    render(<TextInput placeholder="Password" type="password" />);

    const input = screen.getByPlaceholderText('Password');
    const toggleButton = screen.getByRole('button');

    expect(input).toHaveAttribute('type', 'password');

    await user.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');

    await user.click(toggleButton);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<TextInput ref={ref} placeholder="Test" />);
    expect(ref).toHaveBeenCalled();
  });

  it('merges custom className with variant classes', () => {
    render(<TextInput placeholder="Test" className="custom-class" />);
    const input = screen.getByPlaceholderText('Test');
    expect(input).toHaveClass('custom-class');
    expect(input).toHaveClass('rounded-lg'); // Still has base class
  });

  it('handles focus and blur events', async () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    const user = userEvent.setup();

    render(
      <TextInput placeholder="Test" onFocus={handleFocus} onBlur={handleBlur} />
    );

    const input = screen.getByPlaceholderText('Test');

    await user.click(input);
    expect(handleFocus).toHaveBeenCalledOnce();

    await user.tab();
    expect(handleBlur).toHaveBeenCalledOnce();
  });

  it('applies correct padding with icon', () => {
    const { rerender } = render(<TextInput placeholder="Test" />);
    expect(screen.getByPlaceholderText('Test')).toHaveClass('pl-3');

    rerender(<TextInput placeholder="Test" leftIcon={User} />);
    expect(screen.getByPlaceholderText('Test')).toHaveClass('pl-10');
  });

  it('accepts all standard input attributes', () => {
    render(
      <TextInput
        placeholder="Test"
        maxLength={50}
        minLength={2}
        required
        autoComplete="email"
      />
    );
    const input = screen.getByPlaceholderText('Test');
    expect(input).toHaveAttribute('maxLength', '50');
    expect(input).toHaveAttribute('minLength', '2');
    expect(input).toBeRequired();
    expect(input).toHaveAttribute('autoComplete', 'email');
  });

  it('handles different input types', () => {
    const { rerender } = render(<TextInput placeholder="Test" type="email" />);
    expect(screen.getByPlaceholderText('Test')).toHaveAttribute(
      'type',
      'email'
    );

    rerender(<TextInput placeholder="Test" type="number" />);
    expect(screen.getByPlaceholderText('Test')).toHaveAttribute(
      'type',
      'number'
    );

    rerender(<TextInput placeholder="Test" type="search" />);
    expect(screen.getByPlaceholderText('Test')).toHaveAttribute(
      'type',
      'search'
    );
  });
});
