import { prisma } from '@/lib/prisma';
import { Product, ProductCreateInput, ProductUpdateInput } from '@/types/product';

export const productService = {
  // Get all products
  getProducts: async (): Promise<Product[]> => {
    try {
      const products = await prisma.product.findMany({
        include: {
          category: true,
        },
        orderBy: {
          name: 'asc',
        },
      });
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get products by category
  getProductsByCategory: async (categoryId: string): Promise<Product[]> => {
    try {
      const products = await prisma.product.findMany({
        where: {
          categoryId,
          isActive: true,
        },
        include: {
          category: true,
        },
        orderBy: {
          name: 'asc',
        },
      });
      return products;
    } catch (error) {
      console.error(`Error fetching products for category ${categoryId}:`, error);
      throw error;
    }
  },

  // Get a single product by ID
  getProductById: async (id: string): Promise<Product | null> => {
    try {
      const product = await prisma.product.findUnique({
        where: { id },
        include: {
          category: true,
        },
      });
      return product;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new product
  createProduct: async (data: ProductCreateInput): Promise<Product> => {
    try {
      const product = await prisma.product.create({
        data,
        include: {
          category: true,
        },
      });
      return product;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Update an existing product
  updateProduct: async (id: string, data: ProductUpdateInput): Promise<Product> => {
    try {
      const product = await prisma.product.update({
        where: { id },
        data,
        include: {
          category: true,
        },
      });
      return product;
    } catch (error) {
      console.error(`Error updating product with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete a product
  deleteProduct: async (id: string): Promise<Product> => {
    try {
      const product = await prisma.product.delete({
        where: { id },
      });
      return product;
    } catch (error) {
      console.error(`Error deleting product with ID ${id}:`, error);
      throw error;
    }
  },
};
