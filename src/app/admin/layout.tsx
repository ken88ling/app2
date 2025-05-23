'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, Grid, ShoppingCart, Users } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-900">MediCart Admin</h1>
        </div>
        <nav className="mt-6">
          <ul>
            <li>
              <Link
                href="/admin"
                className={`flex items-center px-6 py-3 text-sm ${
                  isActive('/admin') && !isActive('/admin/categories') && !isActive('/admin/products')
                    ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Grid className="w-5 h-5 mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/categories"
                className={`flex items-center px-6 py-3 text-sm ${
                  isActive('/admin/categories')
                    ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Grid className="w-5 h-5 mr-3" />
                Categories
              </Link>
            </li>
            <li>
              <Link
                href="/admin/products"
                className={`flex items-center px-6 py-3 text-sm ${
                  isActive('/admin/products')
                    ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Package className="w-5 h-5 mr-3" />
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/admin/orders"
                className={`flex items-center px-6 py-3 text-sm ${
                  isActive('/admin/orders')
                    ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <ShoppingCart className="w-5 h-5 mr-3" />
                Orders
              </Link>
            </li>
            <li>
              <Link
                href="/admin/customers"
                className={`flex items-center px-6 py-3 text-sm ${
                  isActive('/admin/customers')
                    ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Users className="w-5 h-5 mr-3" />
                Customers
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Admin Panel</h2>
              <div className="flex items-center space-x-4">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">A</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
