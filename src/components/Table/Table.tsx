import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { motion } from 'motion/react';

const tableVariants = cva('w-full table-auto border-collapse', {
  variants: {
    variant: {
      default: '',
      outlined: 'border border-border rounded-lg overflow-hidden',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
    striped: {
      true: '',
    },
    hover: {
      true: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export type Column<T> = {
  key: string;
  header: React.ReactNode;
  /** optional custom cell renderer (value, row) */
  render?: (value: unknown, row: T) => React.ReactNode;
  className?: string;
};

export interface TableProps<T>
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof tableVariants> {
  columns: Column<T>[];
  data: T[];
  rowKey?: (row: T) => string | number;
  emptyMessage?: React.ReactNode;
}

const Table = React.forwardRef<
  HTMLDivElement,
  TableProps<Record<string, unknown>>
>(
  (
    {
      columns,
      data,
      rowKey,
      className,
      variant,
      size,
      striped,
      hover,
      emptyMessage = 'No data',
      ...props
    },
    ref
  ) => {
    // motion.div props types can conflict with standard HTML props in some setups;
    // cast to `any` to avoid excessive type incompatibilities when spreading HTML attributes.
    const MotionDiv: React.ElementType = motion.div;

    return (
      <MotionDiv
        ref={ref}
        className={cn('w-full overflow-auto', className)}
        initial={{ opacity: 0, y: -6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
        {...props}
      >
        <table className={cn(tableVariants({ variant, size }))} role="table">
          <thead className="bg-primary text-white">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'text-left px-4 py-2 font-medium text-white',
                    col.className
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  className="px-4 py-6 text-center text-text-muted"
                  colSpan={columns.length}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, idx) => {
                const key = rowKey
                  ? rowKey(row)
                  : ((row as Record<string, unknown>).id ?? idx);
                return (
                  <tr
                    key={String(key)}
                    className={cn(
                      striped && idx % 2 === 1
                        ? 'bg-neutral/5 dark:bg-stone-800/40'
                        : '',
                      hover
                        ? 'hover:bg-neutral/5 dark:hover:bg-stone-800/50'
                        : ''
                    )}
                  >
                    {columns.map((col) => {
                      const value = (row as Record<string, unknown>)[col.key];
                      return (
                        <td key={col.key} className="px-4 py-3 align-top">
                          {col.render
                            ? col.render(value, row)
                            : String(value ?? '')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </MotionDiv>
    );
  }
);

Table.displayName = 'Table';

export { Table, tableVariants };

export default Table;
