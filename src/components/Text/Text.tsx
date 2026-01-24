import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const textVariants = cva('transition-colors', {
  variants: {
    variant: {
      p: 'block',
      span: 'inline',
      label: 'block font-medium cursor-pointer',
      blockquote: 'block border-l-4 border-primary pl-4 italic',
      small: 'block text-sm',
      code: 'inline-block font-mono bg-background-secondary px-1.5 py-0.5 rounded text-sm',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    color: {
      default: 'text-foreground',
      primary: 'text-primary',
      secondary: 'text-foreground-secondary',
      tertiary: 'text-foreground-tertiary',
      error: 'text-error',
      success: 'text-success',
      warning: 'text-warning',
      muted: 'text-muted',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
  },
  defaultVariants: {
    variant: 'p',
    size: 'base',
    weight: 'normal',
    color: 'default',
    align: 'left',
  },
});

type TextVariantProps = VariantProps<typeof textVariants>;

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>, TextVariantProps {
  /**
   * The HTML element to render
   */
  variant?: 'p' | 'span' | 'label' | 'blockquote' | 'small' | 'code';
  /**
   * Content to display
   */
  children: React.ReactNode;
  /**
   * For label variant - associates label with input
   */
  htmlFor?: string;
  /**
   * Render as a different element while maintaining variant styling
   */
  as?: 'p' | 'span' | 'label' | 'blockquote' | 'small' | 'div' | 'code';
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      className,
      variant = 'p',
      size,
      weight,
      color,
      align,
      as,
      htmlFor,
      children,
      ...props
    },
    ref
  ) => {
    const Component = (as || variant) as React.ElementType;

    return (
      <Component
        ref={ref}
        htmlFor={variant === 'label' || as === 'label' ? htmlFor : undefined}
        className={cn(
          textVariants({ variant, size, weight, color, align, className })
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';

export { Text, textVariants };
