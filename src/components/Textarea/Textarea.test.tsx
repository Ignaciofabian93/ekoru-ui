import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Textarea } from './Textarea';
import '@testing-library/jest-dom';

describe('Textarea', () => {
  it('renders correctly', () => {
    render(<Textarea placeholder="Test textarea" />);
    expect(screen.getByPlaceholderText('Test textarea')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Textarea label="Message" placeholder="Enter text" />);
    expect(screen.getByText('Message')).toBeInTheDocument();
  });

  it('handles value', () => {
    render(<Textarea value="Test value" onChange={vi.fn()} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('Test value');
  });

  it('calls onChange when text is entered', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Textarea onChange={handleChange} />);

    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'Hello');

    expect(handleChange).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Textarea disabled={true} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
  });

  it('is read-only when readOnly prop is true', () => {
    render(<Textarea readOnly={true} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('readonly');
  });

  it('applies different variants', () => {
    const { rerender } = render(<Textarea variant="default" />);
    let textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('bg-input-bg');

    rerender(<Textarea variant="filled" />);
    textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('bg-background-secondary');

    rerender(<Textarea variant="outline" />);
    textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('bg-transparent');
  });

  it('applies different text sizes', () => {
    const { rerender } = render(<Textarea textSize="sm" />);
    let textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('text-sm');

    rerender(<Textarea textSize="md" />);
    textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('text-base');

    rerender(<Textarea textSize="lg" />);
    textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('text-lg');
  });

  it('displays error message', () => {
    render(<Textarea errorMessage="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('applies error styling when errorMessage is provided', () => {
    render(<Textarea errorMessage="Error" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('border-error');
  });

  it('shows character count when showCharCount is true', () => {
    render(
      <Textarea
        maxLength={100}
        showCharCount={true}
        value="Hello"
        onChange={vi.fn()}
      />
    );
    expect(screen.getByText('5 / 100')).toBeInTheDocument();
  });

  it('does not show character count when showCharCount is false', () => {
    const { container } = render(
      <Textarea
        maxLength={100}
        showCharCount={false}
        value="Hello"
        onChange={vi.fn()}
      />
    );
    expect(container.textContent).not.toContain('5 / 100');
  });

  it('respects maxLength attribute', () => {
    render(<Textarea maxLength={10} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('maxLength', '10');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Textarea ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('uses provided id', () => {
    render(<Textarea id="custom-id" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('id', 'custom-id');
  });

  it('uses name for id when id is not provided', () => {
    render(<Textarea name="test-name" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('name', 'test-name');
  });

  it('applies custom className', () => {
    render(<Textarea className="custom-class" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('custom-class');
  });

  it('applies different widths', () => {
    const { rerender, container } = render(<Textarea width="sm" />);
    let wrapper = container.firstChild;
    expect(wrapper).toHaveClass('w-1/3');

    rerender(<Textarea width="md" />);
    wrapper = container.firstChild;
    expect(wrapper).toHaveClass('w-1/2');

    rerender(<Textarea width="lg" />);
    wrapper = container.firstChild;
    expect(wrapper).toHaveClass('w-2/3');

    rerender(<Textarea width="full" />);
    wrapper = container.firstChild;
    expect(wrapper).toHaveClass('w-full');
  });

  it('supports all HTML textarea attributes', () => {
    render(<Textarea placeholder="Test" rows={5} cols={30} required />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('placeholder', 'Test');
    expect(textarea).toHaveAttribute('rows', '5');
    expect(textarea).toHaveAttribute('cols', '30');
    expect(textarea).toBeRequired();
  });

  it('handles empty value correctly', () => {
    render(
      <Textarea
        value=""
        onChange={vi.fn()}
        showCharCount={true}
        maxLength={100}
      />
    );
    expect(screen.getByText('0 / 100')).toBeInTheDocument();
  });
});
