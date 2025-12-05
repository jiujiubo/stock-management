
import { supabase } from './supabaseClient';
import { Product, Assignment, ScrappedItem, Employee, AppUser, StockLog } from '../types';

// Products
export const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) throw error;
  return data || [];
};

export const upsertProduct = async (product: Product): Promise<void> => {
  const { error } = await supabase.from('products').upsert(product);
  if (error) throw error;
};

export const deleteProductApi = async (id: string): Promise<void> => {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
};

// Employees
export const fetchEmployees = async (): Promise<Employee[]> => {
  const { data, error } = await supabase.from('employees').select('*');
  if (error) throw error;
  return data || [];
};

export const addEmployeeApi = async (employee: Employee): Promise<void> => {
  const { error } = await supabase.from('employees').insert(employee);
  if (error) throw error;
};

// Assignments
export const fetchAssignments = async (): Promise<Assignment[]> => {
  const { data, error } = await supabase.from('assignments').select('*');
  if (error) throw error;
  return data || [];
};

export const addAssignmentApi = async (assignment: Assignment): Promise<void> => {
  const { error } = await supabase.from('assignments').insert(assignment);
  if (error) throw error;
};

// Scrapped Items
export const fetchScrappedItems = async (): Promise<ScrappedItem[]> => {
  const { data, error } = await supabase.from('scrapped_items').select('*').order('scrappedDate', { ascending: false });
  if (error) throw error;
  return data || [];
};

export const addScrappedItemApi = async (item: ScrappedItem): Promise<void> => {
  const { error } = await supabase.from('scrapped_items').insert(item);
  if (error) throw error;
};

// Categories
export const fetchCategories = async (): Promise<string[]> => {
  const { data, error } = await supabase.from('categories').select('name');
  if (error) throw error;
  return data ? data.map((c: any) => c.name) : [];
};

export const addCategoryApi = async (name: string): Promise<void> => {
  const { error } = await supabase.from('categories').insert({ name });
  if (error) throw error;
};

export const deleteCategoryApi = async (name: string): Promise<void> => {
  const { error } = await supabase.from('categories').delete().eq('name', name);
  if (error) throw error;
};

// --- NEW: Stock Logs (Inbound/History) ---
export const fetchStockLogs = async (): Promise<StockLog[]> => {
  const { data, error } = await supabase.from('stock_logs').select('*').order('date', { ascending: false }).limit(100);
  if (error) {
    // Fail silently if table doesn't exist yet, return empty
    console.warn("Stock logs fetch error (table might be missing):", error);
    return [];
  }
  return data || [];
};

export const addStockLogApi = async (log: StockLog): Promise<void> => {
  // We use simple fire-and-forget logic or catch error to not block main flow if table missing
  const { error } = await supabase.from('stock_logs').insert(log);
  if (error) console.error("Failed to add stock log:", error);
};

// --- NEW: User Management ---
export const fetchAppUser = async (email: string): Promise<AppUser | null> => {
  const { data, error } = await supabase.from('app_users').select('*').eq('email', email).single();
  if (error) return null;
  return data;
};

export const createAppUser = async (user: AppUser): Promise<void> => {
  const { error } = await supabase.from('app_users').insert(user);
  if (error) throw error;
};

export const fetchAllUsers = async (): Promise<AppUser[]> => {
  const { data, error } = await supabase.from('app_users').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
};

export const updateUserStatus = async (email: string, isApproved: boolean): Promise<void> => {
  const { error } = await supabase.from('app_users').update({ is_approved: isApproved }).eq('email', email);
  if (error) throw error;
};
