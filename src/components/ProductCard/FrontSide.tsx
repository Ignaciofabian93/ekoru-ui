import { IterationCw, RotateCcw, ShoppingCart } from 'lucide-react';
import { ProductCondition } from '@/types/enums';
import { Button } from '../Button';

export interface FrontSideProps {
  isFlipped: boolean;
  setIsFlipped: (flipped: boolean) => void;
  onCardClick: () => void;
  productImage?: React.ReactNode;
  fallbackImage?: React.ReactNode;
  productCondition?: string;
  brand?: string;
  name?: string;
  description?: string;
  price?: number;
  color?: string;
  isExchangeable?: boolean;
  isStoreProduct?: boolean;
  interests?: string[];
  hasOffer?: boolean;
  offerLabel?: string;
  offerPrice?: number;
  localeString?: string;
  onAddToCart?: () => void;
  onExchange?: () => void;
  addToCartAriaLabel?: string;
  exchangeAriaLabel?: string;
  addToCartLabel?: string;
  exchangeLabel?: string;
}

export default function CardFrontSide({
  isFlipped,
  setIsFlipped,
  onCardClick,
  productImage,
  fallbackImage,
  productCondition,
  brand,
  name,
  description,
  price,
  color,
  isExchangeable,
  isStoreProduct,
  hasOffer,
  offerPrice,
  onAddToCart,
  onExchange,
  addToCartAriaLabel = 'Add to cart',
  exchangeAriaLabel = 'Exchange product',
  offerLabel = 'Price Drop',
  localeString = 'es-CL',
  addToCartLabel = 'Agregar al carrito',
  exchangeLabel = 'Intercambiar',
  interests = [
    'exchange interest1',
    'exchange interest2',
    'exchange interest3',
  ],
}: FrontSideProps) {
  // Color mapping for product conditions
  const conditionColorMap: Record<ProductCondition, string> = {
    [ProductCondition.NEW]: 'bg-green-500 text-white',
    [ProductCondition.OPEN_BOX]: 'bg-blue-400 text-white',
    [ProductCondition.LIKE_NEW]: 'bg-emerald-400 text-white',
    [ProductCondition.FAIR]: 'bg-yellow-400 text-gray-900',
    [ProductCondition.POOR]: 'bg-red-500 text-white',
    [ProductCondition.FOR_PARTS]: 'bg-gray-500 text-white',
    [ProductCondition.REFURBISHED]: 'bg-purple-500 text-white',
  };

  // Get color for condition
  const getConditionColor = (condition?: string) => {
    if (!condition) return 'bg-gray-300 text-gray-700';
    const key = condition as ProductCondition;
    return conditionColorMap[key] || 'bg-gray-300 text-gray-700';
  };

  return (
    <div className="card-flip-front bg-white dark:bg-stone-800 rounded-xl shadow-md border border-gray-200/60 dark:border-stone-700/60 overflow-hidden hover:shadow-xl hover:border-primary/40 dark:hover:border-primary/50 transition-all duration-300 group">
      {/* Image Container */}
      <figure className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-50 dark:from-stone-700 dark:to-stone-800 overflow-hidden">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-300 pointer-events-none z-[1]" />

        <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500">
          {productImage ? productImage : fallbackImage}
        </div>

        {/* Condition / Offer Badge */}
        {isStoreProduct ? (
          hasOffer ? (
            <span
              className={`absolute bottom-2 left-2 bg-red-500 text-white backdrop-blur-md text-[10px] font-semibold px-2.5 py-1 rounded-lg shadow-md border border-white/50 dark:border-stone-700/50`}
            >
              {offerLabel}
            </span>
          ) : null
        ) : (
          <span
            className={`absolute bottom-2 left-2 ${getConditionColor(productCondition)} backdrop-blur-md text-[10px] font-semibold px-2.5 py-1 rounded-lg capitalize shadow-md border border-white/50 dark:border-stone-700/50`}
          >
            {productCondition}
          </span>
        )}

        {/* Flip Button - Compacto */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFlipped(!isFlipped);
          }}
          className="absolute top-2 right-2 bg-white/90 dark:bg-stone-800/90 hover:bg-primary dark:hover:bg-primary text-gray-700 dark:text-stone-200 hover:text-white p-1.5 rounded-lg shadow-lg transition-all duration-200 hover:scale-110 backdrop-blur-sm border border-gray-200/50 dark:border-stone-600/50 z-[2]"
          aria-label="Ver impacto ambiental"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </figure>

      {/* Content - Compacto y limpio */}
      <div className="p-3.5" onClick={onCardClick}>
        {/* Header */}
        <header className="flex items-center justify-between gap-2 mb-2">
          <span className="text-gray-500 dark:text-stone-400 text-[10px] font-medium uppercase tracking-wide truncate">
            {brand}
          </span>
          {color && (
            <span className="text-gray-400 dark:text-stone-500 text-[10px] font-medium truncate max-w-[60px]">
              {color}
            </span>
          )}
        </header>

        {/* Product Name */}
        <h3 className="font-semibold text-sm text-gray-900 dark:text-stone-50 line-clamp-1 mb-1.5 group-hover:text-primary dark:group-hover:text-primary-hover transition-colors duration-200">
          {name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-stone-400 text-xs line-clamp-1 mb-3 leading-relaxed">
          {description}
        </p>

        {/* Footer */}
        <footer className="flex flex-col items-start justify-between gap-2">
          {isStoreProduct && hasOffer && !isExchangeable && (
            <div className="flex items-center justify-center gap-1">
              <span className="text-primary dark:text-primary-hover font-bold text-xl">
                ${offerPrice?.toLocaleString(localeString)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ${price?.toLocaleString(localeString)}
              </span>
            </div>
          )}{' '}
          {(!isStoreProduct || !hasOffer) && !isExchangeable && (
            <p className="text-primary dark:text-primary-hover font-bold text-xl">
              ${price?.toLocaleString(localeString)}
            </p>
          )}
          {isExchangeable && interests && (
            <div
              className="flex items-center gap-2 mb-2 overflow-x-auto scroll-smooth snap-x snap-mandatory px-3 flex-nowrap w-full scrollbar-hide"
              style={{ WebkitOverflowScrolling: 'touch' }}
              tabIndex={0}
              role="list"
              aria-label="Interests"
            >
              {interests.map((interest, index) => (
                <span
                  key={index}
                  role="listitem"
                  className="inline-flex items-center flex-shrink-0 snap-start text-[10px] whitespace-nowrap px-2 py-1 rounded-full bg-gray-100 dark:bg-stone-700 text-gray-800 dark:text-stone-100 font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          )}
          {/* If store product: only show add-to-cart. Marketplace: show exchange if exchangeable, otherwise add-to-cart */}
          {isStoreProduct && !isExchangeable && (
            <Button
              variant="primary"
              size="sm"
              fullWidth
              aria-label={addToCartAriaLabel}
              rightIcon={ShoppingCart}
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart?.();
              }}
            >
              {addToCartLabel}
            </Button>
          )}
          {isExchangeable && (
            <Button
              variant="primary"
              size="sm"
              fullWidth
              aria-label={exchangeAriaLabel}
              rightIcon={IterationCw}
              onClick={(e) => {
                e.stopPropagation();
                onExchange?.();
              }}
            >
              {exchangeLabel}
            </Button>
          )}{' '}
          {!isExchangeable && !isStoreProduct && (
            <Button
              variant="primary"
              size="sm"
              fullWidth
              aria-label={addToCartAriaLabel}
              rightIcon={ShoppingCart}
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart?.();
              }}
            >
              {addToCartLabel}
            </Button>
          )}
        </footer>
      </div>
    </div>
  );
}
