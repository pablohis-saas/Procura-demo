'use client';

import React, { useState } from 'react';
import { mockInvoices, mockPatients, availableServices, defaultTaxInfo, type Invoice, type InvoiceService } from '../../data/mockInvoices';
import { DocumentTextIcon, EnvelopeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function InvoicesPage() {
  const [showNewForm, setShowNewForm] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [newInvoice, setNewInvoice] = useState({
    patientId: '',
    services: [] as string[],
    taxInfo: defaultTaxInfo
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pagada':
        return 'bg-green-100 text-green-800';
      case 'emitida':
        return 'bg-blue-100 text-blue-800';
      case 'cancelada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleNewInvoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // En una aplicación real, esto guardaría en la base de datos
    alert('Nueva factura generada');
    setShowNewForm(false);
    setNewInvoice({
      patientId: '',
      services: [],
      taxInfo: defaultTaxInfo
    });
  };

  const handleSendEmail = (invoice: Invoice) => {
    // En una aplicación real, esto enviaría el email
    alert(`Factura ${invoice.invoiceNumber} enviada a ${invoice.email}`);
  };

  const calculateTotal = (services: string[]) => {
    return services.reduce((total, serviceId) => {
      const service = availableServices.find(s => s.id === serviceId);
      return total + (service?.amount || 0);
    }, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link 
          href="/"
          className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Regresar al Dashboard
        </Link>
        <h1 className="text-3xl font-bold">Facturación</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lista de Facturas */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Facturas Emitidas</h2>
              <button
                onClick={() => setShowNewForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Nueva Factura
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">No. Factura</th>
                    <th className="px-4 py-2 text-left">Paciente</th>
                    <th className="px-4 py-2 text-left">Monto</th>
                    <th className="px-4 py-2 text-left">Fecha</th>
                    <th className="px-4 py-2 text-left">Estado</th>
                    <th className="px-4 py-2 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {mockInvoices.map((invoice) => (
                    <tr key={invoice.id} className="border-t">
                      <td className="px-4 py-2">{invoice.invoiceNumber}</td>
                      <td className="px-4 py-2">{invoice.patientName}</td>
                      <td className="px-4 py-2">${invoice.amount.toFixed(2)}</td>
                      <td className="px-4 py-2">{invoice.date}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedInvoice(invoice)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <DocumentTextIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleSendEmail(invoice)}
                            className="text-green-600 hover:text-green-800"
                          >
                            <EnvelopeIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Formulario de Nueva Factura */}
          {showNewForm && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Nueva Factura</h2>
              <form onSubmit={handleNewInvoiceSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Paciente</label>
                  <select
                    value={newInvoice.patientId}
                    onChange={(e) => setNewInvoice({ ...newInvoice, patientId: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Seleccionar paciente</option>
                    {mockPatients.map((patient) => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Servicios</label>
                  <div className="mt-2 space-y-2">
                    {availableServices.map((service) => (
                      <div key={service.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`service-${service.id}`}
                          checked={newInvoice.services.includes(service.id)}
                          onChange={(e) => {
                            const services = e.target.checked
                              ? [...newInvoice.services, service.id]
                              : newInvoice.services.filter(id => id !== service.id);
                            setNewInvoice({ ...newInvoice, services });
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`service-${service.id}`} className="ml-2 block text-sm text-gray-900">
                          {service.name} - ${service.amount.toFixed(2)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">RFC</label>
                  <input
                    type="text"
                    value={newInvoice.taxInfo.rfc}
                    onChange={(e) => setNewInvoice({
                      ...newInvoice,
                      taxInfo: { ...newInvoice.taxInfo, rfc: e.target.value }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Razón Social</label>
                  <input
                    type="text"
                    value={newInvoice.taxInfo.businessName}
                    onChange={(e) => setNewInvoice({
                      ...newInvoice,
                      taxInfo: { ...newInvoice.taxInfo, businessName: e.target.value }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Dirección Fiscal</label>
                  <input
                    type="text"
                    value={newInvoice.taxInfo.address}
                    onChange={(e) => setNewInvoice({
                      ...newInvoice,
                      taxInfo: { ...newInvoice.taxInfo, address: e.target.value }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="border-t pt-4">
                  <p className="text-lg font-semibold">
                    Total: ${calculateTotal(newInvoice.services).toFixed(2)}
                  </p>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Generar Factura
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

          {/* Vista Previa de Factura */}
          {selectedInvoice && !showNewForm && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Vista Previa de Factura</h2>
                <button
                  onClick={() => handleSendEmail(selectedInvoice)}
                  className="flex items-center text-green-600 hover:text-green-800"
                >
                  <EnvelopeIcon className="h-5 w-5 mr-1" />
                  Enviar por Email
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{selectedInvoice.taxInfo.businessName}</h3>
                    <p className="text-sm text-gray-600">{selectedInvoice.taxInfo.address}</p>
                    <p className="text-sm text-gray-600">RFC: {selectedInvoice.taxInfo.rfc}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">Factura #{selectedInvoice.invoiceNumber}</p>
                    <p className="text-sm text-gray-600">Fecha: {selectedInvoice.date}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Paciente</h4>
                  <p>{selectedInvoice.patientName}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Servicios</h4>
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Descripción</th>
                        <th className="text-right py-2">Monto</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInvoice.services.map((service) => (
                        <tr key={service.id} className="border-b">
                          <td className="py-2">{service.name}</td>
                          <td className="text-right py-2">${service.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                      <tr>
                        <td className="py-2 font-semibold">Total</td>
                        <td className="text-right py-2 font-semibold">${selectedInvoice.amount.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedInvoice(null)}
                    className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 