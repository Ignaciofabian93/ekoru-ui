import { type LucideIcon } from 'lucide-react';

export interface AdBannerProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  cta: React.ReactNode;
  className?: string;
}

export default function AdBanner({
  icon,
  title,
  description,
  cta,
  className,
}: AdBannerProps) {
  const Icon = icon as LucideIcon;
  return (
    <article
      className={`flex flex-col sm:flex-row items-center gap-4 py-4 px-2 justify-between w-full border-t border-b border-gray-200 ${className}`}
    >
      <div className="flex flex-col items-center sm:items-start justify-center">
        {icon && (
          <div className="w-20 h-20 flex items-center justify-center rounded-lg bg-primary/10 mb-2">
            <Icon className="w-10 h-10 text-primary" />
          </div>
        )}
        {title && (
          <h3 className="text-lg font-bold text-gray-900 dark:text-stone-100 mb-1">
            {title}
          </h3>
        )}
        {description && (
          <div className="text-gray-600 dark:text-stone-400 text-sm mb-3">
            {description}
          </div>
        )}
      </div>
      <div className="flex items-center justify-center">{cta}</div>
    </article>
  );
}
