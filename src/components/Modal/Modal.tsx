import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

const modalVariants = cva(
  'relative w-full max-h-[90vh] rounded-lg shadow-2xl overflow-hidden z-10',
  {
    variants: {
      size: {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-7xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface ModalProps extends VariantProps<typeof modalVariants> {
  isOpen?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  title?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
}: ModalProps) {
  // Close modal on escape key and handle body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Store original overflow
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = originalOverflow || 'unset';
      };
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, closeOnEscape]);

  // Don't render anything if not open
  if (!isOpen) return null;

  // Create portal to render modal at document body level
  return createPortal(
    <AnimatePresence mode="wait" initial={false}>
      {isOpen && (
        <motion.div
          key="modal"
          transition={{ duration: 0.2 }}
          className={cn(
            'fixed inset-0 z-[9999]',
            'flex items-center justify-center',
            'p-4'
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              'absolute inset-0',
              'bg-black/60',
              'backdrop-blur-sm'
            )}
            onClick={closeOnOverlayClick ? onClose : undefined}
            aria-label="Close modal"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300,
            }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              modalVariants({ size }),
              'bg-surface border border-border',
              className
            )}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div
                className={cn(
                  'flex items-center justify-between',
                  'p-6',
                  'border-b border-border'
                )}
              >
                {title && (
                  <h3
                    id="modal-title"
                    className="font-semibold text-lg text-foreground"
                  >
                    {title}
                  </h3>
                )}
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className={cn(
                      'p-1 rounded-lg text-foreground-secondary',
                      'hover:text-foreground hover:bg-background-secondary',
                      'transition-colors'
                    )}
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div
              className={cn(
                'p-6',
                'overflow-y-auto',
                'max-h-[calc(90vh-8rem)]',
                'scrollbar-hide',
                'text-foreground'
              )}
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
