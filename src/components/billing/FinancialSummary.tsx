import React from 'react';
import { FinancialSummary as FinancialSummaryType } from '../../types/billing';

interface FinancialSummaryProps {
  summary: FinancialSummaryType;
}

const FinancialSummary: React.FC<FinancialSummaryProps> = ({ summary }) => {
  const maxAmount = Math.max(...summary.serviceBreakdown.map(item => item.amount));

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Resumen Financiero</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-800">Total Cobrado Hoy</h3>
          <p className="text-2xl font-bold text-green-600">${summary.totalCollectedToday}</p>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-red-800">Pendiente por Cobrar</h3>
          <p className="text-2xl font-bold text-red-600">${summary.pendingAmount}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Ingresos por Tipo de Servicio</h3>
        <div className="space-y-4">
          {summary.serviceBreakdown.map((item) => (
            <div key={item.service}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{item.service}</span>
                <span className="text-sm font-medium text-gray-700">${item.amount}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full"
                  style={{ width: `${(item.amount / maxAmount) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary; 