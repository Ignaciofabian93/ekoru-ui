import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Pagination } from './Pagination';
import '@testing-library/jest-dom';

describe('Pagination', () => {
  it('renders correctly', () => {
    render(
      <Pagination currentPage={1} totalPages={10} onPageChange={vi.fn()} />
    );
    expect(screen.getByText('Page 1 of 10')).toBeInTheDocument();
  });

  it('renders previous and next buttons', () => {
    render(
      <Pagination currentPage={1} totalPages={10} onPageChange={vi.fn()} />
    );
    expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to next page')).toBeInTheDocument();
  });

  it('calls onPageChange when next is clicked', async () => {
    const handlePageChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={handlePageChange}
      />
    );

    const nextButton = screen.getByLabelText('Go to next page');
    await user.click(nextButton);

    expect(handlePageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange when previous is clicked', async () => {
    const handlePageChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Pagination
        currentPage={2}
        totalPages={10}
        onPageChange={handlePageChange}
      />
    );

    const prevButton = screen.getByLabelText('Go to previous page');
    await user.click(prevButton);

    expect(handlePageChange).toHaveBeenCalledWith(1);
  });

  it('disables previous button on first page', () => {
    render(
      <Pagination currentPage={1} totalPages={10} onPageChange={vi.fn()} />
    );
    const prevButton = screen.getByLabelText('Go to previous page');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(
      <Pagination currentPage={10} totalPages={10} onPageChange={vi.fn()} />
    );
    const nextButton = screen.getByLabelText('Go to next page');
    expect(nextButton).toBeDisabled();
  });

  it('renders custom button labels', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={vi.fn()}
        previousLabel="Anterior"
        nextLabel="Siguiente"
      />
    );
    expect(screen.getByText('Anterior')).toBeInTheDocument();
    expect(screen.getByText('Siguiente')).toBeInTheDocument();
  });

  it('renders custom page info template', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={vi.fn()}
        pageInfoTemplate="Página {current} de {total}"
      />
    );
    expect(screen.getByText('Página 3 de 10')).toBeInTheDocument();
  });

  it('hides page info when showPageInfo is false', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={vi.fn()}
        showPageInfo={false}
      />
    );
    expect(container.textContent).not.toContain('Page 1 of 10');
  });

  it('renders items per page selector', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={vi.fn()}
        itemsPerPage={10}
        onItemsPerPageChange={vi.fn()}
        showItemsPerPage={true}
      />
    );
    expect(screen.getByText('Rows:')).toBeInTheDocument();
  });

  it('hides items per page selector when showItemsPerPage is false', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={vi.fn()}
        showItemsPerPage={false}
      />
    );
    expect(container.textContent).not.toContain('Rows:');
  });

  it('renders without icons when showIcons is false', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={vi.fn()}
        showIcons={false}
      />
    );
    const buttons = container.querySelectorAll('button');
    const hasSvg = Array.from(buttons).some((button) =>
      button.querySelector('svg')
    );
    expect(hasSvg).toBe(false);
  });

  it('applies different variants', () => {
    const { rerender } = render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={vi.fn()}
        variant="default"
      />
    );
    let prevButton = screen.getByLabelText('Go to previous page');
    expect(prevButton).toHaveClass('bg-background-secondary');

    rerender(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={vi.fn()}
        variant="primary"
      />
    );
    prevButton = screen.getByLabelText('Go to previous page');
    expect(prevButton).toHaveClass('bg-primary');

    rerender(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={vi.fn()}
        variant="outline"
      />
    );
    prevButton = screen.getByLabelText('Go to previous page');
    expect(prevButton).toHaveClass('border-primary');
  });

  it('applies different sizes', () => {
    const { rerender } = render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={vi.fn()}
        size="sm"
      />
    );
    let prevButton = screen.getByLabelText('Go to previous page');
    expect(prevButton).toHaveClass('h-8');

    rerender(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={vi.fn()}
        size="md"
      />
    );
    prevButton = screen.getByLabelText('Go to previous page');
    expect(prevButton).toHaveClass('h-10');

    rerender(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={vi.fn()}
        size="lg"
      />
    );
    prevButton = screen.getByLabelText('Go to previous page');
    expect(prevButton).toHaveClass('h-12');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(
      <Pagination
        ref={ref}
        currentPage={1}
        totalPages={10}
        onPageChange={vi.fn()}
      />
    );
    expect(ref).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={vi.fn()}
        className="custom-class"
      />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('does not change page when clicking disabled previous', async () => {
    const handlePageChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={handlePageChange}
      />
    );

    const prevButton = screen.getByLabelText('Go to previous page');
    await user.click(prevButton);

    expect(handlePageChange).not.toHaveBeenCalled();
  });

  it('does not change page when clicking disabled next', async () => {
    const handlePageChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Pagination
        currentPage={10}
        totalPages={10}
        onPageChange={handlePageChange}
      />
    );

    const nextButton = screen.getByLabelText('Go to next page');
    await user.click(nextButton);

    expect(handlePageChange).not.toHaveBeenCalled();
  });

  it('handles single page correctly', () => {
    render(
      <Pagination currentPage={1} totalPages={1} onPageChange={vi.fn()} />
    );
    const prevButton = screen.getByLabelText('Go to previous page');
    const nextButton = screen.getByLabelText('Go to next page');
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });
});
