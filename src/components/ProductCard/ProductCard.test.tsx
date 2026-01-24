import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { type MarketplaceProduct } from '@/types/product';
import type { Seller } from '@/types/seller';
import { ProductCondition } from '@/types/enums';
import ProductCard from './ProductCard';

describe('ProductCard', () => {
  const sampleProduct: MarketplaceProduct = {
    id: 1,
    name: 'Camiseta Básica',
    description: 'Camiseta de algodón orgánico',
    brand: 'EcoWear',
    price: 15000,
    color: 'Azul',
    condition: ProductCondition.LIKE_NEW,
    isExchangeable: false,
    sellerId: 'seller-1',
    badges: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    interests: [],
    isActive: true,
    productCategoryId: 1,
    images: ['https://example.com/image.jpg'],
    seller: {
      phone: '+56 9 1234 5678',
      address: 'Santiago, Chile',
    } as Partial<Seller>,
    environmentalImpact: {
      totalCo2SavingsKG: 8.5,
      totalWaterSavingsLT: 320,
      materialBreakdown: [
        {
          materialType: 'Algodón',
          percentage: 95,
          weightKG: 0.19,
          co2SavingsKG: 8.08,
          waterSavingsLT: 304,
        },
        {
          materialType: 'Elastano',
          percentage: 5,
          weightKG: 0.01,
          co2SavingsKG: 0.43,
          waterSavingsLT: 16,
        },
      ],
    },
  };

  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    cleanup();
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  it('renders product card', () => {
    render(<ProductCard product={sampleProduct} />);
    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('displays front side by default', () => {
    render(<ProductCard product={sampleProduct} />);
    const frontSide = document.querySelector('.card-flip-front');
    expect(frontSide).toBeInTheDocument();
  });

  it('displays back side when flipped', async () => {
    const user = userEvent.setup();
    render(<ProductCard product={sampleProduct} />);

    const flipButton = screen.getAllByLabelText('Ver impacto ambiental')[0];
    await user.click(flipButton);

    await waitFor(() => {
      const card = document.querySelector('.card-flip-flipped');
      expect(card).toBeInTheDocument();
    });
  });

  it('flips back to front side', async () => {
    const user = userEvent.setup();
    render(<ProductCard product={sampleProduct} />);

    // Flip to back
    const flipButton1 = screen.getAllByLabelText('Ver impacto ambiental')[0];
    await user.click(flipButton1);

    await waitFor(() => {
      expect(document.querySelector('.card-flip-flipped')).toBeInTheDocument();
    });

    // Flip back to front
    const flipButton2 = screen.getByLabelText('Ver producto');
    await user.click(flipButton2);

    await waitFor(() => {
      expect(
        document.querySelector('.card-flip-flipped')
      ).not.toBeInTheDocument();
    });
  });

  it('opens environmental impact modal', async () => {
    const user = userEvent.setup();
    render(<ProductCard product={sampleProduct} />);

    // Flip to back side
    const flipButton = screen.getAllByLabelText('Ver impacto ambiental')[0];
    await user.click(flipButton);

    await waitFor(() => {
      expect(document.querySelector('.card-flip-flipped')).toBeInTheDocument();
    });

    // Click view more button
    const viewMoreButton = screen.getByText('View Full Impact');
    await user.click(viewMoreButton);

    // Check modal is open
    await waitFor(() => {
      expect(
        screen.getByText('Impacto Ambiental Detallado')
      ).toBeInTheDocument();
    });
  });

  it('closes environmental impact modal', async () => {
    const user = userEvent.setup();
    render(<ProductCard product={sampleProduct} />);

    // Flip and open modal
    const flipButton = screen.getAllByLabelText('Ver impacto ambiental')[0];
    await user.click(flipButton);

    await waitFor(() => {
      expect(document.querySelector('.card-flip-flipped')).toBeInTheDocument();
    });

    const viewMoreButton = screen.getByText('View Full Impact');
    await user.click(viewMoreButton);

    await waitFor(() => {
      expect(
        screen.getByText('Impacto Ambiental Detallado')
      ).toBeInTheDocument();
    });

    // Close modal
    const closeButton = screen.getByRole('button', { name: 'Close modal' });
    await user.click(closeButton);

    await waitFor(() => {
      expect(
        screen.queryByText('Impacto Ambiental Detallado')
      ).not.toBeInTheDocument();
    });
  });

  it('does not render environmental impact modal when no impact data', () => {
    const productWithoutImpact = {
      ...sampleProduct,
      environmentalImpact: undefined,
    };
    render(<ProductCard product={productWithoutImpact} />);

    expect(
      screen.queryByText('Impacto Ambiental Detallado')
    ).not.toBeInTheDocument();
  });

  it('maintains card dimensions', () => {
    render(<ProductCard product={sampleProduct} />);
    const article = screen.getByRole('article');
    expect(article).toHaveClass('w-[180px]', 'md:w-[220px]');
    expect(article).toHaveClass('h-[300px]', 'md:h-[330px]');
  });

  it('applies perspective for flip animation', () => {
    render(<ProductCard product={sampleProduct} />);
    const article = screen.getByRole('article');
    expect(article).toHaveClass('card-flip-perspective');
  });

  it('renders with exchangeable product', () => {
    const exchangeableProduct = {
      ...sampleProduct,
      isExchangeable: true,
    };
    render(<ProductCard product={exchangeableProduct} />);
    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('renders with minimal seller info', () => {
    const minimalProduct = {
      ...sampleProduct,
      seller: {
        phone: '+56 9 0000 0000',
      } as Partial<Seller>,
    };
    render(<ProductCard product={minimalProduct} />);
    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('renders with many materials', async () => {
    const user = userEvent.setup();
    const manyMaterialsProduct = {
      ...sampleProduct,
      environmentalImpact: {
        totalCo2SavingsKG: 22.5,
        totalWaterSavingsLT: 980,
        materialBreakdown: [
          {
            materialType: 'Poliéster',
            percentage: 50,
            weightKG: 0.35,
            co2SavingsKG: 11.25,
            waterSavingsLT: 490,
          },
          {
            materialType: 'Viscosa',
            percentage: 30,
            weightKG: 0.21,
            co2SavingsKG: 6.75,
            waterSavingsLT: 294,
          },
          {
            materialType: 'Algodón',
            percentage: 15,
            weightKG: 0.105,
            co2SavingsKG: 3.38,
            waterSavingsLT: 147,
          },
          {
            materialType: 'Elastano',
            percentage: 5,
            weightKG: 0.035,
            co2SavingsKG: 1.13,
            waterSavingsLT: 49,
          },
        ],
      },
    };

    render(<ProductCard product={manyMaterialsProduct} />);

    // Flip to back side to see materials
    const flipButton = screen.getAllByLabelText('Ver impacto ambiental')[0];
    await user.click(flipButton);

    // Should display only first 2 materials on card
    await waitFor(() => {
      expect(screen.getByText('Poliéster')).toBeInTheDocument();
      expect(screen.getByText('Viscosa')).toBeInTheDocument();
    });
  });

  it('handles high impact product', () => {
    const highImpactProduct = {
      ...sampleProduct,
      environmentalImpact: {
        totalCo2SavingsKG: 65.8,
        totalWaterSavingsLT: 2850,
        materialBreakdown: [
          {
            materialType: 'Poliéster Reciclado',
            percentage: 80,
            weightKG: 1.6,
            co2SavingsKG: 52.64,
            waterSavingsLT: 2280,
          },
        ],
      },
    };
    render(<ProductCard product={highImpactProduct} />);
    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('handles low impact product', () => {
    const lowImpactProduct = {
      ...sampleProduct,
      environmentalImpact: {
        totalCo2SavingsKG: 1.5,
        totalWaterSavingsLT: 65,
        materialBreakdown: [
          {
            materialType: 'Algodón',
            percentage: 75,
            weightKG: 0.075,
            co2SavingsKG: 1.13,
            waterSavingsLT: 48.75,
          },
        ],
      },
    };
    render(<ProductCard product={lowImpactProduct} />);
    expect(screen.getByRole('article')).toBeInTheDocument();
  });
});
