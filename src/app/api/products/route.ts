import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { productService } from '@/services/productService';

// GET /api/products - Get all products, filter by category, or search
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const searchTerm = searchParams.get('search') || undefined;
    const categoryId = searchParams.get('categoryId') || undefined;

    let products;

    if (searchTerm) {
      // Assuming searchProducts will be updated to handle categoryId
      products = await productService.searchProducts(searchTerm, categoryId);
    } else if (categoryId) {
      products = await productService.getProductsByCategory(categoryId);
    } else {
      // searchProducts without a term should return all active products
      products = await productService.searchProducts();
    }
    
    return NextResponse.json(products);
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.price || !body.categoryId) {
      return NextResponse.json(
        { error: 'Name, price, and categoryId are required' },
        { status: 400 }
      );
    }
    
    // Validate price is a positive number
    if (typeof body.price !== 'number' || body.price <= 0) {
      return NextResponse.json(
        { error: 'Price must be a positive number' },
        { status: 400 }
      );
    }
    
    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id: body.categoryId },
    });
    
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    
    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description || null,
        price: body.price,
        image: body.image || null,
        stock: body.stock || 0,
        isActive: body.isActive !== undefined ? body.isActive : true,
        categoryId: body.categoryId,
      },
      include: {
        category: true,
      },
    });
    
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
