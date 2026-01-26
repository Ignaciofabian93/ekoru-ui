import {
  useEffect,
  useState,
  type ComponentType,
  type ImgHTMLAttributes,
} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface HeroCarouselProps {
  banners: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    bgColor: string;
  }[];
  ImageComponent?: ComponentType<
    ImgHTMLAttributes<HTMLImageElement> & {
      src: string;
      alt: string;
      width?: number;
      height?: number;
      priority?: boolean;
    }
  >;
  autoScrollInterval?: number;
}

export default function HeroCarousel({
  banners,
  ImageComponent,
  autoScrollInterval = 5000,
}: HeroCarouselProps) {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll carousel (pauses on hover)
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [banners.length, autoScrollInterval, isHovered]);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToBanner = (index: number) => {
    setCurrentBanner(index);
  };

  // Use custom Image component if provided, otherwise fallback to img
  const ImageEl = ImageComponent || 'img';

  return (
    <section
      className="relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px]">
        {banners.map((banner, index) => {
          const isActive = index === currentBanner;
          const isPrev = index < currentBanner;

          return (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
                isActive
                  ? 'translate-x-0 opacity-100'
                  : isPrev
                    ? '-translate-x-full opacity-0'
                    : 'translate-x-full opacity-0'
              }`}
              aria-hidden={!isActive}
            >
              <div className={`${banner.bgColor} h-full flex items-center`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-4 sm:py-6 md:py-6 lg:py-12 w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-6 lg:gap-8 items-center h-full">
                    {/* Text Content */}
                    <div className="text-white text-center lg:text-left space-y-2 sm:space-y-3 lg:space-y-4">
                      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-bold leading-tight animate-fade-in">
                        {banner.title}
                      </h1>
                      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 animate-fade-in-delay-100">
                        {banner.subtitle}
                      </h2>
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/80 max-w-lg mx-auto lg:mx-0 line-clamp-3 animate-fade-in-delay-200">
                        {banner.description}
                      </p>
                      <div className="text-xs sm:text-sm text-white/60 italic pt-2 animate-fade-in-delay-300">
                        Pronto...
                      </div>
                    </div>

                    {/* Image */}
                    <div className="flex justify-center lg:justify-end mt-2 lg:mt-0">
                      <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-72 lg:h-72 xl:w-80 xl:h-80 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105">
                        <ImageEl
                          src={banner.image}
                          alt={banner.title}
                          width={320}
                          height={320}
                          className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-36 lg:h-36 xl:w-40 xl:h-40 object-contain"
                          {...(ImageComponent ? { priority: index === 0 } : {})}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prevBanner}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Previous banner"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={nextBanner}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Next banner"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
        </>
      )}

      {/* Indicators */}
      {banners.length > 1 && (
        <div className="absolute bottom-3 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToBanner(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                index === currentBanner
                  ? 'bg-white w-6 sm:w-8'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to banner ${index + 1}`}
              aria-current={index === currentBanner ? 'true' : 'false'}
            />
          ))}
        </div>
      )}
    </section>
  );
}
