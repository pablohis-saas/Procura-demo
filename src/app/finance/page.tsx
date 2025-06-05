'use client';

import React, { useState, useMemo } from 'react';
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
  BarElement,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  monthlyFinancialData,
  currentProfitMargin,
  profitMarginTrend,
  cashFlowProjection,
  breakEvenProgress,
  currentMonthExpensesByCategory,
  totalInventoryValue,
  totalPayrollCost,
} from '../../data/mockFinancialData'; // Import mock data

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

export default function FinancePage() {
  const [timeRange, setTimeRange] = useState('month'); // State for time range filter, though not fully implemented for all charts yet

  // Data for Income vs Expenses chart
  const incomeVsExpensesData = useMemo(() => {
    const labels = monthlyFinancialData.map(d => d.month);
    const incomeData = monthlyFinancialData.map(d => d.income);
    const expensesData = monthlyFinancialData.map(d => d.expenses);

    return {
      labels,
      datasets: [
        {
          label: 'Ingresos',
          data: incomeData,
          borderColor: '#10B981', // Green color for income
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Gastos',
          data: expensesData,
          borderColor: '#EF4444', // Red color for expenses
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.4,
        },
      ],
    };
  }, [monthlyFinancialData]);

  // Data for Expenses by Category chart
  const expensesByCategoryData = useMemo(() => {
    const labels = currentMonthExpensesByCategory.map(d => d.category);
    const data = currentMonthExpensesByCategory.map(d => d.amount);
    const backgroundColor = currentMonthExpensesByCategory.map(d => d.color);

    return {
      labels,
      datasets: [
        {
          data: data,
          backgroundColor: backgroundColor,
          borderWidth: 1,
        },
      ],
    };
  }, [currentMonthExpensesByCategory]);


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link
          href="/" // Link back to the dashboard or appropriate page
          className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Regresar
        </Link>
        <h1 className="text-3xl font-bold">Gestión Financiera</h1>
      </div>

      {/* Filtros de Tiempo (Placeholder) */}
      <div className="mb-6">
        <div className="flex space-x-4">
           {/* Buttons for Week, Month, Quarter, Year - functionality to be added */}
        </div>
      </div>

      {/* Resumen Financiero - KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Margen de Beneficio Actual */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Margen de Beneficio</h3>
          <p className={`text-3xl font-bold ${profitMarginTrend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {currentProfitMargin.toFixed(1)}%
            {profitMarginTrend === 'up' ? ' ▲' : ' ▼'}
          </p>
          <p className="text-sm text-gray-500">vs Mes Anterior</p>
        </div>

        {/* Flujo de Caja Proyectado */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Flujo de Caja Proyectado (30 días)</h3>
          <p className={`text-3xl font-bold ${cashFlowProjection > 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${cashFlowProjection.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">Proyección neta</p>
        </div>

        {/* Punto de Equilibrio */}
        <div className="bg-white rounded-lg shadow-md p-6 col-span-1 md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Punto de Equilibrio Mensual</h3>
           <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Progreso</span>
                <span className="text-sm font-medium text-gray-700">{breakEvenProgress.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${breakEvenProgress}%` }}></div>
              </div>
          <p className="text-sm text-gray-500 mt-2">Pacientes necesarios para cubrir costos fijos y variables.</p>
        </div>
      </div>

      {/* Gráficos Comparativos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Ingresos vs Gastos Mensuales */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Ingresos vs Gastos Mensuales</h3>
          <div className="h-80">
            <Line data={incomeVsExpensesData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Gastos por Categoría (Mes Actual) */}
         <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Gastos por Categoría (Mes Actual)</h3>
          <div className="h-80">
             <Pie data={expensesByCategoryData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      {/* Enlaces a otras secciones (Placeholders) */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <Link href="/finance/inventory" className="bg-white rounded-lg shadow-md p-6 hover:bg-gray-50 cursor-pointer">
               <h3 className="text-lg font-semibold text-blue-600 mb-2">Análisis de Costos de Inventario</h3>
               <p className="text-gray-600">Valor total: ${totalInventoryValue.toFixed(2)}</p>
               {/* Add more summary info if available */}
           </Link>
            <Link href="/finance/payroll" className="bg-white rounded-lg shadow-md p-6 hover:bg-gray-50 cursor-pointer">
               <h3 className="text-lg font-semibold text-blue-600 mb-2">Gestión de Nómina</h3>
                <p className="text-gray-600">Costo total nómina: ${totalPayrollCost.toFixed(2)}/mes</p>
               {/* Add more summary info if available */}
           </Link>
            <Link href="/finance/insights" className="bg-white rounded-lg shadow-md p-6 hover:bg-gray-50 cursor-pointer">
               <h3 className="text-lg font-semibold text-blue-600 mb-2">Insights Financieros</h3>
               <p className="text-gray-600">Análisis de rentabilidad, optimización y anomalías.</p>
               {/* Add more summary info if available */}
           </Link>
       </div>

      {/* Puedes añadir más secciones aquí según sea necesario */}

      {/* Recomendaciones de Optimización (Análisis IA) */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Recomendaciones de Optimización (Análisis IA)</h3>
        <ul className="list-disc list-inside text-gray-600">
          <li>Considerar la reducción de inventario de baja rotación para liberar capital.</li>
          <li>Analizar la rentabilidad de tratamientos específicos para enfocar esfuerzos de marketing.</li>
          <li>Evaluar la eficiencia de los gastos operativos e identificar posibles áreas de ahorro.</li>
          <li>Implementar un sistema de seguimiento más detallado para los costos por paciente.</li>
          <li>Explorar oportunidades para aumentar los ingresos en los días y horarios de menor actividad.</li>
        </ul>
      </div>

    </div>
  );
} 