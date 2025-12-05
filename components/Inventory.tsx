import React, { useState } from 'react';
import { Product } from '../types';
import { Edit, Trash2, Search, Filter, Plus, AlertCircle, ArrowDownCircle, UserPlus } from 'lucide-react';

interface InventoryProps {
  products: Product[];
  categories: string[];
  onAddProduct: () => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onInbound: () => void;
  onAssign: (product: Product) => void;
  onScrap: (product: Product) => void;
}

const Inventory: React.FC<InventoryProps> = ({ 
  products, categories, onAddProduct, onEditProduct, onDeleteProduct,
  onInbound, onAssign, onScrap
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (product.nameZh && product.nameZh.includes(searchTerm)) ||
                          product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Controls Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by name (EN/CN) or SKU..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative hidden md:block">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-10 pr-8 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
            >
              <option value="All">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
            <button 
              onClick={onInbound}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <ArrowDownCircle size={20} />
              Inbound Stock
            </button>
            <button 
              onClick={onAddProduct}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus size={20} />
              New Product
            </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm font-semibold uppercase tracking-wider">
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Stock</th>
                <th className="px-6 py-4 text-right">Unit Price</th>
                <th className="px-6 py-4 text-right">Total Value</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const isLowStock = product.quantity <= product.minStock;
                  const totalValue = product.quantity * product.price;
                  return (
                    <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{product.name}</div>
                        <div className="text-sm text-slate-500">{product.nameZh}</div>
                        <div className="text-xs text-slate-400 mt-0.5">SKU: {product.sku}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {isLowStock ? (
                          <span className="inline-flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded-md text-xs font-medium border border-red-100">
                            <AlertCircle size={12} /> Low Stock
                          </span>
                        ) : (
                          <span className="text-green-600 bg-green-50 px-2 py-1 rounded-md text-xs font-medium border border-green-100">
                            In Stock
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-slate-700">
                        {product.quantity}
                        <span className="text-slate-400 text-xs ml-1">/ {product.minStock}</span>
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-slate-600">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-slate-900">
                        ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-1">
                          <button 
                            onClick={() => onAssign(product)}
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                            title="Assign to Employee"
                          >
                            <UserPlus size={18} />
                          </button>
                          <button 
                            onClick={() => onEditProduct(product)}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => onScrap(product)}
                            className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Scrap Item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center gap-3">
                      <Search size={48} className="text-slate-200" />
                      <p>No products found matching your criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
