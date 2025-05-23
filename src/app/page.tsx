"use client";

import { useState } from "react";
import {
  TrendingUp,
  Package,
  Users,
  ShoppingCart,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock data - replace with actual API calls
  const salesData = {
    totalRevenue: 45230,
    totalOrders: 156,
    totalCustomers: 89,
    totalProducts: 234,
    revenueGrowth: 12.5,
    ordersGrowth: -2.3,
    customersGrowth: 8.7,
    productsGrowth: 15.2,
  };

  const recentOrders: Order[] = [
    {
      id: "ORD-001",
      customer: "John Doe",
      amount: 125.5,
      status: "pending" as const,
      date: "2024-01-15",
      items: 3,
    },
    {
      id: "ORD-002",
      customer: "Sarah Johnson",
      amount: 89.99,
      status: "completed" as const,
      date: "2024-01-15",
      items: 2,
    },
    {
      id: "ORD-003",
      customer: "Mike Wilson",
      amount: 245.75,
      status: "processing" as const,
      date: "2024-01-14",
      items: 5,
    },
    {
      id: "ORD-004",
      customer: "Emma Davis",
      amount: 67.25,
      status: "completed" as const,
      date: "2024-01-14",
      items: 1,
    },
    {
      id: "ORD-005",
      customer: "David Brown",
      amount: 156.8,
      status: "shipped" as const,
      date: "2024-01-13",
      items: 4,
    },
  ];

  const recentCustomers = [
    {
      id: 1,
      name: "Alice Cooper",
      email: "alice@email.com",
      orders: 12,
      spent: 1250.5,
      joined: "2023-12-01",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@email.com",
      orders: 8,
      spent: 890.25,
      joined: "2023-11-15",
    },
    {
      id: 3,
      name: "Carol White",
      email: "carol@email.com",
      orders: 15,
      spent: 1890.75,
      joined: "2023-10-20",
    },
    {
      id: 4,
      name: "Dan Green",
      email: "dan@email.com",
      orders: 5,
      spent: 456.0,
      joined: "2024-01-10",
    },
  ];

  const topProducts = [
    {
      id: 1,
      name: "Vitamin D3 Supplements",
      category: "Vitamins",
      stock: 145,
      sold: 89,
      revenue: 2670,
    },
    {
      id: 2,
      name: "Blood Pressure Monitor",
      category: "Devices",
      stock: 23,
      sold: 45,
      revenue: 4500,
    },
    {
      id: 3,
      name: "Paracetamol 500mg",
      category: "OTC Medicine",
      stock: 234,
      sold: 167,
      revenue: 1670,
    },
    {
      id: 4,
      name: "Digital Thermometer",
      category: "Devices",
      stock: 67,
      sold: 34,
      revenue: 1020,
    },
  ];

  type OrderStatus = 'completed' | 'processing' | 'pending' | 'shipped';
  
  interface Order {
    id: string;
    customer: string;
    amount: number;
    status: OrderStatus;
    date: string;
    items: number;
  }
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-accent/10 text-accent"; // Using accent for completed
      case "processing":
        return "bg-primary/10 text-primary"; // Using primary for processing
      case "pending":
        return "bg-yellow-400/10 text-yellow-500"; // Kept yellow, but could be themed
      case "shipped":
        return "bg-purple-500/10 text-purple-600"; // Kept purple, but could be themed
      default:
        return "bg-secondary text-foreground/80";
    }
  };

  // Dashboard Component
  const DashboardComponent: React.FC = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-secondary p-6 rounded-lg shadow-sm border-border border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground/80">Total Revenue</p>
              <p className="text-2xl font-bold text-foreground">
                ${salesData.totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-accent" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <ArrowUpRight className="h-4 w-4 text-accent" />
            <span className="text-sm text-accent font-medium">
              +{salesData.revenueGrowth}%
            </span>
            <span className="text-sm text-foreground/60 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-secondary p-6 rounded-lg shadow-sm border-border border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground/80">Total Orders</p>
              <p className="text-2xl font-bold text-foreground">
                {salesData.totalOrders}
              </p>
            </div>
            <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-accent" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <ArrowDownRight className="h-4 w-4 text-red-500" /> 
            <span className="text-sm text-red-500 font-medium"> {/* Kept red for negative growth */}
              {salesData.ordersGrowth}%
            </span>
            <span className="text-sm text-foreground/60 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-secondary p-6 rounded-lg shadow-sm border-border border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground/80">
                Total Customers
              </p>
              <p className="text-2xl font-bold text-foreground">
                {salesData.totalCustomers}
              </p>
            </div>
            <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-accent" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <ArrowUpRight className="h-4 w-4 text-accent" />
            <span className="text-sm text-accent font-medium">
              +{salesData.customersGrowth}%
            </span>
            <span className="text-sm text-foreground/60 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-secondary p-6 rounded-lg shadow-sm border-border border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground/80">
                Total Products
              </p>
              <p className="text-2xl font-bold text-foreground">
                {salesData.totalProducts}
              </p>
            </div>
            <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-accent" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <ArrowUpRight className="h-4 w-4 text-accent" />
            <span className="text-sm text-accent font-medium">
              +{salesData.productsGrowth}%
            </span>
            <span className="text-sm text-foreground/60 ml-2">from last month</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-secondary p-6 rounded-lg shadow-sm border-border border">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Sales Overview
          </h3>
          <div className="h-64 bg-background rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-foreground/50 mx-auto mb-2" />
              <p className="text-foreground/60">
                Sales chart will be integrated here
              </p>
            </div>
          </div>
        </div>

        <div className="bg-secondary p-6 rounded-lg shadow-sm border-border border">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Top Categories
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground/80">
                OTC Medicines
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-border rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <span className="text-sm text-foreground/60">75%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground/80">
                Vitamins
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-border rounded-full h-2">
                  <div
                    className="bg-accent h-2 rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
                <span className="text-sm text-foreground/60">60%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground/80">
                Medical Devices
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-border rounded-full h-2">
                  <div
                    className="bg-primary/70 h-2 rounded-full" // Using a variation of primary
                    style={{ width: "45%" }}
                  ></div>
                </div>
                <span className="text-sm text-foreground/60">45%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground/80">
                Supplements
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-border rounded-full h-2">
                  <div
                    className="bg-accent/70 h-2 rounded-full" // Using a variation of accent
                    style={{ width: "35%" }}
                  ></div>
                </div>
                <span className="text-sm text-foreground/60">35%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Order Management Component
  const OrderManagementComponent: React.FC = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold text-foreground">
          Order Management
        </h2>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent h-4 w-4" />
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-secondary text-foreground"
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-border rounded-lg hover:bg-background text-foreground">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-secondary rounded-lg shadow-sm border-border border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-background">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-secondary divide-y divide-border">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-background/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground/80">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    ${order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground/80">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground/80">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-primary hover:text-primary/80">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-accent hover:text-accent/80">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-foreground/60 hover:text-foreground/80">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Customer Management Component
  const CustomerManagementComponent: React.FC = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold text-foreground">
          Customer Management
        </h2>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent h-4 w-4" />
            <input
              type="text"
              placeholder="Search customers..."
              className="pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-secondary text-foreground"
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </button>
        </div>
      </div>

      <div className="bg-secondary rounded-lg shadow-sm border-border border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-background">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-secondary divide-y divide-border">
              {recentCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-background/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <span className="text-sm font-medium text-accent">
                          {customer.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-foreground">
                          {customer.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground/80">
                    {customer.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {customer.orders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    ${customer.spent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground/80">
                    {customer.joined}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-primary hover:text-primary/80">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-accent hover:text-accent/80">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-500 hover:text-red-600"> {/* Keep red for delete */}
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Product Management Component
  const ProductManagementComponent: React.FC = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold text-foreground">
          Product Management
        </h2>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent h-4 w-4" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-secondary text-foreground"
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-border rounded-lg hover:bg-background text-foreground">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      <div className="bg-secondary rounded-lg shadow-sm border-border border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-background">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                  Sold
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-foreground/80 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-secondary divide-y divide-border">
              {topProducts.map((product) => (
                <tr key={product.id} className="hover:bg-background/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-lg bg-background flex items-center justify-center">
                        <Package className="h-5 w-5 text-foreground/70" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-foreground">
                          {product.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground/80">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-sm font-medium ${
                        product.stock < 50 ? "text-red-500" : "text-foreground" // Keep red for low stock
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {product.sold}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    ${product.revenue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-primary hover:text-primary/80">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-accent hover:text-accent/80">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-500 hover:text-red-600"> {/* Keep red for delete */}
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background"> {/* Changed bg-gray-100 to bg-background */}
      {/* Header */}
      <header className="bg-secondary shadow-sm border-b border-border"> {/* Changed bg-white to bg-secondary and border-b */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-foreground"> {/* Changed text-gray-900 to text-foreground */}
                MediCart Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-accent hover:text-accent/80"> {/* Changed text-gray-400 to text-accent */}
                <Bell className="h-6 w-6" />
              </button>
              <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center"> {/* Changed bg-gray-300 to bg-accent/20 */}
                <span className="text-sm font-medium text-accent">A</span> {/* Changed text-gray-700 to text-accent */}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "dashboard"
                  ? "border-primary text-primary" // Changed active tab color
                  : "border-transparent text-foreground/70 hover:text-foreground hover:border-border" // Changed inactive tab color
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "orders"
                  ? "border-primary text-primary"
                  : "border-transparent text-foreground/70 hover:text-foreground hover:border-border"
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab("customers")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "customers"
                  ? "border-primary text-primary"
                  : "border-transparent text-foreground/70 hover:text-foreground hover:border-border"
              }`}
            >
              Customers
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "products"
                  ? "border-primary text-primary"
                  : "border-transparent text-foreground/70 hover:text-foreground hover:border-border"
              }`}
            >
              Products
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <main>
          {activeTab === "dashboard" && <DashboardComponent />}
          {activeTab === "orders" && <OrderManagementComponent />}
          {activeTab === "customers" && <CustomerManagementComponent />}
          {activeTab === "products" && <ProductManagementComponent />}
        </main>
      </div>
    </div>
  );
}
