'use client';

import React from 'react';
import { Appointment } from '@/types/appointments';

interface AppointmentDetailsProps {
  appointment: Appointment;
  onClose: () => void;
  onToggleComplete: (id: number) => void;
}

export function AppointmentDetails({ appointment, onClose, onToggleComplete }: AppointmentDetailsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold">Detalles de la Cita</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-700">Paciente</h3>
            <p>{appointment.patientName}</p>
          </div>

          <div>
            <h3 className="font-medium text-gray-700">Fecha y Hora</h3>
            <p>{formatDate(appointment.start)}</p>
          </div>

          <div>
            <h3 className="font-medium text-gray-700">Tipo de Consulta</h3>
            <p>{appointment.type}</p>
          </div>

          <div>
            <h3 className="font-medium text-gray-700">Duración</h3>
            <p>{appointment.duration} minutos</p>
          </div>

          <div>
            <h3 className="font-medium text-gray-700">Notas</h3>
            <p className="whitespace-pre-wrap">{appointment.notes}</p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="completed"
              checked={appointment.completed}
              onChange={() => onToggleComplete(appointment.id)}
              className="h-4 w-4 text-blue-600"
            />
            <label htmlFor="completed" className="text-sm text-gray-700">
              Marcar como completada
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
} 