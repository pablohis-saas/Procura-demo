'use client';

import React from 'react';
import { mockPatients } from '../../../data/mockPatients';
import { useParams, useRouter } from 'next/navigation';
import { PencilIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function PatientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const patient = mockPatients.find(p => p.id === params.id);

  if (!patient) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Paciente no encontrado</h1>
          <button
            onClick={() => router.back()}
            className="mt-4 text-blue-500 hover:text-blue-600"
          >
            Volver a la lista de pacientes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Volver
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{patient.name}</h1>
            <p className="text-gray-500">ID: {patient.id}</p>
          </div>
          <button
            onClick={() => router.push(`/patients/${patient.id}/edit`)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors"
          >
            <PencilIcon className="h-5 w-5 mr-2" />
            Editar Paciente
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Información Personal */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Edad</p>
                <p className="font-medium">{patient.age} años</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Teléfono</p>
                <p className="font-medium">{patient.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Diagnóstico Principal</p>
                <p className="font-medium">{patient.mainDiagnosis}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Última Visita</p>
                <p className="font-medium">
                  {new Date(patient.lastVisit).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Alergias */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Alergias</h2>
            {patient.allergies.length > 0 ? (
              <ul className="list-disc list-inside space-y-2">
                {patient.allergies.map((allergy, index) => (
                  <li key={index} className="text-gray-700">{allergy}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No se han registrado alergias</p>
            )}
          </div>

          {/* Tratamientos Actuales */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Tratamientos Actuales</h2>
            {patient.currentTreatments.length > 0 ? (
              <div className="space-y-4">
                {patient.currentTreatments.map((treatment) => (
                  <div key={treatment.id} className="border-b border-gray-200 pb-3 last:border-0">
                    <p className="font-medium">{treatment.name}</p>
                    <p className="text-sm text-gray-500">
                      Inicio: {new Date(treatment.startDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">{treatment.notes}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No hay tratamientos activos</p>
            )}
          </div>

          {/* Historial de Consultas */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Historial de Consultas</h2>
            {patient.consultationHistory.length > 0 ? (
              <div className="space-y-4">
                {patient.consultationHistory.map((consultation) => (
                  <div key={consultation.id} className="border-b border-gray-200 pb-3 last:border-0">
                    <p className="font-medium">{consultation.diagnosis}</p>
                    <p className="text-sm text-gray-500">
                      Fecha: {new Date(consultation.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">Doctor: {consultation.doctor}</p>
                    <p className="text-sm text-gray-500 mt-1">{consultation.notes}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No hay consultas registradas</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 