import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const titleVariants = cva('font-bold tracking-tight transition-colors', {
  variants: {
    level: {
      h1: 'text-5xl md:text-6xl lg:text-7xl',
      h2: 'text-4xl md:text-5xl lg:text-6xl',
      h3: 'text-3xl md:text-4xl lg:text-5xl',
      h4: 'text-2xl md:text-3xl lg:text-4xl',
      h5: 'text-xl md:text-2xl lg:text-3xl',
      h6: 'text-lg md:text-xl lg:text-2xl',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
    },
    color: {
      default: 'text-foreground',
      primary: 'text-primary',
      secondary: 'text-foreground-secondary',
      tertiary: 'text-foreground-tertiary',
      error: 'text-error',
      success: 'text-success',
      warning: 'text-warning',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    level: 'h1',
    weight: 'bold',
    color: 'default',
    align: 'left',
  },
});

type TitleVariantProps = VariantProps<typeof titleVariants>;

export interface TitleProps
  extends
    Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color'>,
    TitleVariantProps {
  /**
   * The semantic heading level to render
   */
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /**
   * Content to display
   */
  children: React.ReactNode;
  /**
   * Whether to render as a different heading level for styling while maintaining semantic meaning
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  (
    { className, level = 'h1', weight, color, align, as, children, ...props },
    ref
  ) => {
    const Component = as || level;

    return (
      <Component
        ref={ref}
        className={cn(
          titleVariants({ level, weight, color, align, className })
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Title.displayName = 'Title';

export { Title, titleVariants };
