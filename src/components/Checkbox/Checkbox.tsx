import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

const checkboxVariants = cva(
  'relative rounded-md border-2 flex items-center justify-center transition-all duration-200 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'border-input-border hover:border-primary/50',
        filled: 'border-transparent bg-background-secondary',
        outline: 'border-primary bg-transparent',
      },
      size: {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
      },
      checked: {
        true: 'bg-primary border-primary',
        false: '',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      checked: false,
      disabled: false,
    },
  }
);

type CheckboxVariantProps = VariantProps<typeof checkboxVariants>;

export interface CheckboxProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    Omit<CheckboxVariantProps, 'checked' | 'disabled'> {
  /**
   * Checkbox label text
   */
  label?: string;
  /**
   * Optional description text below the label
   */
  description?: string;
  /**
   * Error message to display
   */
  errorMessage?: string;
  /**
   * Whether the checkbox is checked
   */
  checked?: boolean;
  /**
   * Callback when checkbox state changes
   */
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      variant,
      size = 'md',
      label,
      description,
      errorMessage,
      checked = false,
      disabled = false,
      onCheckedChange,
      onChange,
      id,
      name,
      ...props
    },
    ref
  ) => {
    const iconSizes = {
      sm: 12,
      md: 16,
      lg: 20,
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;
      onCheckedChange?.(newChecked);
      onChange?.(e);
    };

    const reactId = React.useId();
    const generatedId = id || name || `checkbox-${reactId}`;

    return (
      <div className="space-y-1">
        <div className="flex items-start space-x-3">
          <div className="relative">
            <motion.button
              type="button"
              onClick={() => !disabled && onCheckedChange?.(!checked)}
              disabled={disabled}
              className={cn(
                checkboxVariants({
                  variant,
                  size,
                  checked,
                  disabled,
                  className,
                })
              )}
              whileTap={!disabled ? { scale: 0.95 } : {}}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: checked ? 1 : 0,
                  scale: checked ? 1 : 0.5,
                }}
                transition={{ duration: 0.2 }}
              >
                <Check size={iconSizes[size || 'md']} className="text-white" />
              </motion.div>
            </motion.button>
            <input
              ref={ref}
              id={generatedId}
              name={name}
              type="checkbox"
              checked={checked}
              onChange={handleChange}
              disabled={disabled}
              className="sr-only"
              {...props}
            />
          </div>
          {label && (
            <div className="flex-1">
              <label
                htmlFor={generatedId}
                className={cn(
                  'text-sm font-medium cursor-pointer',
                  disabled
                    ? 'text-foreground-tertiary cursor-not-allowed'
                    : 'text-foreground',
                  errorMessage && 'text-error'
                )}
              >
                {label}
              </label>
              {description && (
                <p className="text-sm text-foreground-tertiary mt-1">
                  {description}
                </p>
              )}
            </div>
          )}
        </div>
        {errorMessage && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-error ml-8"
          >
            {errorMessage}
          </motion.p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox, checkboxVariants };
