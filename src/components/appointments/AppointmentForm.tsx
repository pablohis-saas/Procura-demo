'use client';

import React, { useState } from 'react';
import { Appointment, AppointmentFormData } from '@/types/appointments';

// Mock patients data
const mockPatients = [
  { id: 1, name: 'Juan Pérez' },
  { id: 2, name: 'María López' },
  { id: 3, name: 'Carlos Rodríguez' },
];

const consultationTypes = [
  'Consulta General',
  'Seguimiento',
  'Urgencia',
  'Control',
];

interface AppointmentFormProps {
  onClose: () => void;
  onAdd: (appointment: Omit<Appointment, 'id'>) => void;
}

export function AppointmentForm({ onClose, onAdd }: AppointmentFormProps) {
  const [formData, setFormData] = useState<AppointmentFormData>({
    patientId: '',
    date: '',
    time: '',
    type: consultationTypes[0],
    duration: 30,
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedPatient = mockPatients.find(p => p.id === parseInt(formData.patientId));
    
    if (selectedPatient) {
      const newAppointment = {
        title: `Consulta ${selectedPatient.name}`,
        start: `${formData.date}T${formData.time}`,
        end: `${formData.date}T${formData.time.split(':')[0]}:${parseInt(formData.time.split(':')[1]) + formData.duration}`,
        patientId: parseInt(formData.patientId),
        patientName: selectedPatient.name,
        type: formData.type,
        duration: formData.duration,
        notes: formData.notes,
        completed: false,
      };

      onAdd(newAppointment);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Nueva Cita</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Paciente</label>
            <select
              className="w-full p-2 border rounded"
              value={formData.patientId}
              onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
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

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Fecha</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Hora</label>
            <input
              type="time"
              className="w-full p-2 border rounded"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Tipo de Consulta</label>
            <select
              className="w-full p-2 border rounded"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              required
            >
              {consultationTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Duración (minutos)</label>
            <select
              className="w-full p-2 border rounded"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
              required
            >
              <option value="30">30 minutos</option>
              <option value="45">45 minutos</option>
              <option value="60">60 minutos</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Notas</label>
            <textarea
              className="w-full p-2 border rounded"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 