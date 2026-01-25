import {
  type Badge,
  type ProductCondition,
  type ProductSize,
  type WeightUnit,
} from './enums';
import { type Seller } from './seller';

export interface MaterialImpactEstimate {
  id: number;
  materialType: string;
  estimatedCo2SavingsKG: number;
  estimatedWaterSavingsLT: number;
}

export interface ProductCategoryMaterial {
  id: number;
  productCategoryId: number;
  materialTypeId: number;
  quantity: number;
  unit: string;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
  material: MaterialImpactEstimate;
}

export interface ProductCategory {
  id: number;
  departmentCategoryId: number;
  keywords: string[];
  productCategoryName: string;
  size?: ProductSize;
  averageWeight?: number;
  weightUnit?: WeightUnit;
  products?: MarketplaceProduct[];
  materials?: ProductCategoryMaterial[];
  href: string;
}

export interface DepartmentCategory {
  id: number;
  departmentCategoryName: string;
  departmentId: number;
  productCategory: ProductCategory[];
  href: string;
}

export interface Department {
  id: number;
  departmentName: string;
  departmentCategory: DepartmentCategory[];
  href: string;
}

export interface MarketplaceProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  sellerId: string;
  badges: Badge[];
  brand: string;
  color?: string;
  createdAt: string;
  images: string[];
  interests: string[];
  isActive: boolean;
  isExchangeable: boolean;
  productCategoryId: number;
  updatedAt: string;
  condition: ProductCondition;
  conditionDescription?: string;
  deletedAt?: string; // Soft delete - null means active
  seller?: Partial<Seller>;
  /** Environmental impact summary, may come from product category or store category */
  environmentalImpact?: EnvironmentalImpact | undefined;
  productCategory?: ProductCategory;
}

export type StoreProduct = {
  id: number;
  name: string;
  description: string;
  stock: number;
  barcode?: string;
  sku?: string;
  price: number;
  hasOffer: boolean;
  offerPrice?: number;
  sellerId: string;
  seller: Partial<Seller>;
  createdAt: string;
  images: string[];
  isActive: boolean;
  updatedAt: string;
  badges: Badge[];
  brand?: string;
  color?: string;
  ratingCount: number;
  averageRating: number;
  reviewsNumber: number;
  storeSubCategoryId: number;
  storeSubCategory: StoreSubCategory;
  /** Environmental impact summary, may come from product category or store category */
  environmentalImpact?: EnvironmentalImpact | undefined;
  deletedAt?: string;
};

export interface MaterialBreakdown {
  materialType: string;
  percentage: number;
  weightKG?: number;
  co2SavingsKG?: number;
  waterSavingsLT?: number;
}

export interface EnvironmentalImpact {
  totalCo2SavingsKG: number;
  totalWaterSavingsLT: number;
  materialBreakdown: MaterialBreakdown[];
}

export type ProductVariant = {
  id: number;
  storeProductId: number;
  variantName: string;
  sku?: string;
  price: number;
  stock: number;
  attributes?: Record<string, unknown>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type StoreProductMaterial = {
  id: number;
  storeProductId: number;
  materialTypeId: number;
  quantity: number;
  unit: string;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
};

export type StoreCategory = {
  id: number;
  category: string;
  subcategories: StoreSubCategory[];
  href: string;
};

export type StoreSubCategory = {
  id: number;
  storeCategoryId: number;
  subCategory: string;
  storeCategory: StoreCategory;
  products: StoreProduct[];
  href: string;
  materials: StoreProductMaterial[];
};
