import type {
  ProductCategoryMaterial,
  StoreProductMaterial,
} from '@/types/product';
import type { EnvironmentalImpactModalProps } from '../EnvironmentalImpactModal';
import {
  Droplets,
  Leaf,
  MapPin,
  Phone,
  RotateCcw,
  UserRound,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/utils';

export interface BackSideProps {
  isFlipped: boolean;
  setIsFlipped: (flipped: boolean) => void;
  setShowImpactModal: (show: boolean) => void;
  sellerName?: string;
  sellerPhone?: string;
  sellerAddress?: string;
  environmentalImpact?:
    | ProductCategoryMaterial[]
    | StoreProductMaterial[]
    | EnvironmentalImpactModalProps['environmentalImpact'];
  impactLabel?: string;
  materialsLabel?: string;
  viewMoreLabel?: string;
  sellerLabel?: string;
  co2Label?: string;
  waterLabel?: string;
}

export default function CardBackSide({
  isFlipped,
  setIsFlipped,
  setShowImpactModal,
  environmentalImpact,
  sellerName,
  sellerPhone,
  sellerAddress,
  impactLabel = 'Environmental Impact',
  materialsLabel = 'Materials:',
  viewMoreLabel = 'View Full Impact',
  sellerLabel = 'Seller Information',
  co2Label = 'CO₂ Saved',
  waterLabel = 'Water Saved',
}: BackSideProps) {
  const calculateImpactLevel = (co2: number) => {
    if (co2 > 50) return { level: 'High', color: 'success', width: '100%' };
    if (co2 > 20) return { level: 'Medium', color: 'warning', width: '66%' };
    return { level: 'Low', color: 'info', width: '33%' };
  };
  // Normalize environmentalImpact to the modal shape { totalCo2SavingsKG, totalWaterSavingsLT, materialBreakdown }
  const normalizedImpact = (() => {
    if (!environmentalImpact) return undefined;
    if (Array.isArray(environmentalImpact)) {
      type MaterialCandidate = {
        material?: {
          materialType?: string;
          percentage?: number;
          estimatedCo2SavingsKG?: number;
          estimatedWaterSavingsLT?: number;
        };
        materialType?: string;
        percentage?: number;
        quantity?: number;
        weightKG?: number;
        co2SavingsKG?: number;
        waterSavingsLT?: number;
      };

      const materialBreakdown = environmentalImpact.map(
        (m: MaterialCandidate) => {
          const mm = m as MaterialCandidate;
          const materialType =
            mm.material?.materialType ?? mm.materialType ?? 'Material';
          const percentage = mm.material?.percentage ?? mm.percentage ?? 0;
          const weightKG = mm.quantity ?? mm.weightKG ?? 0;
          const co2SavingsKG =
            mm.material?.estimatedCo2SavingsKG ?? mm.co2SavingsKG ?? 0;
          const waterSavingsLT =
            mm.material?.estimatedWaterSavingsLT ?? mm.waterSavingsLT ?? 0;
          return {
            materialType,
            percentage,
            weightKG,
            co2SavingsKG,
            waterSavingsLT,
          };
        }
      );

      const totalCo2SavingsKG = materialBreakdown.reduce(
        (s, m) => s + (m.co2SavingsKG || 0),
        0
      );
      const totalWaterSavingsLT = materialBreakdown.reduce(
        (s, m) => s + (m.waterSavingsLT || 0),
        0
      );

      return { totalCo2SavingsKG, totalWaterSavingsLT, materialBreakdown };
    }
    return environmentalImpact as EnvironmentalImpactModalProps['environmentalImpact'];
  })();

  const impactLevel = normalizedImpact
    ? calculateImpactLevel(normalizedImpact.totalCo2SavingsKG)
    : null;

  return (
    <div
      className={cn(
        'card-flip-back',
        'bg-gradient-to-br from-white via-emerald-50/20 to-white',
        'dark:from-stone-800 dark:via-stone-850 dark:to-stone-900',
        'border-2 border-gray-200/60',
        'dark:border-stone-700/50'
      )}
    >
      <div
        className={cn(
          'py-4',
          'px-4',
          'w-full',
          'h-full',
          'flex',
          'flex-col',
          'overflow-y-auto',
          'scrollbar-hide',
          'relative'
        )}
      >
        {/* Flip Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFlipped(!isFlipped);
          }}
          className={cn(
            'absolute top-2 right-2',
            'bg-white/90',
            'dark:bg-stone-800/90',
            'hover:bg-primary',
            'dark:hover:bg-primary',
            'backdrop-blur-md',
            'text-gray-700',
            'dark:text-stone-200',
            'hover:text-white',
            'p-1.5',
            'rounded-lg',
            'shadow-lg',
            'transition-all',
            'duration-200',
            'hover:scale-110',
            'z-10',
            'border',
            'border-gray-200/50',
            'dark:border-stone-600/50'
          )}
          aria-label="Ver producto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Environmental Impact Section */}
        {environmentalImpact && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-0.5">
              <h4
                className={cn(
                  'font-bold',
                  'text-gray-900',
                  'dark:text-stone-100',
                  'text-xs',
                  'flex',
                  'items-center',
                  'gap-1.5'
                )}
              >
                <Leaf className="w-3.5 h-3.5 text-success" />
                {impactLabel}
              </h4>
            </div>
            <div className="mb-3">
              {impactLevel && (
                <span
                  className={cn(
                    'text-[9px]',
                    'font-semibold',
                    'px-2',
                    'py-0.5',
                    'rounded-full',
                    `bg-${impactLevel.color}/15`,
                    `text-${impactLevel.color}`,
                    `border`,
                    `border-${impactLevel.color}/30`
                  )}
                >
                  {impactLevel.level}
                </span>
              )}
            </div>

            {/* Impact Progress Bar - Delgado */}
            <div
              className={cn(
                'mb-2.5',
                'bg-gray-200/60',
                'dark:bg-stone-700/50',
                'rounded-full',
                'h-1',
                'overflow-hidden'
              )}
            >
              <div
                className={cn(
                  'h-full',
                  'bg-gradient-to-r from-success to-success/70',
                  'rounded-full',
                  'transition-all',
                  'duration-1000'
                )}
                style={{ width: impactLevel?.width || '0%' }}
              />
            </div>

            {/* Impact Stats - Grid compacto */}
            <div className="grid grid-cols-2 gap-2 mb-2.5">
              <div
                className={cn(
                  'bg-gradient-to-br from-success/8 to-transparent',
                  'dark:from-success/15 dark:to-transparent',
                  'rounded-lg',
                  'p-1.5',
                  'border',
                  'border-success/20',
                  'dark:border-success/30'
                )}
              >
                <div className="flex items-center gap-1 mb-0.5">
                  <Leaf className="w-3 h-3 text-success" />
                  <span className="text-[9px] text-gray-600 dark:text-stone-400 font-medium">
                    {co2Label}
                  </span>
                </div>
                <p className="text-sm font-bold text-success">
                  {normalizedImpact?.totalCo2SavingsKG} kg
                </p>
              </div>

              <div
                className={cn(
                  'bg-gradient-to-br from-info/8 to-transparent',
                  'dark:from-info/15 dark:to-transparent',
                  'rounded-lg',
                  'p-1.5',
                  'border',
                  'border-info/20',
                  'dark:border-info/30'
                )}
              >
                <div className="flex items-center gap-1 mb-0.5">
                  <Droplets className="w-3 h-3 text-info" />
                  <span className="text-[9px] text-gray-600 dark:text-stone-400 font-medium">
                    {waterLabel}
                  </span>
                </div>
                <p className="text-sm font-bold text-info">
                  {normalizedImpact?.totalWaterSavingsLT} L
                </p>
              </div>
            </div>

            {/* Material Breakdown - Compacto */}
            {normalizedImpact &&
              normalizedImpact.materialBreakdown.length > 0 && (
                <div
                  className={cn(
                    'bg-gray-50/80',
                    'dark:bg-stone-800/50',
                    'rounded-lg',
                    'p-2.5',
                    'border',
                    'border-gray-200/50',
                    'dark:border-stone-700/50'
                  )}
                >
                  <p className="text-[9px] font-semibold text-gray-700 dark:text-stone-300 mb-2">
                    {materialsLabel}
                  </p>
                  <div className="space-y-2">
                    {normalizedImpact.materialBreakdown
                      .slice(0, 2)
                      .map((material, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center justify-between text-[9px]">
                            <span className="text-gray-700 dark:text-stone-300 font-medium truncate">
                              {material.materialType}
                            </span>
                            <span className="font-bold text-primary dark:text-primary ml-1">
                              {material.percentage.toFixed(1)}%
                            </span>
                          </div>
                          <div className="bg-gray-200 dark:bg-stone-700 rounded-full h-1 overflow-hidden">
                            <div
                              className={cn(
                                'h-full',
                                'bg-gradient-to-r from-primary to-primary-hover',
                                'rounded-full',
                                'transition-all',
                                'duration-500'
                              )}
                              style={{ width: `${material.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* View More Button - Compacto */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowImpactModal(true);
                    }}
                    className={cn(
                      'w-full',
                      'mt-2.5',
                      'py-1.5',
                      'px-3',
                      'bg-primary/5',
                      'hover:bg-primary/10',
                      'dark:bg-primary/10',
                      'dark:hover:bg-primary/15',
                      'text-primary',
                      'dark:text-primary-hover',
                      'rounded-lg',
                      'text-[9px]',
                      'font-semibold',
                      'transition-all',
                      'duration-200',
                      'flex',
                      'items-center',
                      'justify-center',
                      'gap-1',
                      'border',
                      'border-primary/20',
                      'hover:border-primary/30',
                      'group/viewmore'
                    )}
                  >
                    {viewMoreLabel}
                    <ChevronRight className="w-3 h-3 group-hover/viewmore:translate-x-0.5 transition-transform duration-200" />
                  </button>
                </div>
              )}
          </div>
        )}

        {/* Seller Information - Compacto */}
        <div className="mt-auto pt-3 border-t border-gray-200/60 dark:border-stone-700/50">
          <div className="flex items-center gap-1.5 mb-2">
            <UserRound className="w-3.5 h-3.5 text-primary" />
            <h4 className="font-bold text-gray-900 dark:text-stone-100 text-xs">
              {sellerLabel}
            </h4>
          </div>
          <div
            className={cn(
              'space-y-1.5',
              'bg-gray-50/80',
              'dark:bg-stone-800/50',
              'rounded-lg',
              'p-2.5',
              'border',
              'border-gray-200/50',
              'dark:border-stone-700/50'
            )}
          >
            {sellerName && (
              <div className="flex items-center gap-2 text-gray-700 dark:text-stone-300 text-[9px] font-medium">
                <UserRound className="w-3 h-3 flex-shrink-0 text-gray-400 dark:text-stone-500" />
                <span className="truncate">{sellerName}</span>
              </div>
            )}
            {sellerPhone && (
              <div className="flex items-center gap-2 text-gray-700 dark:text-stone-300 text-[9px] font-medium">
                <Phone className="w-3 h-3 flex-shrink-0 text-gray-400 dark:text-stone-500" />
                <span className="truncate">{sellerPhone}</span>
              </div>
            )}
            {sellerAddress && (
              <div className="flex items-center gap-2 text-gray-700 dark:text-stone-300 text-[9px] font-medium">
                <MapPin className="w-3 h-3 flex-shrink-0 text-gray-400 dark:text-stone-500" />
                <span className="truncate">{sellerAddress}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
