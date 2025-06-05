'use client';

import React, { useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import WorkflowNavigation from '../../../components/WorkflowNavigation';
import ComingSoonModal from '../../../components/ComingSoonModal';

const workflowSteps = [
  {
    title: 'Consultar Inventario',
    href: '/inventory',
    description: 'Ver stock disponible'
  },
  {
    title: 'Registrar Uso',
    href: '/inventory/usage',
    description: 'Registrar consumo'
  },
  {
    title: 'Actualizar Stock',
    href: '/inventory/update',
    description: 'Ajustar cantidades'
  }
];

export default function InventoryUpdatePage() {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState('');
  const [updateAmount, setUpdateAmount] = useState(0);
  const [updateType, setUpdateType] = useState<'add' | 'remove'>('add');
  const [notes, setNotes] = useState('');

  const handleFeatureClick = (feature: string) => {
    setComingSoonFeature(feature);
    setShowComingSoon(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFeatureClick('Actualización de Stock');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link 
          href="/inventory"
          className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Regresar a Inventario
        </Link>
        <h1 className="text-3xl font-bold">Actualizar Stock</h1>
      </div>

      <WorkflowNavigation steps={workflowSteps} currentStep={2} />

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Producto
            </label>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="font-medium">Anestesia Local</p>
              <p className="text-sm text-gray-500">Stock actual: 5 unidades</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Actualización
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="add"
                  checked={updateType === 'add'}
                  onChange={() => setUpdateType('add')}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">Agregar Stock</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="remove"
                  checked={updateType === 'remove'}
                  onChange={() => setUpdateType('remove')}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">Remover Stock</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cantidad
            </label>
            <input
              type="number"
              min="1"
              value={updateAmount}
              onChange={(e) => setUpdateAmount(parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notas
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Agregar notas sobre la actualización de stock..."
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Link
              href="/inventory"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Actualizar Stock
            </button>
          </div>
        </form>
      </div>

      <ComingSoonModal
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
        feature={comingSoonFeature}
      />
    </div>
  );
} 