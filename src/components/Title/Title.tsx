import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { motion, type HTMLMotionProps } from 'motion/react';

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

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface TitleProps
  extends Omit<HTMLMotionProps<'h1'>, 'color'>, TitleVariantProps {
  /**
   * The semantic heading level to render
   */
  level?: HeadingLevel;
  /**
   * Content to display
   */
  children: React.ReactNode;
  /**
   * Whether to render as a different heading level for styling while maintaining semantic meaning
   */
  as?: HeadingLevel;
}

const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  (
    {
      className,
      level = 'h1',
      weight,
      color,
      align,
      as,
      children,
      // Separar props de motion
      initial,
      animate,
      exit,
      transition,
      variants,
      whileHover,
      whileTap,
      whileFocus,
      whileInView,
      viewport,
      onAnimationStart,
      onAnimationComplete,
      ...props
    },
    ref
  ) => {
    const Component = (as || level) as HeadingLevel;

    // Seleccionar el componente motion correcto
    const MotionComponent = motion[Component];

    // Agrupar props de motion
    const motionProps = {
      initial,
      animate,
      exit,
      transition,
      variants,
      whileHover,
      whileTap,
      whileFocus,
      whileInView,
      viewport,
      onAnimationStart,
      onAnimationComplete,
    };

    // Filtrar props undefined para evitar warnings
    const cleanMotionProps = Object.fromEntries(
      Object.entries(motionProps).filter(([_, value]) => value !== undefined)
    );

    return (
      <MotionComponent
        ref={ref}
        className={cn(
          titleVariants({ level, weight, color, align, className })
        )}
        {...cleanMotionProps}
        {...props}
      >
        {children}
      </MotionComponent>
    );
  }
);

Title.displayName = 'Title';

export { Title, titleVariants };
