import React, { useState, useRef } from 'react';
import { Plus, Trash2, Tag, AlertTriangle, BrainCircuit, Download, Upload } from 'lucide-react';
import AIAdvisor from './AIAdvisor';
import { Product, Assignment, ScrappedItem, Employee } from '../types';

interface SettingsProps {
  categories: string[];
  products: Product[];
  assignments: Assignment[];
  scrappedItems: ScrappedItem[];
  employees: Employee[];
  onAddCategory: (category: string) => void;
  onDeleteCategory: (category: string) => void;
  onImportData: (data: any) => void;
}

const Settings: React.FC<SettingsProps> = ({ 
  categories, products, assignments, scrappedItems, employees,
  onAddCategory, onDeleteCategory, onImportData 
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'advisor'>('general');
  const [newCategory, setNewCategory] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Modal state
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    category: string;
    type: 'CONFIRM' | 'BLOCKED';
    count?: number;
  }>({
    isOpen: false,
    category: '',
    type: 'CONFIRM'
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim()) {
      onAddCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  const handleRequestDelete = (category: string) => {
    // Check if category has items
    const count = products.filter(p => p.category === category).length;
    
    if (count > 0) {
      setDeleteModal({
        isOpen: true,
        category,
        type: 'BLOCKED',
        count
      });
    } else {
      setDeleteModal({
        isOpen: true,
        category,
        type: 'CONFIRM'
      });
    }
  };

  const confirmDelete = () => {
    onDeleteCategory(deleteModal.category);
    setDeleteModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleExport = () => {
    const data = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      products,
      categories,
      assignments,
      scrappedItems,
      employees
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `great-river-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const result = event.target?.result;
        if (typeof result === 'string') {
          const data = JSON.parse(result);
          // Basic validation checking for 'products' array
          if (Array.isArray(data.products)) {
             if (window.confirm('This will overwrite your current data with the backup. Are you sure?')) {
                 onImportData(data);
             }
          } else {
             alert('Invalid backup file format.');
          }
        }
      } catch (error) {
        alert('Failed to parse backup file.');
      }
    };
    reader.readAsText(file);
    // Reset value to allow same file selection again
    e.target.value = '';
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
       <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg w-fit mb-6">
        <button
          onClick={() => setActiveTab('general')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'general' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
            <Tag size={16} />
            General Settings
        </button>
        <button
          onClick={() => setActiveTab('advisor')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'advisor' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
            <BrainCircuit size={16} />
            AI Advisor
        </button>
      </div>

      {activeTab === 'general' && (
        <div className="space-y-6 animate-slide-up">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Tag className="text-blue-600" size={20} />
                Category Management
                </h3>
                <p className="text-slate-500 mb-6">Manage the product categories available in your inventory system.</p>

                <form onSubmit={handleAdd} className="flex gap-3 mb-8">
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter new category name..."
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                />
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                    <Plus size={18} />
                    Add Category
                </button>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                    <div 
                    key={category} 
                    className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg group hover:border-blue-200 transition-colors"
                    >
                    <span className="font-medium text-slate-700">{category}</span>
                    <button
                        type="button"
                        onClick={() => handleRequestDelete(category)}
                        className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors"
                        title="Delete Category"
                    >
                        <Trash2 size={16} />
                    </button>
                    </div>
                ))}
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="text-amber-500" size={20} />
                System Actions
                </h3>
                <p className="text-slate-500 mb-6">Backup your data to a secure file or restore from a previous backup.</p>
                
                <div className="flex gap-4">
                    <button 
                      onClick={handleExport}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors border border-slate-200"
                    >
                        <Download size={18} />
                        Export Data
                    </button>
                    <button 
                      onClick={handleImportClick}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors border border-slate-200"
                    >
                        <Upload size={18} />
                        Import Data
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      accept=".json" 
                      className="hidden" 
                    />
                </div>
            </div>
        </div>
      )}

      {activeTab === 'advisor' && (
          <div className="animate-slide-up">
              <AIAdvisor products={products} />
          </div>
      )}

      {/* Delete Category Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm mx-4">
            <div className="text-center mb-6">
              <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                deleteModal.type === 'BLOCKED' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
              }`}>
                {deleteModal.type === 'BLOCKED' ? <AlertTriangle size={24} /> : <Trash2 size={24} />}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {deleteModal.type === 'BLOCKED' ? 'Cannot Delete Category' : 'Delete Category?'}
              </h3>
              <p className="text-slate-500 text-sm">
                {deleteModal.type === 'BLOCKED' 
                  ? `The category "${deleteModal.category}" contains ${deleteModal.count} product(s). Please remove or reassign these items before deleting the category.`
                  : `Are you sure you want to permanently delete the "${deleteModal.category}" category? This action cannot be undone.`}
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              {deleteModal.type === 'BLOCKED' ? (
                <button 
                  onClick={() => setDeleteModal(prev => ({ ...prev, isOpen: false }))}
                  className="w-full bg-slate-100 text-slate-700 font-medium py-2 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Understood
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => setDeleteModal(prev => ({ ...prev, isOpen: false }))}
                    className="flex-1 bg-slate-100 text-slate-700 font-medium py-2 rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmDelete}
                    className="flex-1 bg-red-600 text-white font-medium py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;