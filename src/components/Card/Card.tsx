import { cn } from '@/utils';
import { Image } from 'lucide-react';
import { motion } from 'motion/react';
export interface CardProps {
  title: string;
  description?: string;
  cta?: React.ReactNode;
  image?: React.ReactNode;
  hasBadge?: boolean;
  badgeText?: string;
  badgeColor?: string;
  textColor?: string;
}

export default function Card({
  image,
  title,
  description,
  cta,
  hasBadge,
  badgeText,
  badgeColor = 'bg-primary',
  textColor = 'text-white',
}: CardProps) {
  return (
    <motion.article
      className={cn(
        'w-64',
        'bg-white',
        'rounded-lg',
        'overflow-hidden',
        'shadow-md',
        'relative'
      )}
    >
      <motion.div className="h-40 w-full overflow-hidden">
        {image ? (
          image
        ) : (
          <motion.div
            className={cn(
              'h-40 w-full',
              'bg-gray-200',
              'flex items-center justify-center'
            )}
          >
            <motion.span className="text-gray-500">
              <Image />
            </motion.span>
          </motion.div>
        )}
      </motion.div>
      {hasBadge && badgeText && (
        <motion.div
          className={cn(
            'absolute top-2 left-2',
            'text-xs',
            'font-semibold',
            'px-4 py-1',
            'rounded-lg',
            'shadow-md',
            badgeColor,
            textColor
          )}
        >
          {badgeText}
        </motion.div>
      )}
      <motion.div className="p-4">
        <motion.h3
          className={cn(
            'text-lg',
            'font-semibold',
            'text-gray-900',
            'dark:text-stone-100'
          )}
        >
          {title}
        </motion.h3>
        {description && (
          <motion.p
            className={cn(
              'text-sm',
              'text-gray-600',
              'dark:text-stone-400',
              'mt-2'
            )}
          >
            {description}
          </motion.p>
        )}
        {cta && <motion.div className="mt-2">{cta}</motion.div>}
      </motion.div>
    </motion.article>
  );
}
