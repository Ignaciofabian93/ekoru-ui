import type { Meta, StoryObj } from '@storybook/react';
import type { StoreProduct } from '@/types/product';
import type { Seller } from '@/types/seller';
import { ProductCondition } from '@/types/enums';
import ProductCard from './ProductCard';

const meta: Meta<typeof ProductCard> = {
  title: 'Components/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleProduct = {
  id: 1,
  name: 'Camiseta Básica',
  description: 'Camiseta de algodón orgánico',
  brand: 'EcoWear',
  price: 15000,
  color: 'Azul',
  condition: ProductCondition.FAIR,
  isExchangeable: false,
  sellerId: 'seller-1',
  badges: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  interests: [],
  isActive: true,
  productCategoryId: 1,
  images: [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
  ],
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

export const Default: Story = {
  args: {
    product: sampleProduct,
  },
};

export const ExchangeableProduct: Story = {
  args: {
    product: {
      ...sampleProduct,
      name: 'Pantalón Denim',
      description: 'Jeans vintage de calidad',
      brand: "Levi's",
      price: 25000,
      color: 'Negro',
      condition: ProductCondition.LIKE_NEW,
      interests: ['Jeans', 'Shoes', 'Accessories'],
      isExchangeable: true,
      images: [
        'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
      ],
      environmentalImpact: {
        totalCo2SavingsKG: 32.5,
        totalWaterSavingsLT: 1850,
        materialBreakdown: [
          {
            materialType: 'Denim',
            percentage: 98,
            weightKG: 0.98,
            co2SavingsKG: 31.85,
            waterSavingsLT: 1813,
          },
          {
            materialType: 'Elastano',
            percentage: 2,
            weightKG: 0.02,
            co2SavingsKG: 0.65,
            waterSavingsLT: 37,
          },
        ],
      },
    },
  },
};

export const HighImpactProduct: Story = {
  args: {
    product: {
      ...sampleProduct,
      name: 'Chaqueta de Invierno',
      description: 'Chaqueta acolchada sostenible',
      brand: 'Patagonia',
      price: 45000,
      color: 'Verde',
      condition: ProductCondition.LIKE_NEW,
      images: [
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80&auto=format&fit=crop',
      ],
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
          {
            materialType: 'Algodón',
            percentage: 15,
            weightKG: 0.3,
            co2SavingsKG: 9.87,
            waterSavingsLT: 427.5,
          },
          {
            materialType: 'Nylon',
            percentage: 5,
            weightKG: 0.1,
            co2SavingsKG: 3.29,
            waterSavingsLT: 142.5,
          },
        ],
      },
    },
  },
};

export const LowImpactProduct: Story = {
  args: {
    product: {
      ...sampleProduct,
      name: 'Calcetines Deportivos',
      description: 'Pack de 3 pares',
      brand: 'Nike',
      price: 8000,
      color: 'Blanco',
      condition: ProductCondition.FAIR,
      images: [
        'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400',
      ],
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
          {
            materialType: 'Poliéster',
            percentage: 25,
            weightKG: 0.025,
            co2SavingsKG: 0.38,
            waterSavingsLT: 16.25,
          },
        ],
      },
    },
  },
};

export const NoEnvironmentalImpact: Story = {
  args: {
    product: {
      id: 5,
      name: 'Zapatillas Running',
      description: 'Zapatillas deportivas en buen estado',
      brand: 'Adidas',
      price: 35000,
      color: 'Negro/Rojo',
      condition: ProductCondition.LIKE_NEW,
      isExchangeable: false,
      sellerId: 'seller-5',
      badges: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      interests: [],
      isActive: true,
      productCategoryId: 1,
      images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
      ],
      seller: {
        phone: '+56 9 8765 4321',
        address: 'Valparaíso, Chile',
      } as Partial<Seller>,
    },
  },
};

export const ManyMaterials: Story = {
  args: {
    product: {
      ...sampleProduct,
      name: 'Vestido Elegante',
      description: 'Vestido de cóctel con detalles',
      brand: 'Zara',
      price: 28000,
      color: 'Rojo',
      condition: ProductCondition.LIKE_NEW,
      images: [
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
      ],
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
    },
  },
};

export const MinimalSeller: Story = {
  args: {
    product: {
      ...sampleProduct,
      seller: {
        phone: '+56 9 0000 0000',
      } as Partial<Seller>,
    },
  },
};

export const StoreNoOffer: Story = {
  args: {
    product: {
      id: 101,
      name: 'Reusable Water Bottle',
      description: 'Insulated stainless steel bottle',
      price: 12000,
      hasOffer: false,
      sellerId: 'store-1',
      images: [
        'https://images.unsplash.com/photo-1526406915891-2c0d3f0a6e54?w=400&q=80&auto=format&fit=crop',
      ],
      brand: 'Hydro',
      color: 'White',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seller: { phone: '+56 9 2222 2222' } as Partial<Seller>,
    } as Partial<StoreProduct>,
  },
};

export const StoreWithOffer: Story = {
  args: {
    product: {
      id: 102,
      name: 'Eco Backpack',
      description: 'Made from recycled bottles',
      price: 52000,
      hasOffer: true,
      offerPrice: 42000,
      sellerId: 'store-1',
      images: [
        'https://images.unsplash.com/photo-1542293787938-c9e299b880a3?w=400&q=80&auto=format&fit=crop',
      ],
      brand: 'GreenPack',
      color: 'Olive',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seller: { phone: '+56 9 3333 3333' } as Partial<Seller>,
    } as Partial<StoreProduct>,
  },
};
