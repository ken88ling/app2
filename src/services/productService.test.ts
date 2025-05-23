import { prisma } from '@/lib/prisma';
import { productService } from './productService'; // Assuming productService is exported from productService.ts
import { Product } from '@/types/product'; // Assuming Product type is available

// Mock Prisma
jest.mock('@/lib/prisma', () => ({
  prisma: {
    product: {
      findMany: jest.fn(),
    },
  },
}));

// Helper to cast mock
const prismaMock = prisma as jest.Mocked<typeof prisma>;

describe('productService', () => {
  describe('searchProducts', () => {
    let mockProducts: Product[];

    beforeEach(() => {
      // Reset mocks before each test
      jest.clearAllMocks();

      // Define mock products data
      mockProducts = [
        { 
          id: '1', name: 'Laptop Pro', description: 'High-performance laptop', price: 1200, 
          categoryId: 'cat1', isActive: true, stock: 10, image: null,
          category: { id: 'cat1', name: 'Electronics' }
        },
        { 
          id: '2', name: 'Wireless Mouse', description: 'Ergonomic wireless mouse', price: 25, 
          categoryId: 'cat1', isActive: true, stock: 100, image: null,
          category: { id: 'cat1', name: 'Electronics' }
        },
        { 
          id: '3', name: 'Office Chair', description: 'Comfortable office chair', price: 150, 
          categoryId: 'cat2', isActive: true, stock: 20, image: null,
          category: { id: 'cat2', name: 'Furniture' }
        },
        { 
          id: '4', name: 'Gaming Laptop', description: 'Laptop for gaming enthusiasts', price: 1800, 
          categoryId: 'cat1', isActive: true, stock: 5, image: null,
          category: { id: 'cat1', name: 'Electronics' }
        },
        { 
          id: '5', name: 'Old Keyboard', description: 'A very old keyboard (inactive)', price: 5, 
          categoryId: 'cat1', isActive: false, stock: 1, image: null,
          category: { id: 'cat1', name: 'Electronics' }
        },
        { 
          id: '6', name: 'Standing Desk', description: 'Adjustable standing desk', price: 300, 
          categoryId: 'cat2', isActive: true, stock: 15, image: null,
          category: { id: 'cat2', name: 'Furniture' }
        },
        {
          id: '7', name: 'Apple Magic Mouse', description: 'Sleek Apple mouse', price: 79,
          categoryId: 'cat1', isActive: true, stock: 50, image: null,
          category: { id: 'cat1', name: 'Electronics' }
        }
      ];
    });

    test('should search by product name (case-insensitive) and return active products ordered by name with category', async () => {
      const searchTerm = 'laptop';
      const expectedProducts = [mockProducts[3], mockProducts[0]]; // "Gaming Laptop", "Laptop Pro"
      prismaMock.product.findMany.mockResolvedValue(expectedProducts);

      const results = await productService.searchProducts(searchTerm);

      expect(prismaMock.product.findMany).toHaveBeenCalledWith({
        where: {
          isActive: true,
          OR: [
            { name: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } },
          ],
        },
        include: { category: true },
        orderBy: { name: 'asc' },
      });
      expect(results).toEqual(expectedProducts);
      expect(results[0].name).toBe('Gaming Laptop'); // Verifying order
      results.forEach(p => {
        expect(p.isActive).toBe(true);
        expect(p.category).toBeDefined();
      });
    });

    test('should search by product description (case-insensitive) and return active products ordered by name with category', async () => {
      const searchTerm = 'ergonomic';
      const expectedProducts = [mockProducts[1]]; // "Wireless Mouse"
      prismaMock.product.findMany.mockResolvedValue(expectedProducts);

      const results = await productService.searchProducts(searchTerm);

      expect(prismaMock.product.findMany).toHaveBeenCalledWith({
        where: {
          isActive: true,
          OR: [
            { name: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } },
          ],
        },
        include: { category: true },
        orderBy: { name: 'asc' },
      });
      expect(results).toEqual(expectedProducts);
      results.forEach(p => {
        expect(p.isActive).toBe(true);
        expect(p.category).toBeDefined();
      });
    });

    test('should return no results if searchTerm does not match any active product', async () => {
      const searchTerm = 'nonexistent';
      prismaMock.product.findMany.mockResolvedValue([]);

      const results = await productService.searchProducts(searchTerm);

      expect(prismaMock.product.findMany).toHaveBeenCalledWith({
        where: {
          isActive: true,
          OR: [
            { name: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } },
          ],
        },
        include: { category: true },
        orderBy: { name: 'asc' },
      });
      expect(results).toEqual([]);
    });

    test('should return all active products ordered by name if searchTerm is empty string', async () => {
      const allActiveProducts = mockProducts.filter(p => p.isActive).sort((a, b) => a.name.localeCompare(b.name));
      prismaMock.product.findMany.mockResolvedValue(allActiveProducts);

      const results = await productService.searchProducts('');

      expect(prismaMock.product.findMany).toHaveBeenCalledWith({
        where: { isActive: true }, // No OR clause for empty search term
        include: { category: true },
        orderBy: { name: 'asc' },
      });
      expect(results).toEqual(allActiveProducts);
      results.forEach(p => {
        expect(p.isActive).toBe(true);
        expect(p.category).toBeDefined();
      });
    });
    
    test('should return all active products ordered by name if searchTerm is undefined', async () => {
      const allActiveProducts = mockProducts.filter(p => p.isActive).sort((a, b) => a.name.localeCompare(b.name));
      prismaMock.product.findMany.mockResolvedValue(allActiveProducts);

      const results = await productService.searchProducts(undefined);
      
      expect(prismaMock.product.findMany).toHaveBeenCalledWith({
        where: { isActive: true }, // No OR clause for undefined search term
        include: { category: true },
        orderBy: { name: 'asc' },
      });
      expect(results).toEqual(allActiveProducts);
      results.forEach(p => {
        expect(p.isActive).toBe(true);
        expect(p.category).toBeDefined();
      });
    });

    test('should filter by categoryId only (no searchTerm) and return active products ordered by name', async () => {
      const categoryId = 'cat2';
      const expectedProducts = mockProducts.filter(p => p.categoryId === categoryId && p.isActive).sort((a,b) => a.name.localeCompare(b.name));
      prismaMock.product.findMany.mockResolvedValue(expectedProducts);

      const results = await productService.searchProducts(undefined, categoryId);

      expect(prismaMock.product.findMany).toHaveBeenCalledWith({
        where: {
          isActive: true,
          categoryId: categoryId,
        },
        include: { category: true },
        orderBy: { name: 'asc' },
      });
      expect(results).toEqual(expectedProducts);
      expect(results[0].name).toBe('Office Chair'); // "Office Chair", "Standing Desk"
      expect(results[1].name).toBe('Standing Desk');
      results.forEach(p => {
        expect(p.isActive).toBe(true);
        expect(p.categoryId).toBe(categoryId);
        expect(p.category).toBeDefined();
      });
    });

    test('should filter by categoryId AND searchTerm, returning active products ordered by name', async () => {
      const categoryId = 'cat1';
      const searchTerm = 'mouse';
      // Expected: "Apple Magic Mouse", "Wireless Mouse"
      const expectedProducts = [mockProducts[6], mockProducts[1]];
      prismaMock.product.findMany.mockResolvedValue(expectedProducts);

      const results = await productService.searchProducts(searchTerm, categoryId);

      expect(prismaMock.product.findMany).toHaveBeenCalledWith({
        where: {
          isActive: true,
          categoryId: categoryId,
          OR: [
            { name: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } },
          ],
        },
        include: { category: true },
        orderBy: { name: 'asc' },
      });
      expect(results).toEqual(expectedProducts);
      expect(results[0].name).toBe('Apple Magic Mouse');
      expect(results[1].name).toBe('Wireless Mouse');
      results.forEach(p => {
        expect(p.isActive).toBe(true);
        expect(p.categoryId).toBe(categoryId);
        expect(p.category).toBeDefined();
      });
    });

    test('should return no results if categoryId has no products (and no searchTerm)', async () => {
      const categoryId = 'cat3-nonexistent';
      prismaMock.product.findMany.mockResolvedValue([]);

      const results = await productService.searchProducts(undefined, categoryId);

      expect(prismaMock.product.findMany).toHaveBeenCalledWith({
        where: {
          isActive: true,
          categoryId: categoryId,
        },
        include: { category: true },
        orderBy: { name: 'asc' },
      });
      expect(results).toEqual([]);
    });
    
    test('should return no results if categoryId has only inactive products', async () => {
      const categoryIdWithOnlyInactive = 'cat-inactive';
      // Simulate that any product in this category would be inactive
      // The service itself filters by isActive: true, so findMany would be called with that
      prismaMock.product.findMany.mockResolvedValue([]); 
                                                      
      const results = await productService.searchProducts(undefined, categoryIdWithOnlyInactive);

      expect(prismaMock.product.findMany).toHaveBeenCalledWith({
        where: {
          isActive: true,
          categoryId: categoryIdWithOnlyInactive,
        },
        include: { category: true },
        orderBy: { name: 'asc' },
      });
      expect(results).toEqual([]);
    });

    test('should only return active products even if searchTerm matches inactive ones', async () => {
      const searchTerm = 'keyboard'; // "Old Keyboard" is inactive
      // searchProducts itself filters by isActive: true, so mock should return empty if only match is inactive
      prismaMock.product.findMany.mockResolvedValue([]); 

      const results = await productService.searchProducts(searchTerm);

      expect(prismaMock.product.findMany).toHaveBeenCalledWith({
        where: {
          isActive: true,
          OR: [
            { name: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } },
          ],
        },
        include: { category: true },
        orderBy: { name: 'asc' },
      });
      expect(results).toEqual([]);
    });
    
    test('should correctly order results by name (case-insensitive in DB sort, but JS sort for mock check)', async () => {
      const searchTerm = 'laptop'; 
      // "Gaming Laptop", "Laptop Pro"
      const unsortedMatchingProducts = [mockProducts[0], mockProducts[3]]; 
      const expectedSortedProducts = [mockProducts[3], mockProducts[0]]; // Gaming Laptop, Laptop Pro
      prismaMock.product.findMany.mockResolvedValue(expectedSortedProducts);

      const results = await productService.searchProducts(searchTerm);
      
      expect(prismaMock.product.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { name: 'asc' },
        })
      );
      expect(results).toEqual(expectedSortedProducts);
      expect(results.map(p => p.name)).toEqual(['Gaming Laptop', 'Laptop Pro']);
    });

    test('should include category information in each product', async () => {
      const searchTerm = 'chair';
      const expectedProducts = [mockProducts[2]]; // "Office Chair"
      prismaMock.product.findMany.mockResolvedValue(expectedProducts);

      const results = await productService.searchProducts(searchTerm);

      expect(prismaMock.product.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          include: { category: true },
        })
      );
      expect(results.length).toBe(1);
      expect(results[0].category).toBeDefined();
      expect(results[0].category.name).toBe('Furniture');
    });

  });
});
