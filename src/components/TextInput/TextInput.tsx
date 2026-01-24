import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'motion/react';
import { type LucideIcon, Eye, EyeOff } from 'lucide-react';

const inputVariants = cva(
  'w-full rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 placeholder:text-input-placeholder',
  {
    variants: {
      variant: {
        default:
          'bg-input-bg border-2 border-input-border hover:border-input-border-hover focus:border-input-border-focus focus:ring-primary/20',
        filled:
          'bg-background-secondary border-2 border-transparent hover:bg-background-tertiary focus:bg-input-bg focus:border-input-border-focus focus:ring-primary/20',
        outline:
          'bg-transparent border-2 border-primary text-foreground hover:bg-primary/5 focus:bg-primary/5 focus:border-primary-active focus:ring-primary/20',
      },
      size: {
        sm: 'h-9 text-sm',
        md: 'h-11 text-base',
        lg: 'h-14 text-lg',
      },
      hasError: {
        true: 'border-error focus:border-error focus:ring-error/20',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      hasError: false,
    },
  }
);

export interface TextInputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'>,
    VariantProps<typeof inputVariants> {
  /**
   * Label text displayed above the input
   */
  label?: string;
  /**
   * Icon component to display on the left side
   */
  leftIcon?: LucideIcon;
  /**
   * Error message to display below the input
   */
  errorMessage?: string;
  /**
   * Callback function when input value changes
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Width variant of the input container
   */
  width?: 'sm' | 'md' | 'lg' | 'full';
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className,
      variant,
      size,
      hasError,
      label,
      leftIcon: LeftIcon,
      errorMessage,
      type = 'text',
      width = 'full',
      id,
      name,
      disabled,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const widthClass = {
      sm: 'w-1/3',
      md: 'w-1/2',
      lg: 'w-2/3',
      full: 'w-full',
    }[width];

    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;
    const computedHasError = hasError || !!errorMessage;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className={cn('space-y-2', widthClass)}>
        {label && (
          <label
            htmlFor={id || name}
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
            {LeftIcon && (
              <LeftIcon
                className={cn(
                  'absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200',
                  isFocused ? 'text-primary' : 'text-foreground-tertiary',
                  computedHasError && 'text-error'
                )}
              />
            )}
            <input
              ref={ref}
              id={id || name}
              name={name}
              type={inputType}
              disabled={disabled}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={cn(
                inputVariants({
                  variant,
                  size,
                  hasError: computedHasError,
                  className,
                }),
                {
                  'pl-3': !LeftIcon,
                  'pl-10': LeftIcon,
                  'pr-10': isPassword,
                  'pr-3': !isPassword,
                }
              )}
              {...props}
            />
            {isPassword && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                disabled={disabled}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground-tertiary hover:text-foreground-secondary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                tabIndex={-1}
              >
                <AnimatePresence mode="wait">
                  {showPassword ? (
                    <motion.div
                      key="eye-off"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                    >
                      <EyeOff className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="eye"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Eye className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            )}
          </motion.div>
          {errorMessage && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-1 text-xs text-error"
            >
              {errorMessage}
            </motion.p>
          )}
        </div>
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

export { TextInput, inputVariants };
