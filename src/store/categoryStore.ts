import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Category, CategoryCreateInput, CategoryUpdateInput } from '@/types/category';
import { categoryService } from '@/services/categoryService';

interface CategoryState {
  categories: Category[];
  selectedCategory: Category | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchCategories: () => Promise<void>;
  fetchCategoryById: (id: string) => Promise<void>;
  createCategory: (data: CategoryCreateInput) => Promise<void>;
  updateCategory: (id: string, data: CategoryUpdateInput) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  setSelectedCategory: (category: Category | null) => void;
}

export const useCategoryStore = create<CategoryState>()(
  immer((set) => ({
    categories: [],
    selectedCategory: null,
    isLoading: false,
    error: null,

    fetchCategories: async () => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        const categories = await categoryService.getCategories();
        set((state) => {
          state.categories = categories;
          state.isLoading = false;
        });
      } catch (error) {
        set((state) => {
          state.error = error instanceof Error ? error.message : 'An unknown error occurred';
          state.isLoading = false;
        });
      }
    },

    fetchCategoryById: async (id: string) => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        const category = await categoryService.getCategoryById(id);
        set((state) => {
          state.selectedCategory = category;
          state.isLoading = false;
        });
      } catch (error) {
        set((state) => {
          state.error = error instanceof Error ? error.message : 'An unknown error occurred';
          state.isLoading = false;
        });
      }
    },

    createCategory: async (data: CategoryCreateInput) => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        const newCategory = await categoryService.createCategory(data);
        set((state) => {
          state.categories.push(newCategory);
          state.isLoading = false;
        });
      } catch (error) {
        set((state) => {
          state.error = error instanceof Error ? error.message : 'An unknown error occurred';
          state.isLoading = false;
        });
      }
    },

    updateCategory: async (id: string, data: CategoryUpdateInput) => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        const updatedCategory = await categoryService.updateCategory(id, data);
        set((state) => {
          const index = state.categories.findIndex((category) => category.id === id);
          if (index !== -1) {
            state.categories[index] = updatedCategory;
          }
          if (state.selectedCategory?.id === id) {
            state.selectedCategory = updatedCategory;
          }
          state.isLoading = false;
        });
      } catch (error) {
        set((state) => {
          state.error = error instanceof Error ? error.message : 'An unknown error occurred';
          state.isLoading = false;
        });
      }
    },

    deleteCategory: async (id: string) => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        await categoryService.deleteCategory(id);
        set((state) => {
          state.categories = state.categories.filter((category) => category.id !== id);
          if (state.selectedCategory?.id === id) {
            state.selectedCategory = null;
          }
          state.isLoading = false;
        });
      } catch (error) {
        set((state) => {
          state.error = error instanceof Error ? error.message : 'An unknown error occurred';
          state.isLoading = false;
        });
      }
    },

    setSelectedCategory: (category: Category | null) => {
      set((state) => {
        state.selectedCategory = category;
      });
    },
  }))
);
