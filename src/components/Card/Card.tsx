import { Image } from 'lucide-react';

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
    <article className="w-64 bg-white rounded-lg overflow-hidden shadow-md relative">
      <div className="h-40 w-full overflow-hidden">
        {image ? (
          image
        ) : (
          <div className="h-40 w-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">
              <Image />
            </span>
          </div>
        )}
      </div>
      {hasBadge && badgeText && (
        <div
          className={`absolute top-2 left-2 ${badgeColor} ${textColor} text-xs font-semibold px-4 py-1 rounded-lg shadow-md`}
        >
          {badgeText}
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-stone-100">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-gray-600 dark:text-stone-400 mt-2">
            {description}
          </p>
        )}
        {cta && <div className="mt-2">{cta}</div>}
      </div>
    </article>
  );
}
