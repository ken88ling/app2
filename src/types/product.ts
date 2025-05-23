// type Product
import { Category } from './category';

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  stock: number;
  sold: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
  category?: Category;
}

export interface ProductCreateInput {
  name: string;
  description?: string;
  price: number;
  image?: string;
  stock?: number;
  isActive?: boolean;
  categoryId: string;
}

export interface ProductUpdateInput {
  name?: string;
  description?: string | null;
  price?: number;
  image?: string | null;
  stock?: number;
  sold?: number;
  isActive?: boolean;
  categoryId?: string;
}
