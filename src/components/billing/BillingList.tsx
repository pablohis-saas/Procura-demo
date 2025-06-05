import React from 'react';
import { Billing } from '../../types/billing';

interface BillingListProps {
  billings: Billing[];
  onStatusChange: (id: string, status: string) => void;
}

const BillingList: React.FC<BillingListProps> = ({ billings, onStatusChange }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servicio</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {billings.map((billing) => (
            <tr key={billing.id}>
              <td className="px-6 py-4 whitespace-nowrap">{billing.patientName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{billing.service}</td>
              <td className="px-6 py-4 whitespace-nowrap">${billing.amount}</td>
              <td className="px-6 py-4 whitespace-nowrap">{billing.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(billing.status)}`}>
                  {billing.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={billing.status}
                  onChange={(e) => onStatusChange(billing.id, e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="pending">Pendiente</option>
                  <option value="partial">Parcial</option>
                  <option value="paid">Pagado</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillingList; 