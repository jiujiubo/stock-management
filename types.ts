
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
  performedBy: string; // Email of the admin who assigned it
}

export interface ScrappedItem {
  id: string;
  productId: string;
  productName: string;
  productNameZh: string;
  quantity: number;
  reason: string;
  scrappedDate: string;
  performedBy: string; // Email of the admin who scrapped it
}

export interface StockLog {
  id: string;
  action: 'INBOUND' | 'UPDATE' | 'CREATE';
  productName: string;
  quantity: number; // Positive for inbound
  performedBy: string;
  date: string;
  details?: string;
}

export interface AppUser {
  id: string;
  email: string;
  is_approved: boolean;
  role: 'admin' | 'super_admin' | 'user';
  created_at?: string;
}

export type OperationType = 'INBOUND' | 'ASSIGN' | 'SCRAP';
