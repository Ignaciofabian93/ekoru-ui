import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { motion } from 'motion/react';

const textareaVariants = cva(
  'w-full rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 placeholder:text-input-placeholder resize-none',
  {
    variants: {
      variant: {
        default:
          'bg-input-bg border-2 border-input-border hover:border-input-border-hover focus:border-input-border-focus focus:ring-primary/20',
        filled:
          'bg-background-secondary border-2 border-transparent hover:bg-background focus:bg-input-bg focus:border-input-border-focus focus:ring-primary/20',
        outline:
          'bg-transparent border-2 border-primary text-foreground hover:bg-primary/5 focus:bg-primary/5 focus:border-primary-active focus:ring-primary/20',
      },
      textSize: {
        sm: 'text-sm py-2 px-3 min-h-[80px]',
        md: 'text-base py-3 px-3 min-h-[120px]',
        lg: 'text-lg py-4 px-4 min-h-[160px]',
      },
      hasError: {
        true: 'border-error focus:border-error focus:ring-error/20',
      },
    },
    defaultVariants: {
      variant: 'default',
      textSize: 'md',
      hasError: false,
    },
  }
);

type TextareaVariantProps = VariantProps<typeof textareaVariants>;

export interface TextareaProps
  extends
    Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    Omit<TextareaVariantProps, 'hasError'> {
  /**
   * Label text displayed above the textarea
   */
  label?: string;
  /**
   * Error message to display below the textarea
   */
  errorMessage?: string;
  /**
   * Whether to show character count
   */
  showCharCount?: boolean;
  /**
   * Width variant of the textarea container
   */
  width?: 'sm' | 'md' | 'lg' | 'full';
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      textSize,
      label,
      errorMessage,
      showCharCount = false,
      width = 'full',
      disabled = false,
      readOnly = false,
      maxLength,
      value = '',
      name,
      id,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const computedHasError = !!errorMessage;
    const currentLength = String(value).length;

    const widthClass = {
      sm: 'w-1/3',
      md: 'w-1/2',
      lg: 'w-2/3',
      full: 'w-full',
    }[width];

    const reactId = React.useId();
    const generatedId = id || name || `textarea-${reactId}`;

    return (
      <div className={cn('space-y-2', widthClass)}>
        {label && (
          <label
            htmlFor={generatedId}
            className="block text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <motion.div
            initial={false}
            animate={{ scale: isFocused ? 1.002 : 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="relative"
          >
            <textarea
              ref={ref}
              id={generatedId}
              name={name}
              value={value}
              disabled={disabled}
              readOnly={readOnly}
              maxLength={maxLength}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={cn(
                textareaVariants({
                  variant,
                  textSize,
                  hasError: computedHasError,
                  className,
                })
              )}
              {...props}
            />
          </motion.div>
          {showCharCount && maxLength && (
            <div className="mt-1 text-xs text-foreground-tertiary text-right">
              {currentLength} / {maxLength}
            </div>
          )}
        </div>
        {errorMessage && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-error"
          >
            {errorMessage}
          </motion.p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea, textareaVariants };
