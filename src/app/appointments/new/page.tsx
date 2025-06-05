'use client';

import React, { useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import WorkflowNavigation from '../../../components/WorkflowNavigation';
import ComingSoonModal from '../../../components/ComingSoonModal';

const workflowSteps = [
  {
    title: 'Seleccionar Paciente',
    href: '/appointments/new',
    description: 'Elegir paciente'
  },
  {
    title: 'Elegir Fecha y Hora',
    href: '/appointments/new/schedule',
    description: 'Agendar cita'
  },
  {
    title: 'Confirmar Cita',
    href: '/appointments/new/confirm',
    description: 'Revisar detalles'
  }
];

const appointmentTypes = [
  { id: 'general', name: 'Consulta General', duration: 30 },
  { id: 'followup', name: 'Seguimiento', duration: 20 },
  { id: 'procedure', name: 'Procedimiento', duration: 60 },
  { id: 'emergency', name: 'Urgencia', duration: 45 }
];

const mockPatients = [
  { id: '1', name: 'Juan Pérez', age: 35, lastVisit: '2024-03-20' },
  { id: '2', name: 'María García', age: 28, lastVisit: '2024-03-19' },
  { id: '3', name: 'Carlos López', age: 42, lastVisit: '2024-03-15' }
];

const availableTimeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
];

export default function NewAppointmentPage() {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleFeatureClick = (feature: string) => {
    setComingSoonFeature(feature);
    setShowComingSoon(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient || !selectedType || !selectedDate || !selectedTime) {
      handleFeatureClick('Validación de Campos');
      return;
    }
    handleFeatureClick('Confirmación de Cita');
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link 
          href="/appointments"
          className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Regresar a Citas
        </Link>
        <h1 className="text-3xl font-bold">Nueva Cita</h1>
      </div>

      <WorkflowNavigation steps={workflowSteps} currentStep={0} />

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Paciente <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Seleccionar paciente...</option>
              {mockPatients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.name} - Última visita: {patient.lastVisit}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Cita <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Seleccionar tipo...</option>
              {appointmentTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name} ({type.duration} min)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              min={getMinDate()}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hora <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Seleccionar hora...</option>
              {availableTimeSlots.map(time => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
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
              placeholder="Agregar notas sobre la cita..."
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Link
              href="/appointments"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Agendar Cita
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