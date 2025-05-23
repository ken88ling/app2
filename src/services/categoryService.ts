import { prisma } from '@/lib/prisma';
import { Category, CategoryCreateInput, CategoryUpdateInput } from '@/types/category';

export const categoryService = {
  // Get all categories
  getCategories: async (): Promise<Category[]> => {
    try {
      const categories = await prisma.category.findMany({
        orderBy: {
          name: 'asc',
        },
      });
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Get a single category by ID
  getCategoryById: async (id: string): Promise<Category | null> => {
    try {
      const category = await prisma.category.findUnique({
        where: { id },
        include: {
          products: true,
        },
      });
      return category;
    } catch (error) {
      console.error(`Error fetching category with ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new category
  createCategory: async (data: CategoryCreateInput): Promise<Category> => {
    try {
      const category = await prisma.category.create({
        data,
      });
      return category;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },

  // Update an existing category
  updateCategory: async (id: string, data: CategoryUpdateInput): Promise<Category> => {
    try {
      const category = await prisma.category.update({
        where: { id },
        data,
      });
      return category;
    } catch (error) {
      console.error(`Error updating category with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete a category
  deleteCategory: async (id: string): Promise<Category> => {
    try {
      const category = await prisma.category.delete({
        where: { id },
      });
      return category;
    } catch (error) {
      console.error(`Error deleting category with ID ${id}:`, error);
      throw error;
    }
  },
};
