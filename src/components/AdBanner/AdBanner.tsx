import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';
import { motion } from 'motion/react';

const adBannerVariants = cva(
  'w-full border-t border-b overflow-hidden rounded-none',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-r from-primary-dark via-primary to-primary-dark text-white',
        secondary:
          'bg-gradient-to-r from-secondary-dark via-secondary to-secondary-dark text-white',
        outlined: 'bg-background border border-primary text-foreground',
        ghost: 'bg-white/50 text-foreground',
      },
      animated: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      animated: true,
    },
  }
);

export interface AdBannerProps
  extends
    Omit<
      React.HTMLAttributes<HTMLElement>,
      | 'onDrag'
      | 'onDragEnd'
      | 'onDragStart'
      | 'onAnimationStart'
      | 'onAnimationEnd'
    >,
    VariantProps<typeof adBannerVariants> {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  cta: React.ReactNode;
}

const AdBanner = React.forwardRef<HTMLDivElement, AdBannerProps>(
  (
    { icon, title, description, cta, variant, animated, className, ...props },
    ref
  ) => {
    const MotionDiv = motion.div;
    const Icon = icon as LucideIcon | undefined;

    return (
      <MotionDiv
        ref={ref}
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className={cn(
          adBannerVariants({ variant, animated }),
          'p-4 md:p-5',
          className
        )}
        {...props}
      >
        <motion.div
          className={cn(
            'flex flex-col sm:flex-row',
            'items-center',
            'gap-4 py-2 px-2',
            'justify-between'
          )}
        >
          <motion.div
            className={cn(
              'flex flex-col',
              'items-center sm:items-start',
              'justify-center'
            )}
          >
            {Icon && (
              <motion.div
                className={cn(
                  'w-20 h-20',
                  'flex items-center justify-center',
                  'rounded-lg',
                  'mb-2',
                  {
                    'bg-white/10':
                      variant === 'primary' || variant === 'secondary',
                    'bg-primary/10':
                      variant === 'outlined' || variant === 'ghost',
                  }
                )}
              >
                <Icon
                  className={cn('w-10 h-10', {
                    'text-white':
                      variant === 'primary' || variant === 'secondary',
                    'text-primary':
                      variant === 'outlined' || variant === 'ghost',
                  })}
                />
              </motion.div>
            )}

            {title && (
              <motion.h3
                className={cn(
                  'text-lg font-bold',
                  'text-center sm:text-left',
                  'mb-1'
                )}
              >
                {title}
              </motion.h3>
            )}

            {description && (
              <motion.p
                className={cn(
                  'text-sm text-center sm:text-left',
                  'text-muted',
                  'mb-0'
                )}
              >
                {description}
              </motion.p>
            )}
          </motion.div>

          <motion.div className={cn('flex items-center justify-center')}>
            {cta}
          </motion.div>
        </motion.div>
      </MotionDiv>
    );
  }
);

AdBanner.displayName = 'AdBanner';

export default AdBanner;
export { adBannerVariants };
