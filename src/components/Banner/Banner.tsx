import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { motion } from 'motion/react';

const bannerVariants = cva(
  'p-4 md:p-5 rounded-xl w-[95%] mx-auto overflow-hidden relative',
  {
    variants: {
      variant: {
        primary:
          'border-2 border-transparent bg-gradient-to-r from-primary-dark via-primary to-primary-dark text-white shadow-lg',
        secondary:
          'border-2 border-transparent bg-gradient-to-r from-secondary-dark via-secondary to-secondary-dark text-white shadow-lg',
        outlined:
          'border-2 border-primary shadow-lg bg-background backdrop-blur',
        ghost: 'border-2 border-transparent bg-white/50 backdrop-blur',
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

const dotVariants = cva('w-3 h-3 rounded-full inline-block', {
  variants: {
    variant: {
      primary: 'bg-white shadow-lg shadow-white/50',
      secondary: 'bg-white',
      outlined: 'bg-primary',
      ghost: 'bg-gray-600',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export interface BannerProps
  extends
    Omit<
      React.HTMLAttributes<HTMLDivElement>,
      | 'onDrag'
      | 'onDragEnd'
      | 'onDragStart'
      | 'onAnimationStart'
      | 'onAnimationEnd'
    >,
    VariantProps<typeof bannerVariants> {
  /**
   * The main title text of the banner
   */
  title: string;
  /**
   * The description text of the banner
   */
  description: string;
  /**
   * Whether to show decorative dots around the title
   */
  showDots?: boolean;
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      className,
      variant,
      animated,
      title,
      description,
      showDots = true,
      ...props
    },
    ref
  ) => {
    const MotionDiv = motion.div;

    return (
      <MotionDiv
        ref={ref}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={cn(bannerVariants({ variant, animated, className }))}
        {...props}
      >
        {/* Subtle animated background for primary variant */}
        {animated && variant === 'primary' && (
          <motion.div
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />
        )}

        <div className="relative z-10">
          <div className="flex flex-1 justify-center items-center gap-2 md:gap-3 mb-3">
            {showDots && (
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: 'spring' }}
                className={cn(dotVariants({ variant }))}
              />
            )}
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-base sm:text-lg md:text-2xl font-bold text-center tracking-tight"
            >
              {title}
            </motion.h2>
            {showDots && (
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: 'spring' }}
                className={cn(dotVariants({ variant }))}
              />
            )}
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-sm sm:text-base md:text-lg text-center leading-snug md:leading-normal font-light"
          >
            {description}
          </motion.p>
        </div>
      </MotionDiv>
    );
  }
);

Banner.displayName = 'Banner';

export { Banner, bannerVariants };
