'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { mockPatients } from '../../../../data/mockPatients';
import { Patient } from '../../../../types/patient';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function EditPatientPage() {
  const params = useParams();
  const router = useRouter();
  const isNewPatient = params.id === 'new';
  
  const [formData, setFormData] = useState<Partial<Patient>>({
    name: '',
    age: 0,
    phone: '',
    mainDiagnosis: '',
    lastVisit: new Date().toISOString().split('T')[0],
    allergies: [],
    currentTreatments: [],
    consultationHistory: []
  });

  useEffect(() => {
    if (!isNewPatient) {
      const patient = mockPatients.find(p => p.id === params.id);
      if (patient) {
        setFormData(patient);
      }
    }
  }, [params.id, isNewPatient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar los datos
    // Por ahora solo redirigimos a la lista de pacientes
    router.push('/patients');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAllergiesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const allergies = e.target.value.split(',').map(item => item.trim());
    setFormData(prev => ({
      ...prev,
      allergies
    }));
  };

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
        <h1 className="text-3xl font-bold mb-6">
          {isNewPatient ? 'Nuevo Paciente' : 'Editar Paciente'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Información Personal */}
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  Edad
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Información Médica */}
            <div className="space-y-4">
              <div>
                <label htmlFor="mainDiagnosis" className="block text-sm font-medium text-gray-700">
                  Diagnóstico Principal
                </label>
                <input
                  type="text"
                  id="mainDiagnosis"
                  name="mainDiagnosis"
                  value={formData.mainDiagnosis}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="lastVisit" className="block text-sm font-medium text-gray-700">
                  Última Visita
                </label>
                <input
                  type="date"
                  id="lastVisit"
                  name="lastVisit"
                  value={formData.lastVisit}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">
                  Alergias (separadas por comas)
                </label>
                <textarea
                  id="allergies"
                  name="allergies"
                  value={formData.allergies?.join(', ')}
                  onChange={handleAllergiesChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {isNewPatient ? 'Crear Paciente' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 