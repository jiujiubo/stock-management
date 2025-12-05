import { supabase } from './supabaseClient';
import { Product, Assignment, ScrappedItem, Employee } from '../types';

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