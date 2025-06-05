'use client';

import React, { useState } from 'react';
import { billingRecords, serviceTypes, getBillingSummary, type BillingRecord, type ServiceType } from '../../data/mockBilling';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CurrencyDollarIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function BillingPage() {
  const [selectedRecord, setSelectedRecord] = useState<BillingRecord | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newRecord, setNewRecord] = useState<Partial<BillingRecord>>({
    serviceType: 'consulta',
    status: 'pendiente',
    date: new Date().toISOString().split('T')[0]
  });

  const summary = getBillingSummary();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pagado':
        return 'bg-green-100 text-green-800';
      case 'parcial':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const handleNewRecordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // En una aplicación real, esto guardaría en la base de datos
    alert('Nuevo cobro registrado');
    setShowNewForm(false);
    setNewRecord({
      serviceType: 'consulta',
      status: 'pendiente',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRecord) {
      // En una aplicación real, esto actualizaría el estado del pago
      alert(`Pago registrado para ${selectedRecord.patientName}`);
      setSelectedRecord(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Gestión de Cobros</h1>

      {/* Resumen Financiero */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <CurrencyDollarIcon className="h-8 w-8 text-green-500 mr-4" />
            <div>
              <p className="text-gray-500">Cobrado Hoy</p>
              <p className="text-2xl font-bold">${summary.totalCollectedToday.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <ClockIcon className="h-8 w-8 text-yellow-500 mr-4" />
            <div>
              <p className="text-gray-500">Pendiente por Cobrar</p>
              <p className="text-2xl font-bold">${summary.totalPending.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-blue-500 mr-4" />
            <div>
              <p className="text-gray-500">Cobros del Día</p>
              <p className="text-2xl font-bold">{billingRecords.filter(r => r.date === new Date().toISOString().split('T')[0]).length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lista de Cobros */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Cobros Pendientes</h2>
              <button
                onClick={() => setShowNewForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Nuevo Cobro
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">Paciente</th>
                    <th className="px-4 py-2 text-left">Servicio</th>
                    <th className="px-4 py-2 text-left">Monto</th>
                    <th className="px-4 py-2 text-left">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {billingRecords.map((record) => (
                    <tr
                      key={record.id}
                      className="border-t hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedRecord(record)}
                    >
                      <td className="px-4 py-2">{record.patientName}</td>
                      <td className="px-4 py-2">{record.serviceDescription}</td>
                      <td className="px-4 py-2">${record.amount.toFixed(2)}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Formulario de Nuevo Cobro */}
          {showNewForm && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Registrar Nuevo Cobro</h2>
              <form onSubmit={handleNewRecordSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre del Paciente</label>
                  <input
                    type="text"
                    value={newRecord.patientName || ''}
                    onChange={(e) => setNewRecord({ ...newRecord, patientName: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipo de Servicio</label>
                  <select
                    value={newRecord.serviceType}
                    onChange={(e) => setNewRecord({ ...newRecord, serviceType: e.target.value as ServiceType })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {serviceTypes.map((type) => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Descripción del Servicio</label>
                  <input
                    type="text"
                    value={newRecord.serviceDescription || ''}
                    onChange={(e) => setNewRecord({ ...newRecord, serviceDescription: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Monto</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newRecord.amount || ''}
                    onChange={(e) => setNewRecord({ ...newRecord, amount: parseFloat(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Registrar
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewForm(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Formulario de Pago */}
          {selectedRecord && !showNewForm && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Registrar Pago</h2>
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Paciente</label>
                  <p className="mt-1 text-lg font-medium">{selectedRecord.patientName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Servicio</label>
                  <p className="mt-1 text-lg font-medium">{selectedRecord.serviceDescription}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Monto Total</label>
                  <p className="mt-1 text-lg font-medium">${selectedRecord.amount.toFixed(2)}</p>
                </div>
                {selectedRecord.status === 'parcial' && selectedRecord.paidAmount && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Monto Pagado</label>
                    <p className="mt-1 text-lg font-medium">${selectedRecord.paidAmount.toFixed(2)}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Monto a Pagar</label>
                  <input
                    type="number"
                    step="0.01"
                    max={selectedRecord.status === 'parcial' && selectedRecord.paidAmount
                      ? selectedRecord.amount - selectedRecord.paidAmount
                      : selectedRecord.amount}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Registrar Pago
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRecord(null)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Gráfico de Ingresos por Servicio */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Ingresos por Tipo de Servicio</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={summary.revenueByService}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 