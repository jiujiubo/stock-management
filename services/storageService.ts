import { Product, Assignment, ScrappedItem, Employee, DEFAULT_CATEGORIES } from '../types';

const STORAGE_KEY = 'stockmind_inventory_v1';
const ASSIGNMENTS_KEY = 'stockmind_assignments_v1';
const SCRAPPED_KEY = 'stockmind_scrapped_v1';
const EMPLOYEES_KEY = 'stockmind_employees_v1';
const CATEGORIES_KEY = 'stockmind_categories_v1';

const INITIAL_DATA: Product[] = [
  {
    id: '1',
    name: 'Wireless Noise-Canceling Headphones',
    nameZh: '无线降噪耳机',
    sku: 'AUDIO-001',
    category: 'Electronics',
    quantity: 12,
    price: 299.99,
    minStock: 15,
    description: 'Premium over-ear headphones with active noise cancellation and 30-hour battery life.',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Ergonomic Mesh Office Chair',
    nameZh: '人体工学网眼办公椅',
    sku: 'FUR-002',
    category: 'Office Supplies',
    quantity: 45,
    price: 199.50,
    minStock: 10,
    description: 'Breathable mesh back support with adjustable lumbar and armrests.',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Organic Green Tea (Pack of 50)',
    nameZh: '有机绿茶 (50包入)',
    sku: 'BEV-003',
    category: 'Food & Beverage',
    quantity: 120,
    price: 15.99,
    minStock: 50,
    description: 'Sustainably sourced organic green tea leaves.',
    lastUpdated: new Date().toISOString()
  },
];

export const getInventory = (): Product[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
    return INITIAL_DATA;
  }
  return JSON.parse(stored);
};

export const saveInventory = (products: Product[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const getAssignments = (): Assignment[] => {
  const stored = localStorage.getItem(ASSIGNMENTS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveAssignments = (assignments: Assignment[]): void => {
  localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(assignments));
};

export const getScrappedItems = (): ScrappedItem[] => {
  const stored = localStorage.getItem(SCRAPPED_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveScrappedItems = (items: ScrappedItem[]): void => {
  localStorage.setItem(SCRAPPED_KEY, JSON.stringify(items));
};

export const getEmployees = (): Employee[] => {
  const stored = localStorage.getItem(EMPLOYEES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveEmployees = (employees: Employee[]): void => {
  localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(employees));
};

export const getCategories = (): string[] => {
  const stored = localStorage.getItem(CATEGORIES_KEY);
  if (!stored) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(DEFAULT_CATEGORIES));
    return DEFAULT_CATEGORIES;
  }
  return JSON.parse(stored);
};

export const saveCategories = (categories: string[]): void => {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
};
