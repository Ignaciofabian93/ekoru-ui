import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Modal from './Modal';

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    children: <div>Modal Content</div>,
  };

  beforeEach(() => {
    // Clean up from previous tests
    document.body.innerHTML = '';
  });

  afterEach(() => {
    // Cleanup React components first
    cleanup();
    // Then clean up DOM
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  it('renders modal when isOpen is true', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render modal when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('renders modal title when provided', () => {
    render(<Modal {...defaultProps} title="Test Modal" />);
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });

  it('renders close button by default', () => {
    render(<Modal {...defaultProps} title="Test Modal" />);
    const closeButton = screen.getByRole('button', { name: 'Close modal' });
    expect(closeButton).toBeInTheDocument();
  });

  it('hides close button when showCloseButton is false', () => {
    render(
      <Modal {...defaultProps} title="Test Modal" showCloseButton={false} />
    );
    expect(
      screen.queryByRole('button', { name: 'Close modal' })
    ).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<Modal {...defaultProps} onClose={onClose} title="Test" />);

    const closeButton = screen.getByRole('button', { name: 'Close modal' });
    await user.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked by default', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<Modal {...defaultProps} onClose={onClose} />);

    const dialog = screen.getByRole('dialog');
    const overlay = dialog.querySelector('.bg-black\\/60');
    if (overlay) {
      await user.click(overlay as HTMLElement);
    }

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when overlay is clicked if closeOnOverlayClick is false', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Modal {...defaultProps} onClose={onClose} closeOnOverlayClick={false} />
    );

    const dialog = screen.getByRole('dialog');
    const overlay = dialog.querySelector('.bg-black\\/60');
    if (overlay) {
      await user.click(overlay as HTMLElement);
    }

    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when Escape key is pressed by default', () => {
    const onClose = vi.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when Escape key is pressed if closeOnEscape is false', () => {
    const onClose = vi.fn();
    render(<Modal {...defaultProps} onClose={onClose} closeOnEscape={false} />);

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

    expect(onClose).not.toHaveBeenCalled();
  });

  it('prevents body scroll when modal is open', () => {
    render(<Modal {...defaultProps} />);

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when modal is closed', () => {
    const { rerender } = render(<Modal {...defaultProps} />);

    expect(document.body.style.overflow).toBe('hidden');

    rerender(<Modal {...defaultProps} isOpen={false} />);

    // Should restore to original value or unset
    expect(['', 'unset', 'visible']).toContain(document.body.style.overflow);
  });

  it('applies correct size class for small modal', () => {
    render(<Modal {...defaultProps} size="sm" title="Small" />);
    const dialog = screen.getByRole('dialog');
    const modalContainer = dialog.querySelector('.max-w-md');
    expect(modalContainer).toBeInTheDocument();
  });

  it('applies correct size class for medium modal', () => {
    render(<Modal {...defaultProps} size="md" title="Medium" />);
    const dialog = screen.getByRole('dialog');
    const modalContainer = dialog.querySelector('.max-w-lg');
    expect(modalContainer).toBeInTheDocument();
  });

  it('applies correct size class for large modal', () => {
    render(<Modal {...defaultProps} size="lg" title="Large" />);
    const dialog = screen.getByRole('dialog');
    const modalContainer = dialog.querySelector('.max-w-2xl');
    expect(modalContainer).toBeInTheDocument();
  });

  it('applies correct size class for xl modal', () => {
    render(<Modal {...defaultProps} size="xl" title="XL" />);
    const dialog = screen.getByRole('dialog');
    const modalContainer = dialog.querySelector('.max-w-4xl');
    expect(modalContainer).toBeInTheDocument();
  });

  it('applies correct size class for full modal', () => {
    render(<Modal {...defaultProps} size="full" title="Full" />);
    const dialog = screen.getByRole('dialog');
    const modalContainer = dialog.querySelector('.max-w-7xl');
    expect(modalContainer).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Modal {...defaultProps} className="custom-class" title="Custom" />);
    const dialog = screen.getByRole('dialog');
    const modalContainer = dialog.querySelector('.custom-class');
    expect(modalContainer).toBeInTheDocument();
  });

  it('has correct ARIA attributes', () => {
    render(<Modal {...defaultProps} title="Accessible Modal" />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
  });

  it('stops propagation when clicking modal content', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<Modal {...defaultProps} onClose={onClose} />);

    const content = screen.getByText('Modal Content');
    await user.click(content);

    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders children correctly', () => {
    render(
      <Modal {...defaultProps}>
        <div>
          <h2>Custom Title</h2>
          <p>Custom paragraph</p>
        </div>
      </Modal>
    );

    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom paragraph')).toBeInTheDocument();
  });

  it('cleans up event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
    const { unmount } = render(<Modal {...defaultProps} />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function)
    );
  });

  it('renders header with only title when showCloseButton is false', () => {
    render(
      <Modal {...defaultProps} title="Title Only" showCloseButton={false} />
    );

    expect(screen.getByText('Title Only')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Close modal' })
    ).not.toBeInTheDocument();
  });

  it('renders header with only close button when title is not provided', () => {
    render(<Modal {...defaultProps} />);

    expect(
      screen.getByRole('button', { name: 'Close modal' })
    ).toBeInTheDocument();
  });
});
