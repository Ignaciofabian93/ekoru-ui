import { type LucideIcon } from 'lucide-react';

export interface StatsCardProps {
  icon: LucideIcon;
  mainText: string | number;
  description: string;
}

export default function StatsCard({
  icon: Icon,
  mainText,
  description,
}: StatsCardProps) {
  return (
    <article className="inline-flex p-4 shadow-md flex-col items-center justify-center min-w-40 rounded-lg bg-white dark:bg-stone-900">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mb-4">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-stone-100 mb-1">
          {mainText}
        </h3>
        <p className="text-sm text-gray-600 dark:text-stone-400 text-center">
          {description}
        </p>
      </div>
    </article>
  );
}
