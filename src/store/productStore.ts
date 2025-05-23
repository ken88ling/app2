import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Product, ProductCreateInput, ProductUpdateInput } from '@/types/product';
import { productService } from '@/services/productService';

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  selectedProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchProducts: () => Promise<void>;
  fetchProductsByCategory: (categoryId: string) => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;
  createProduct: (data: ProductCreateInput) => Promise<void>;
  updateProduct: (id: string, data: ProductUpdateInput) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  setSelectedProduct: (product: Product | null) => void;
  filterProducts: (searchTerm: string) => void;
  resetFilters: () => void;
}

export const useProductStore = create<ProductState>()(
  immer((set, get) => ({
    products: [],
    filteredProducts: [],
    selectedProduct: null,
    isLoading: false,
    error: null,

    fetchProducts: async () => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        const products = await productService.getProducts();
        set((state) => {
          state.products = products;
          state.filteredProducts = products;
          state.isLoading = false;
        });
      } catch (error) {
        set((state) => {
          state.error = error instanceof Error ? error.message : 'An unknown error occurred';
          state.isLoading = false;
        });
      }
    },

    fetchProductsByCategory: async (categoryId: string) => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        const products = await productService.getProductsByCategory(categoryId);
        set((state) => {
          state.filteredProducts = products;
          state.isLoading = false;
        });
      } catch (error) {
        set((state) => {
          state.error = error instanceof Error ? error.message : 'An unknown error occurred';
          state.isLoading = false;
        });
      }
    },

    fetchProductById: async (id: string) => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        const product = await productService.getProductById(id);
        set((state) => {
          state.selectedProduct = product;
          state.isLoading = false;
        });
      } catch (error) {
        set((state) => {
          state.error = error instanceof Error ? error.message : 'An unknown error occurred';
          state.isLoading = false;
        });
      }
    },

    createProduct: async (data: ProductCreateInput) => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        const newProduct = await productService.createProduct(data);
        set((state) => {
          state.products.push(newProduct);
          state.filteredProducts = state.products;
          state.isLoading = false;
        });
      } catch (error) {
        set((state) => {
          state.error = error instanceof Error ? error.message : 'An unknown error occurred';
          state.isLoading = false;
        });
      }
    },

    updateProduct: async (id: string, data: ProductUpdateInput) => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        const updatedProduct = await productService.updateProduct(id, data);
        set((state) => {
          const index = state.products.findIndex((product) => product.id === id);
          if (index !== -1) {
            state.products[index] = updatedProduct;
          }
          
          const filteredIndex = state.filteredProducts.findIndex((product) => product.id === id);
          if (filteredIndex !== -1) {
            state.filteredProducts[filteredIndex] = updatedProduct;
          }
          
          if (state.selectedProduct?.id === id) {
            state.selectedProduct = updatedProduct;
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

    deleteProduct: async (id: string) => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        await productService.deleteProduct(id);
        set((state) => {
          state.products = state.products.filter((product) => product.id !== id);
          state.filteredProducts = state.filteredProducts.filter((product) => product.id !== id);
          
          if (state.selectedProduct?.id === id) {
            state.selectedProduct = null;
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

    setSelectedProduct: (product: Product | null) => {
      set((state) => {
        state.selectedProduct = product;
      });
    },

    filterProducts: (searchTerm: string) => {
      const { products } = get();
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      
      set((state) => {
        state.filteredProducts = products.filter((product) => 
          product.name.toLowerCase().includes(lowercaseSearchTerm) || 
          product.description?.toLowerCase().includes(lowercaseSearchTerm) ||
          product.category?.name.toLowerCase().includes(lowercaseSearchTerm)
        );
      });
    },

    resetFilters: () => {
      const { products } = get();
      set((state) => {
        state.filteredProducts = products;
      });
    },
  }))
);
