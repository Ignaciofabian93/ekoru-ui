import { useState } from 'react';
import CardFrontSide from './FrontSide';
import CardBackSide from './BackSide';
import { EnvironmentalImpactModal } from '../EnvironmentalImpactModal';
import type { EnvironmentalImpactModalProps } from '../EnvironmentalImpactModal';
import {
  type StoreProduct,
  type MarketplaceProduct,
  type ProductCategoryMaterial,
  type StoreProductMaterial,
} from '@/types/product';
import { type PersonProfile } from '@/types/seller';

export interface ProductCardProps {
  product: Partial<MarketplaceProduct> | Partial<StoreProduct>;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showImpactModal, setShowImpactModal] = useState(false);

  const { images, price, name, brand, color, description, seller } = product;

  // Determine if this is a store product (hasOffer is specific to StoreProduct)
  const isStoreProduct = 'hasOffer' in product;
  const storeHasOffer = Boolean((product as Partial<StoreProduct>).hasOffer);
  const storeOfferPrice = (product as Partial<StoreProduct>).offerPrice;

  // prepare environmental impact sources
  const envImpactModal = (
    product as unknown as {
      environmentalImpact?: EnvironmentalImpactModalProps['environmentalImpact'];
    }
  ).environmentalImpact;
  const backImpact = (product as Partial<MarketplaceProduct>).productCategory
    ?.materials as
    | ProductCategoryMaterial[]
    | StoreProductMaterial[]
    | undefined;

  return (
    <article className="flex-shrink-0 w-[220px] h-[350px] card-flip-perspective">
      <div
        className={`card-flip-inner ${isFlipped ? 'card-flip-flipped' : ''}`}
      >
        {/* Front Side - Product Info */}
        <CardFrontSide
          isFlipped={isFlipped}
          setIsFlipped={setIsFlipped}
          productImage={
            images && images.length > 0 ? (
              <img src={images[0]} alt={name} />
            ) : null
          }
          price={price}
          name={name}
          brand={brand}
          productCondition={(product as Partial<MarketplaceProduct>).condition}
          color={color}
          description={description}
          isExchangeable={
            // only marketplace products support exchange
            !isStoreProduct &&
            (product as Partial<MarketplaceProduct>).isExchangeable
          }
          // store-specific
          isStoreProduct={isStoreProduct}
          hasOffer={storeHasOffer}
          offerPrice={storeOfferPrice}
          fallbackImage="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800&q=60&auto=format&fit=crop"
          onCardClick={() => {}}
          onAddToCart={() => {}}
          onExchange={() => {}}
        />

        {/* Back Side - Environmental Impact & Seller Info */}
        <CardBackSide
          isFlipped={isFlipped}
          setIsFlipped={setIsFlipped}
          setShowImpactModal={setShowImpactModal}
          environmentalImpact={envImpactModal ?? backImpact}
          sellerName={(seller?.profile as PersonProfile)?.firstName}
          sellerPhone={seller?.phone}
          sellerAddress={seller?.address}
        />
      </div>

      {/* Environmental Impact Modal - Rendered outside card */}
      {envImpactModal && (
        <EnvironmentalImpactModal
          isOpen={showImpactModal}
          onClose={() => setShowImpactModal(false)}
          environmentalImpact={envImpactModal}
        />
      )}
    </article>
  );
}
