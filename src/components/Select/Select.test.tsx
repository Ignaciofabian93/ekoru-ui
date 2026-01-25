import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Select } from './Select';
import { MapPin } from 'lucide-react';
import '@testing-library/jest-dom';

const mockOptions = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' },
];

const colorOptions = [
  { label: 'Red', value: 'red', iconColor: '#EF4444' },
  { label: 'Blue', value: 'blue', iconColor: '#3B82F6' },
];

describe('Select', () => {
  it('renders correctly', () => {
    const onChange = vi.fn();
    render(
      <Select
        placeholder="Select option"
        options={mockOptions}
        onChange={onChange}
      />
    );
    expect(screen.getByText('Select option')).toBeInTheDocument();
  });

  it('renders with label', () => {
    const onChange = vi.fn();
    render(
      <Select
        label="Country"
        placeholder="Choose country"
        options={mockOptions}
        onChange={onChange}
      />
    );
    expect(screen.getByText('Country')).toBeInTheDocument();
  });

  it('opens dropdown when clicked', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Select
        name="test-select"
        placeholder="Select"
        options={mockOptions}
        onChange={onChange}
      />
    );

    const button = screen.getByRole('button');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
  });

  it('selects an option when clicked', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Select placeholder="Select" options={mockOptions} onChange={onChange} />
    );

    const button = screen.getByRole('button');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    const option = screen.getByText('Option 1');
    await user.click(option);

    expect(onChange).toHaveBeenCalledWith('opt1');
  });

  it('displays selected value', () => {
    const onChange = vi.fn();
    render(
      <Select
        placeholder="Select"
        options={mockOptions}
        value="opt2"
        onChange={onChange}
      />
    );

    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('renders with left icon', () => {
    const onChange = vi.fn();
    const { container } = render(
      <Select
        placeholder="Select"
        leftIcon={MapPin}
        options={mockOptions}
        onChange={onChange}
      />
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies default variant by default', () => {
    const onChange = vi.fn();
    render(
      <Select placeholder="Select" options={mockOptions} onChange={onChange} />
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-input-bg');
  });

  it('applies filled variant correctly', () => {
    const onChange = vi.fn();
    render(
      <Select
        placeholder="Select"
        variant="filled"
        options={mockOptions}
        onChange={onChange}
      />
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-background');
  });

  it('applies outline variant correctly', () => {
    const onChange = vi.fn();
    render(
      <Select
        placeholder="Select"
        variant="outline"
        options={mockOptions}
        onChange={onChange}
      />
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-transparent');
  });

  it('applies different sizes', () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <Select
        placeholder="Select"
        size="sm"
        options={mockOptions}
        onChange={onChange}
      />
    );
    expect(screen.getByRole('button')).toHaveClass('h-9');

    rerender(
      <Select
        placeholder="Select"
        size="md"
        options={mockOptions}
        onChange={onChange}
      />
    );
    expect(screen.getByRole('button')).toHaveClass('h-11');

    rerender(
      <Select
        placeholder="Select"
        size="lg"
        options={mockOptions}
        onChange={onChange}
      />
    );
    expect(screen.getByRole('button')).toHaveClass('h-14');
  });

  it('is disabled when disabled prop is true', () => {
    const onChange = vi.fn();
    render(
      <Select
        placeholder="Select"
        options={mockOptions}
        onChange={onChange}
        disabled
      />
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('displays error message', () => {
    const onChange = vi.fn();
    render(
      <Select
        placeholder="Select"
        options={mockOptions}
        onChange={onChange}
        errorMessage="This field is required"
      />
    );
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('applies error styling when errorMessage is provided', () => {
    const onChange = vi.fn();
    render(
      <Select
        placeholder="Select"
        options={mockOptions}
        onChange={onChange}
        errorMessage="Error"
      />
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('border-error');
  });

  it('filters options with search', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Select
        name="search-select"
        placeholder="Select"
        options={mockOptions}
        onChange={onChange}
        searchEnabled={true}
      />
    );

    const button = screen.getByRole('button');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search...');
    await user.type(searchInput, 'Option 1');

    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
    });
  });

  it('shows "No results found" when search has no matches', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Select
        name="search-select"
        placeholder="Select"
        options={mockOptions}
        onChange={onChange}
        searchEnabled={true}
      />
    );

    const button = screen.getByRole('button');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search...');
    await user.type(searchInput, 'nonexistent');

    await waitFor(() => {
      expect(screen.getByText('No results found')).toBeInTheDocument();
    });
  });

  it('renders color icons when showColorIcon is true', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Select
        placeholder="Select color"
        options={colorOptions}
        onChange={onChange}
        showColorIcon={true}
      />
    );

    const button = screen.getByRole('button');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    // Color circles should be rendered
    const circles = screen.getAllByText((_content, element) => {
      return element?.tagName.toLowerCase() === 'svg';
    });
    expect(circles.length).toBeGreaterThan(0);
  });

  it('supports keyboard navigation', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Select
        name="keyboard-select"
        placeholder="Select"
        options={mockOptions}
        onChange={onChange}
      />
    );

    const button = screen.getByRole('button');
    button.focus();

    // Open with Enter
    await user.keyboard('{Enter}');
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    // Press Enter to select first highlighted option
    await user.keyboard('{Enter}');

    expect(onChange).toHaveBeenCalledWith('opt1');
  });

  it('closes dropdown on Escape key', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Select
        name="escape-select"
        placeholder="Select"
        options={mockOptions}
        onChange={onChange}
      />
    );

    const button = screen.getByRole('button');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  it('does not open when readOnly', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Select
        placeholder="Select"
        options={mockOptions}
        onChange={onChange}
        readOnly
      />
    );

    const button = screen.getByRole('button');
    await user.click(button);

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const onChange = vi.fn();
    const ref = vi.fn();
    render(
      <Select
        ref={ref}
        placeholder="Select"
        options={mockOptions}
        onChange={onChange}
      />
    );
    expect(ref).toHaveBeenCalled();
  });
});
