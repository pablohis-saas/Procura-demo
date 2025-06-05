'use client';

import React, { useState } from 'react';
import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import WorkflowNavigation from '../../components/WorkflowNavigation';
import ComingSoonModal from '../../components/ComingSoonModal';

const workflowSteps = [
  {
    title: 'Registro de Paciente',
    href: '/patients',
    description: 'Datos personales y médicos'
  },
  {
    title: 'Agendar Cita',
    href: '/appointments',
    description: 'Seleccionar fecha y hora'
  },
  {
    title: 'Registrar Cobro',
    href: '/billing',
    description: 'Procesar pago'
  },
  {
    title: 'Generar Factura',
    href: '/invoices',
    description: 'Documento oficial'
  }
];

export default function PatientsPage() {
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
        <h1 className="text-3xl font-bold">Pacientes</h1>
      </div>

      <WorkflowNavigation steps={workflowSteps} currentStep={0} />

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Lista de Pacientes</h2>
          <button
            onClick={() => handleFeatureClick('Registro de Nuevo Paciente')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Nuevo Paciente
          </button>
      </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Edad</th>
                <th className="px-4 py-2 text-left">Última Visita</th>
                <th className="px-4 py-2 text-left">Estado</th>
                <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2">Juan Pérez</td>
                <td className="px-4 py-2">35</td>
                <td className="px-4 py-2">2024-03-20</td>
                <td className="px-4 py-2">
                  <span className="px-2 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    Activo
                  </span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleFeatureClick('Historial Médico')}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Historial
                    </button>
                    <Link
                      href="/appointments?patientId=1"
                      className="text-green-600 hover:text-green-800"
                    >
                      Agendar Cita
                    </Link>
                    <Link
                      href="/billing?patientId=1"
                      className="text-purple-600 hover:text-purple-800"
                    >
                      Ver Cobros
                    </Link>
                  </div>
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">María García</td>
                <td className="px-4 py-2">28</td>
                <td className="px-4 py-2">2024-03-19</td>
                <td className="px-4 py-2">
                  <span className="px-2 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                    Pendiente
                  </span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleFeatureClick('Historial Médico')}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Historial
                    </button>
                    <Link
                      href="/appointments?patientId=2"
                      className="text-green-600 hover:text-green-800"
                    >
                      Agendar Cita
                    </Link>
                    <Link
                      href="/billing?patientId=2"
                      className="text-purple-600 hover:text-purple-800"
                    >
                      Ver Cobros
                    </Link>
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