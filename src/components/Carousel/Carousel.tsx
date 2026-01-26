import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const containerVariants = cva('py-8', {
  variants: {
    variant: {
      default: '',
      compact: 'py-4',
      centered: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface CarouselProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof containerVariants> {
  header?: React.ReactNode;
  description?: React.ReactNode;
  link?: React.ReactNode;
  items?: React.ReactNode[];
  children?: React.ReactNode; // fallback to custom children
}

export default function Carousel({
  header,
  description,
  link,
  items,
  children,
  variant,
  className,
  ...props
}: CarouselProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll, items, children]);

  const scrollBy = (distance: number) => {
    const el = containerRef.current;
    if (!el) return;
    // Smooth scroll; in tests this can be stubbed
    el.scrollTo({ left: el.scrollLeft + distance, behavior: 'smooth' });
  };

  const scrollLeft = () =>
    scrollBy(-(containerRef.current?.clientWidth ?? 300) * 0.8);
  const scrollRight = () =>
    scrollBy((containerRef.current?.clientWidth ?? 300) * 0.8);

  const hasItems = Array.isArray(items) && items.length > 0;

  return (
    <section
      className={cn(containerVariants({ variant }), className)}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:justify-between mb-4 items-start gap-2">
          <div className="flex flex-col items-start gap-1">
            {header && <h2 className="font-bold">{header}</h2>}
            {description && (
              <p className="text-sm text-text-muted">{description}</p>
            )}
          </div>
          {link && <div>{link}</div>}
        </div>

        <div className="relative">
          {/* left control */}
          {canScrollLeft && (
            <button
              aria-label="Scroll left"
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/70 backdrop-blur hover:scale-105 transition-transform"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          {/* right control */}
          {canScrollRight && (
            <button
              aria-label="Scroll right"
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/70 backdrop-blur hover:scale-105 transition-transform"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          )}

          <div
            ref={containerRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            role="list"
          >
            {hasItems
              ? // items is an array of React nodes supplied by the consumer; render them directly
                (items as React.ReactNode[]).map((node, idx) => (
                  // ensure each child has a stable key when rendering nodes
                  <div
                    key={React.isValidElement(node) ? node.key ?? idx : idx}
                    className="flex-shrink-0"
                  >
                    {node}
                  </div>
                ))
              : children}
          </div>
        </div>
      </div>
    </section>
  );
}
