import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { Select } from '../Select';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const paginationButtonVariants = cva(
  'flex items-center justify-center min-w-[120px] rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-background-secondary text-foreground hover:bg-background border-2 border-transparent focus:border-primary focus:ring-primary/20',
        primary:
          'bg-primary text-white hover:bg-primary-hover focus:ring-primary/20',
        outline:
          'bg-transparent border-2 border-primary text-foreground hover:bg-primary/5 focus:ring-primary/20',
      },
      size: {
        sm: 'h-8 px-2 text-sm gap-1',
        md: 'h-10 px-2.5 text-base gap-2',
        lg: 'h-12 px-3 text-lg gap-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

type PaginationVariantProps = VariantProps<typeof paginationButtonVariants>;

export interface PaginationProps extends PaginationVariantProps {
  /**
   * Current active page (1-indexed)
   */
  currentPage: number;
  /**
   * Total number of pages
   */
  totalPages: number;
  /**
   * Callback when page changes
   */
  onPageChange: (page: number) => void;
  /**
   * Items per page value
   */
  itemsPerPage?: number;
  /**
   * Callback when items per page changes
   */
  onItemsPerPageChange?: (pageSize: number) => void;
  /**
   * Label for the previous button
   */
  previousLabel?: string;
  /**
   * Label for the next button
   */
  nextLabel?: string;
  /**
   * Show items per page selector
   */
  showItemsPerPage?: boolean;
  /**
   * Available items per page options
   */
  itemsPerPageOptions?: number[];
  /**
   * Show page info text
   */
  showPageInfo?: boolean;
  /**
   * Custom page info text template
   */
  pageInfoTemplate?: string;
  /**
   * Show icons in buttons
   */
  showIcons?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  rowsLabel?: string;
  previousAriaLabel?: string;
  nextAriaLabel?: string;
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      onPageChange,
      itemsPerPage = 10,
      onItemsPerPageChange,
      previousLabel = 'Previous',
      nextLabel = 'Next',
      rowsLabel = 'Rows:',
      previousAriaLabel = 'Go to previous page',
      nextAriaLabel = 'Go to next page',
      showItemsPerPage = true,
      itemsPerPageOptions = [10, 25, 50, 100],
      showPageInfo = true,
      pageInfoTemplate = 'Page {current} of {total}',
      showIcons = true,
      variant,
      size,
      className,
    },
    ref
  ) => {
    const rowsOptions = itemsPerPageOptions.map((num) => ({
      label: num.toString(),
      value: num,
    }));

    const pageInfo = pageInfoTemplate
      .replace('{current}', currentPage.toString())
      .replace('{total}', totalPages.toString());

    const handlePrevious = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };

    const handleNext = () => {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-between gap-4 md:flex-row',
          className
        )}
      >
        {showPageInfo && (
          <span className="text-sm font-medium text-foreground">
            {pageInfo}
          </span>
        )}
        <div className="flex items-center gap-4">
          {showItemsPerPage && onItemsPerPageChange && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">
                {rowsLabel}
              </span>
              <Select
                value={itemsPerPage}
                onChange={(value) => onItemsPerPageChange(value as number)}
                options={rowsOptions}
                size={size}
                variant={
                  variant === 'primary' || variant === null
                    ? 'default'
                    : variant
                }
                dropdownDirection="up"
                searchEnabled={false}
                width="lg"
              />
            </div>
          )}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={cn(paginationButtonVariants({ variant, size }))}
              aria-label={previousAriaLabel}
            >
              {showIcons && <ChevronLeft size={16} />}
              {previousLabel}
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={cn(paginationButtonVariants({ variant, size }))}
              aria-label={nextAriaLabel}
            >
              {nextLabel}
              {showIcons && <ChevronRight size={16} />}
            </button>
          </div>
        </div>
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';

export { Pagination, paginationButtonVariants };
