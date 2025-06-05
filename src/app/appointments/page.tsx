'use client';

import React, { useState } from 'react';
import { ArrowLeftIcon, PlusIcon, CalendarIcon, ListBulletIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import WorkflowNavigation from '../../components/WorkflowNavigation';
import ComingSoonModal from '../../components/ComingSoonModal';

const workflowSteps = [
  {
    title: 'Lista de Citas',
    href: '/appointments',
    description: 'Ver todas las citas'
  },
  {
    title: 'Nueva Cita',
    href: '/appointments/new',
    description: 'Agendar cita'
  },
  {
    title: 'Confirmar Cita',
    href: '/appointments/new/confirm',
    description: 'Revisar detalles'
  }
];

const mockAppointments = [
  {
    id: '1',
    patientName: 'Juan Pérez',
    type: 'Consulta General',
    date: '2024-03-25',
    time: '09:00',
    status: 'scheduled',
    notes: 'Revisión de rutina'
  },
  {
    id: '2',
    patientName: 'María García',
    type: 'Procedimiento Dental',
    date: '2024-03-25',
    time: '10:30',
    status: 'scheduled',
    notes: 'Limpieza dental'
  },
  {
    id: '3',
    patientName: 'Carlos López',
    type: 'Consulta de Seguimiento',
    date: '2024-03-25',
    time: '11:45',
    status: 'scheduled',
    notes: 'Control post-tratamiento'
  }
];

export default function AppointmentsPage() {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState('');
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  const handleFeatureClick = (feature: string) => {
    setComingSoonFeature(feature);
    setShowComingSoon(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calendarEvents = mockAppointments.map(apt => ({
    id: apt.id,
    title: `${apt.patientName} - ${apt.type}`,
    start: `${apt.date}T${apt.time}`,
    end: `${apt.date}T${apt.time.split(':')[0]}:30`,
    backgroundColor: apt.status === 'scheduled' ? '#3B82F6' : 
                    apt.status === 'completed' ? '#10B981' : '#EF4444',
    extendedProps: {
      notes: apt.notes
    }
  }));

  const handleEventClick = (info: any) => {
    handleFeatureClick('Detalles de Cita');
  };

  const handleDateSelect = (selectInfo: any) => {
    window.location.href = `/appointments/new?date=${selectInfo.startStr.split('T')[0]}&time=${selectInfo.startStr.split('T')[1]}`;
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
        <h1 className="text-3xl font-bold">Citas</h1>
      </div>

      <WorkflowNavigation steps={workflowSteps} currentStep={0} />

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Gestión de Citas</h2>
          <div className="flex space-x-4">
            <div className="flex rounded-md shadow-sm">
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-4 py-2 rounded-l-md flex items-center ${
                  viewMode === 'calendar'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                <CalendarIcon className="h-5 w-5 mr-2" />
                Calendario
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-r-md flex items-center ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                <ListBulletIcon className="h-5 w-5 mr-2" />
                Lista
              </button>
            </div>
            <Link
              href="/appointments/new"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Nueva Cita
            </Link>
          </div>
        </div>

        {viewMode === 'calendar' ? (
          <div className="h-[600px]">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          events={calendarEvents}
          eventClick={handleEventClick}
          select={handleDateSelect}
              height="100%"
              slotMinTime="08:00:00"
              slotMaxTime="18:00:00"
              allDaySlot={false}
              locale="es"
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">Paciente</th>
                  <th className="px-4 py-2 text-left">Tipo</th>
                  <th className="px-4 py-2 text-left">Fecha</th>
                  <th className="px-4 py-2 text-left">Hora</th>
                  <th className="px-4 py-2 text-left">Estado</th>
                  <th className="px-4 py-2 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {mockAppointments.map(appointment => (
                  <tr key={appointment.id} className="border-t">
                    <td className="px-4 py-2">{appointment.patientName}</td>
                    <td className="px-4 py-2">{appointment.type}</td>
                    <td className="px-4 py-2">{appointment.date}</td>
                    <td className="px-4 py-2">{appointment.time}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(appointment.status)}`}>
                        {appointment.status === 'scheduled' ? 'Agendada' :
                         appointment.status === 'completed' ? 'Completada' :
                         appointment.status === 'cancelled' ? 'Cancelada' : appointment.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleFeatureClick('Editar Cita')}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleFeatureClick('Cancelar Cita')}
                          className="text-red-600 hover:text-red-800"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => handleFeatureClick('Ver Detalles')}
                          className="text-green-600 hover:text-green-800"
                        >
                          Detalles
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ComingSoonModal
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
        feature={comingSoonFeature}
        />
    </div>
  );
} 