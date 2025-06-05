'use client';

import React, { useState } from 'react';
import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import WorkflowNavigation from '../../components/WorkflowNavigation';
import ComingSoonModal from '../../components/ComingSoonModal';

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

export default function InventoryPage() {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState('');

  const handleFeatureClick = (feature: string) => {
    setComingSoonFeature(feature);
    setShowComingSoon(true);
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
        <h1 className="text-3xl font-bold">Inventario</h1>
      </div>

      <WorkflowNavigation steps={workflowSteps} currentStep={0} />

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Lista de Productos</h2>
          <button
            onClick={() => handleFeatureClick('Registro de Nuevo Producto')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Nuevo Producto
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Producto</th>
                <th className="px-4 py-2 text-left">Categoría</th>
                <th className="px-4 py-2 text-left">Stock</th>
                <th className="px-4 py-2 text-left">Mínimo</th>
                <th className="px-4 py-2 text-left">Último Uso</th>
                <th className="px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">Anestesia Local</td>
                <td className="px-4 py-2">Medicamentos</td>
                <td className="px-4 py-2">
                  <span className="text-red-600 font-medium">5</span>
                </td>
                <td className="px-4 py-2">10</td>
                <td className="px-4 py-2">2024-03-20</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleFeatureClick('Historial de Uso')}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Historial
                    </button>
                    <Link
                      href="/inventory/usage?itemId=1"
                      className="text-green-600 hover:text-green-800"
                    >
                      Registrar Uso
                    </Link>
                    <button
                      onClick={() => handleFeatureClick('Actualizar Stock')}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      Actualizar
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Guantes L</td>
                <td className="px-4 py-2">Insumos</td>
                <td className="px-4 py-2">
                  <span className="text-yellow-600 font-medium">20</span>
                </td>
                <td className="px-4 py-2">50</td>
                <td className="px-4 py-2">2024-03-20</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleFeatureClick('Historial de Uso')}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Historial
                    </button>
                    <Link
                      href="/inventory/usage?itemId=2"
                      className="text-green-600 hover:text-green-800"
                    >
                      Registrar Uso
                    </Link>
                    <button
                      onClick={() => handleFeatureClick('Actualizar Stock')}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      Actualizar
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <ComingSoonModal
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
        feature={comingSoonFeature}
      />
    </div>
  );
} 