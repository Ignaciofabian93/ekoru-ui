import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'min-w-[140px] rounded-lg font-medium shadow-md transition-all duration-200 flex items-center justify-center space-x-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'border-2 border-primary bg-primary text-white hover:bg-primary/90 active:bg-primary/80 shadow-md',
        secondary:
          'border-2 border-secondary bg-secondary text-white hover:bg-secondary/90 active:bg-secondary/80',
        secondary_outline:
          'border-2 border-secondary bg-white text-secondary hover:bg-white/90 active:bg-white/80',
        outline:
          'border-2 border-primary text-primary hover:bg-primary/5 hover:text-accent-foreground active:bg-primary/10',
        ghost: 'hover:bg-muted active:bg-muted/80 text-foreground',
        success:
          'border-2 border-success bg-success text-white hover:bg-success/90 active:bg-success/80 shadow-md',
        warning:
          'border-2 border-warning bg-warning text-white hover:bg-warning/90 active:bg-warning/80 shadow-md',
        error:
          'border-2 border-error bg-error text-white hover:bg-error/90 active:bg-error/80 shadow-md',
      },
      size: {
        sm: 'min-h-[36px] px-2 py-2 text-sm',
        md: 'min-h-[44px] px-6 py-2.5 text-base',
        lg: 'min-h-[56px] px-8 py-3 text-lg',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends
    Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      | 'onDrag'
      | 'onDragEnd'
      | 'onDragStart'
      | 'onAnimationStart'
      | 'onAnimationEnd'
    >,
    VariantProps<typeof buttonVariants> {
  /**
   * If true, the button will show a loading spinner
   */
  isLoading?: boolean;
  loadingText?: string;
  /**
   * Icon to display before the button text (can be a lucide-react component or JSX element)
   */
  leftIcon?: React.ElementType | React.ReactElement;
  /**
   * Icon to display after the button text (can be a lucide-react component or JSX element)
   */
  rightIcon?: React.ElementType | React.ReactElement;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      loadingText = 'Loading...',
      ...props
    },
    ref
  ) => {
    const MotionButton = motion.button;

    return (
      <MotionButton
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.96, y: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        {...props}
      >
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-2"
            >
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            </motion.div>
          )}
          {!isLoading && leftIcon && (
            <motion.span
              key="leftIcon"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="mr-2 inline-flex items-center justify-center flex-shrink-0"
            >
              {React.isValidElement(leftIcon)
                ? leftIcon
                : React.createElement(leftIcon as React.ElementType, {
                    size: 18,
                    className: 'flex-shrink-0',
                  })}
            </motion.span>
          )}
        </AnimatePresence>
        {isLoading ? loadingText : children}
        {!isLoading && rightIcon && (
          <span className="ml-2 inline-flex items-center justify-center flex-shrink-0">
            {React.isValidElement(rightIcon)
              ? rightIcon
              : React.createElement(rightIcon as React.ElementType, {
                  size: 18,
                  className: 'flex-shrink-0',
                })}
          </span>
        )}
      </MotionButton>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
