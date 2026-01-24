import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Circle, type LucideIcon } from 'lucide-react';
import { createPortal } from 'react-dom';

const selectVariants = cva(
  'w-full rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 placeholder:text-input-placeholder text-left',
  {
    variants: {
      variant: {
        default:
          'bg-input-bg border-2 border-input-border hover:border-input-border-hover focus:border-input-border-focus focus:ring-primary/20',
        filled:
          'bg-background border-2 border-transparent hover:bg-background focus:bg-input-bg focus:border-input-border-focus focus:ring-primary/20',
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

type SelectVariantProps = VariantProps<typeof selectVariants>;

export type Option = {
  label: string;
  value: string | number;
  iconColor?: string;
};

export interface SelectProps extends Omit<SelectVariantProps, 'hasError'> {
  /**
   * Array of options to display in the dropdown
   */
  options?: Option[];
  /**
   * Label text displayed above the select
   */
  label?: string;
  /**
   * Icon component to display on the left side
   */
  leftIcon?: LucideIcon;
  /**
   * Error message to display below the select
   */
  errorMessage?: string;
  /**
   * Selected value
   */
  value?: string | number;
  /**
   * Name attribute for form handling
   */
  name?: string;
  /**
   * Placeholder text when no value is selected
   */
  placeholder?: string;
  /**
   * Callback when selection changes
   */
  onChange?: (value: string | number) => void;
  /**
   * Width variant of the select container
   */
  width?: 'sm' | 'md' | 'lg' | 'full';
  /**
   * Whether the select is disabled
   */
  disabled?: boolean;
  /**
   * Whether the select is read-only
   */
  readOnly?: boolean;
  /**
   * Whether to show color circles for options
   */
  showColorIcon?: boolean;
  /**
   * Custom render function for options
   */
  renderOption?: (option: Option, selected: boolean) => React.ReactNode;
  /**
   * Whether to enable search/filter functionality
   */
  searchEnabled?: boolean;
  /**
   * Direction for dropdown expansion
   */
  dropdownDirection?: 'up' | 'down';
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * No results text
   */
  noResultsText?: string;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      className,
      variant,
      size,
      label,
      leftIcon: LeftIcon,
      errorMessage,
      value,
      onChange,
      options = [],
      width = 'full',
      disabled = false,
      readOnly = false,
      showColorIcon = false,
      renderOption,
      searchEnabled = true,
      dropdownDirection = 'down',
      placeholder = 'Select...',
      name,
      noResultsText = 'No results found',
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [highlightedIndex, setHighlightedIndex] = React.useState<number>(-1);
    const [dropdownPosition, setDropdownPosition] = React.useState({
      top: 0,
      left: 0,
      width: 0,
    });
    const [mounted, setMounted] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const listboxId = `${name}-listbox`;

    const selectedOption = options.find((o) => o.value === value);
    const filteredOptions = options.filter((o) =>
      o.label.toLowerCase().includes(search.toLowerCase())
    );

    const widthClass = {
      sm: 'w-1/3',
      md: 'w-1/2',
      lg: 'w-2/3',
      full: 'w-full',
    }[width];

    const computedHasError = !!errorMessage;

    React.useEffect(() => {
      setMounted(true);
    }, []);

    // Calcula la posición del dropdown
    const updateDropdownPosition = React.useCallback(() => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: dropdownDirection === 'down' ? rect.bottom + 4 : rect.top - 4,
          left: rect.left,
          width: rect.width,
        });
      }
    }, [dropdownDirection]);

    React.useEffect(() => {
      if (isOpen) {
        updateDropdownPosition();
        window.addEventListener('scroll', updateDropdownPosition, true);
        window.addEventListener('resize', updateDropdownPosition);
      }
      return () => {
        window.removeEventListener('scroll', updateDropdownPosition, true);
        window.removeEventListener('resize', updateDropdownPosition);
      };
    }, [isOpen, updateDropdownPosition]);

    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node) &&
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
          setSearch('');
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    React.useEffect(() => {
      if (isOpen) setHighlightedIndex(0);
    }, [isOpen, search]);

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    const renderLabel = (option?: Option) => (
      <span className="flex items-center gap-2">
        {showColorIcon && option?.iconColor && (
          <Circle
            size={18}
            style={{
              color: option.iconColor,
              fill: option.iconColor,
            }}
            className={cn('rounded-full', {
              'border border-gray-400': option.iconColor === '#FFFFFF',
            })}
          />
        )}
        {option?.label || placeholder}
      </span>
    );

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
          setIsOpen(true);
          e.preventDefault();
        }
        return;
      }
      if (e.key === 'ArrowDown') {
        setHighlightedIndex((i) => Math.min(i + 1, filteredOptions.length - 1));
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        setHighlightedIndex((i) => Math.max(i - 1, 0));
        e.preventDefault();
      } else if (e.key === 'Enter') {
        if (filteredOptions[highlightedIndex]) {
          onChange?.(filteredOptions[highlightedIndex].value);
          setIsOpen(false);
          setSearch('');
        }
        e.preventDefault();
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        setSearch('');
        e.preventDefault();
      }
    };

    const dropdownContent = (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            key="dropdown"
            initial={{
              opacity: 0,
              y: dropdownDirection === 'down' ? -10 : 10,
            }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: dropdownDirection === 'down' ? -10 : 10,
            }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            id={listboxId}
            role="listbox"
            aria-activedescendant={
              highlightedIndex >= 0 && filteredOptions[highlightedIndex]
                ? `${name}-option-${filteredOptions[highlightedIndex].value}`
                : undefined
            }
            tabIndex={-1}
            style={{
              position: 'fixed',
              top:
                dropdownDirection === 'down'
                  ? `${dropdownPosition.top}px`
                  : 'auto',
              bottom:
                dropdownDirection === 'up'
                  ? `${window.innerHeight - dropdownPosition.top}px`
                  : 'auto',
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`,
              zIndex: 9999,
            }}
            className={cn(
              'bg-surface-elevated',
              'border-2 border-primary rounded-lg shadow-2xl overflow-hidden'
            )}
          >
            {searchEnabled && (
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 border-b border-input-border outline-none bg-surface-elevated text-foreground"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search options"
                onClick={(e) => e.stopPropagation()}
              />
            )}
            <ul className="max-h-60 overflow-y-auto w-full bg-surface-elevated">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, idx) => (
                  <li
                    key={option.value}
                    id={`${name}-option-${option.value}`}
                    role="option"
                    aria-selected={option.value === value}
                    tabIndex={0}
                    onClick={() => {
                      onChange?.(option.value);
                      setIsOpen(false);
                      setSearch('');
                    }}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    className={cn(
                      'px-4 py-2 w-full cursor-pointer hover:bg-primary/10 flex items-center gap-2 transition-colors',
                      option.value === value && 'bg-primary/10 font-semibold',
                      highlightedIndex === idx && 'bg-primary/20'
                    )}
                  >
                    {renderOption
                      ? renderOption(option, option.value === value)
                      : renderLabel(option)}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-sm text-foreground-tertiary italic">
                  {noResultsText}
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    );

    return (
      <>
        <div className={cn('space-y-2', widthClass)} ref={containerRef}>
          {label && (
            <label
              htmlFor={name}
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
                    'absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 pointer-events-none',
                    isFocused ? 'text-primary' : 'text-foreground-tertiary',
                    computedHasError && 'text-error'
                  )}
                />
              )}
              <button
                type="button"
                ref={(node) => {
                  buttonRef.current = node;
                  if (typeof ref === 'function') {
                    ref(node);
                  } else if (ref) {
                    ref.current = node;
                  }
                }}
                id={name}
                name={name}
                disabled={disabled || readOnly}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-controls={listboxId}
                onClick={() => !readOnly && setIsOpen(!isOpen)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={cn(
                  selectVariants({
                    variant,
                    size,
                    hasError: computedHasError,
                    className,
                  }),
                  {
                    'pl-3': !LeftIcon,
                    'pl-10': LeftIcon,
                    'pr-10': true,
                  }
                )}
              >
                {renderLabel(selectedOption)}
                <ChevronDown
                  size={18}
                  className={cn(
                    'absolute right-3 top-1/2 transform -translate-y-1/2 transition-all duration-200 pointer-events-none',
                    isOpen && 'rotate-180',
                    isFocused ? 'text-primary' : 'text-foreground-tertiary',
                    computedHasError && 'text-error'
                  )}
                />
              </button>
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

        {/* Portal para el dropdown */}
        {mounted && createPortal(dropdownContent, document.body)}
      </>
    );
  }
);

Select.displayName = 'Select';

export { Select, selectVariants };
