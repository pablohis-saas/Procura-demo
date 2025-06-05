'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { financialInsights } from '../../../data/mockFinancialData'; // Import financial insights data

export default function FinancialInsightsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link
          href="/finance" // Link back to the main finance dashboard
          className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Regresar a Gestión Financiera
        </Link>
        <h1 className="text-3xl font-bold">Insights Financieros</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Análisis y Recomendaciones</h2>
        <div className="space-y-4">
          {financialInsights.map((insight) => (
            <div
              key={insight.id}
              className={`p-4 rounded-lg ${
                insight.severity === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                insight.severity === 'success' ? 'bg-green-50 border border-green-200' :
                'bg-blue-50 border border-blue-200'
              }`}
            >
              <p className="font-medium text-gray-900">{insight.title}</p>
              <p className="text-sm text-gray-600">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Puedes añadir más visualizaciones o simuladores aquí */}

    </div>
  );
} 