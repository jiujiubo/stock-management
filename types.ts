export interface Product {
  id: string;
  name: string; // English Name
  nameZh: string; // Chinese Name
  sku: string;
  category: string;
  quantity: number;
  price: number;
  minStock: number;
  description: string;
  lastUpdated: string;
}

// Default categories for initialization, but system is now dynamic
export const DEFAULT_CATEGORIES = [
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Office Supplies',
  'Food & Beverage',
  'Other'
];

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  joinedDate: string;
}

export interface InventoryStats {
  totalProducts: number;
  totalValue: number;
  lowStockCount: number;
  categories: { name: string; value: number }[];
}

export interface AIAnalysisResult {
  summary: string;
  recommendations: string[];
  restockPriority: string[];
}

export interface Assignment {
  id: string;
  productId: string;
  productName: string;
  productNameZh: string;
  employeeId: string;
  employeeName: string;
  quantity: number;
  assignedDate: string;
  status: 'Active' | 'Returned';
}

export interface ScrappedItem {
  id: string;
  productId: string;
  productName: string;
  productNameZh: string;
  quantity: number;
  reason: string;
  scrappedDate: string;
}

export type OperationType = 'INBOUND' | 'ASSIGN' | 'SCRAP';
