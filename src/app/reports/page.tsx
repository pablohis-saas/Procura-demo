'use client';

import React, { useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
} from 'chart.js';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
  allergyTypes,
  monthlyDiagnoses,
  seasonalData,
  treatmentEffectiveness,
  alerts,
  kpis,
  operationalMetrics
} from '../../data/mockReports';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState('month');

  const allergyTypeData = {
    labels: allergyTypes.map(type => type.name),
    datasets: [{
      data: allergyTypes.map(type => type.percentage),
      backgroundColor: allergyTypes.map(type => type.color),
      borderWidth: 1
    }]
  };

  const monthlyDiagnosisData = {
    labels: monthlyDiagnoses.map(d => d.month),
    datasets: [{
      label: 'Nuevos Diagnósticos',
      data: monthlyDiagnoses.map(d => d.count),
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4
    }]
  };

  const seasonalDataConfig = {
    labels: ['Primavera', 'Verano', 'Otoño', 'Invierno'],
    datasets: seasonalData.map(allergy => ({
      label: allergy.allergy,
      data: [allergy.spring, allergy.summer, allergy.fall, allergy.winter],
      backgroundColor: allergyTypes.find(t => t.name === allergy.allergy)?.color
    }))
  };

  const treatmentData = {
    labels: treatmentEffectiveness.map(t => t.name),
    datasets: [{
      label: 'Efectividad (%)',
      data: treatmentEffectiveness.map(t => t.effectiveness),
      backgroundColor: '#3B82F6'
    }]
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
        <h1 className="text-3xl font-bold">Reportes e Insights</h1>
      </div>

      {/* Filtros de Tiempo */}
      <div className="mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-4 py-2 rounded-md ${
              timeRange === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}
          >
            Semana
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-4 py-2 rounded-md ${
              timeRange === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}
          >
            Mes
          </button>
          <button
            onClick={() => setTimeRange('quarter')}
            className={`px-4 py-2 rounded-md ${
              timeRange === 'quarter' ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}
          >
            Trimestre
          </button>
        </div>
      </div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Pacientes Activos</h3>
          <p className="text-3xl font-bold text-blue-600">{kpis.activePatients}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Adherencia a Tratamientos</h3>
          <p className="text-3xl font-bold text-green-600">{kpis.treatmentAdherence}%</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Efectividad de Tratamientos</h3>
          <p className="text-3xl font-bold text-purple-600">{kpis.treatmentEffectiveness}%</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Tiempo Promedio de Consulta</h3>
          <p className="text-3xl font-bold text-orange-600">{kpis.avgConsultationTime} min</p>
        </div>
      </div>

      {/* Gráficos de Tendencias */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Distribución de Alergias</h3>
          <div className="h-80">
            <Pie data={allergyTypeData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Evolución de Diagnósticos</h3>
          <div className="h-80">
            <Line data={monthlyDiagnosisData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      {/* Eficiencia Operativa */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Eficiencia Operativa</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Ocupación de Agenda</span>
                <span className="text-sm font-medium text-gray-700">{operationalMetrics.scheduleOccupancy}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${operationalMetrics.scheduleOccupancy}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Tasa de Cancelaciones</span>
                <span className="text-sm font-medium text-gray-700">{operationalMetrics.cancellationRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full" style={{ width: `${operationalMetrics.cancellationRate}%` }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Tipos de Consulta</h3>
          <div className="h-80">
            <Pie
              data={{
                labels: ['Primera Vez', 'Seguimiento'],
                datasets: [{
                  data: [operationalMetrics.consultationTypes.firstTime, operationalMetrics.consultationTypes.followUp],
                  backgroundColor: ['#3B82F6', '#10B981']
                }]
              }}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>

      {/* Efectividad de Tratamientos */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Efectividad de Tratamientos</h3>
        <div className="h-80">
          <Bar data={treatmentData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

      {/* Alertas Inteligentes */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Alertas Inteligentes</h3>
        <div className="space-y-4">
          {alerts.map(alert => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg ${
                alert.type === 'critical' ? 'bg-red-50 border border-red-200' :
                alert.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                'bg-blue-50 border border-blue-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">{alert.patientName}</p>
                  <p className="text-sm text-gray-600">{alert.message}</p>
                </div>
                <span className="text-sm text-gray-500">{alert.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 