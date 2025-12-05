
import React from 'react';
import { StockLog } from '../types';
import { ClipboardList, ArrowDownCircle, PlusCircle } from 'lucide-react';

interface LogsProps {
  logs: StockLog[];
}

const Logs: React.FC<LogsProps> = ({ logs }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <ClipboardList className="text-blue-500" size={20} />
            Inbound & Stock History
          </h3>
          <p className="text-sm text-slate-500 mt-1">Record of all stock inbound operations and product creations.</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm font-semibold uppercase tracking-wider">
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4 text-right">Quantity Change</th>
                <th className="px-6 py-4">Performed By</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.length > 0 ? (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      {log.action === 'INBOUND' && (
                        <span className="inline-flex items-center gap-1 text-green-700 bg-green-50 px-2 py-1 rounded text-xs font-bold border border-green-100">
                           <ArrowDownCircle size={12} /> INBOUND
                        </span>
                      )}
                      {log.action === 'CREATE' && (
                        <span className="inline-flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-1 rounded text-xs font-bold border border-blue-100">
                           <PlusCircle size={12} /> CREATED
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {log.productName}
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-slate-700">
                      +{log.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {log.performedBy}
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm">
                      {new Date(log.date).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <ClipboardList size={48} className="mx-auto mb-3 text-slate-200" />
                    <p>No stock history records found.</p>
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
