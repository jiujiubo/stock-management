
import React, { useState } from 'react';
import { StockLog } from '../types';
import { ClipboardList, ArrowDownCircle, PlusCircle, Trash2, UserPlus, ArrowLeftCircle, Filter } from 'lucide-react';

interface LogsProps {
  logs: StockLog[];
}

const Logs: React.FC<LogsProps> = ({ logs }) => {
  const [filterType, setFilterType] = useState<string>('ALL');

  const filteredLogs = logs.filter(log => {
      if (filterType === 'ALL') return true;
      if (filterType === 'INBOUND') return log.action === 'INBOUND' || log.action === 'CREATE';
      return log.action === filterType;
  });

  const getActionBadge = (action: string) => {
      switch(action) {
          case 'INBOUND': 
            return <span className="inline-flex items-center gap-1 text-green-700 bg-green-50 px-2 py-1 rounded text-xs font-bold border border-green-100"><ArrowDownCircle size={12}/> INBOUND</span>;
          case 'CREATE': 
            return <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-1 rounded text-xs font-bold border border-emerald-100"><PlusCircle size={12}/> CREATED</span>;
          case 'ASSIGN': 
            return <span className="inline-flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-1 rounded text-xs font-bold border border-blue-100"><UserPlus size={12}/> ASSIGNED</span>;
          case 'RETURN': 
            return <span className="inline-flex items-center gap-1 text-indigo-700 bg-indigo-50 px-2 py-1 rounded text-xs font-bold border border-indigo-100"><ArrowLeftCircle size={12}/> RETURNED</span>;
          case 'SCRAP': 
            return <span className="inline-flex items-center gap-1 text-red-700 bg-red-50 px-2 py-1 rounded text-xs font-bold border border-red-100"><Trash2 size={12}/> SCRAPPED</span>;
          default:
            return <span className="text-slate-600 bg-slate-100 px-2 py-1 rounded text-xs">{action}</span>;
      }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <ClipboardList className="text-blue-500" size={20} />
                System History & Logs
            </h3>
            <p className="text-sm text-slate-500 mt-1">Comprehensive record of all stock movements.</p>
          </div>
          
          <div className="flex items-center gap-2">
             <Filter size={16} className="text-slate-400" />
             <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-white border border-slate-200 text-sm rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
             >
                 <option value="ALL">All Actions</option>
                 <option value="INBOUND">Inbound / Create</option>
                 <option value="ASSIGN">Assigned</option>
                 <option value="RETURN">Returned</option>
                 <option value="SCRAP">Scrapped</option>
             </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm font-semibold uppercase tracking-wider">
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Product Details</th>
                <th className="px-6 py-4 text-right">Quantity</th>
                <th className="px-6 py-4">Performed By</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      {getActionBadge(log.action)}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {log.productName}
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-slate-700">
                      {log.action === 'SCRAP' || log.action === 'ASSIGN' ? '-' : '+'}{log.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {log.performedBy || 'System'}
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm whitespace-nowrap">
                      {new Date(log.date).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 italic">
                        {log.details || '-'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <ClipboardList size={48} className="mx-auto mb-3 text-slate-200" />
                    <p>No history records found matching filter.</p>
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

export default Logs;
