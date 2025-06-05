import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  CalendarIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import {
  todayAppointments,
  inventoryAlerts,
  pendingPayments,
  dailyStats,
  weeklyRevenue
} from '../data/mockData';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      {/* KPIs Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <CalendarIcon className="h-8 w-8 text-blue-500 mr-4" />
            <div>
              <p className="text-gray-500">Consultas del día</p>
              <p className="text-2xl font-bold">{dailyStats.totalAppointments}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <CurrencyDollarIcon className="h-8 w-8 text-green-500 mr-4" />
            <div>
              <p className="text-gray-500">Ingresos del día</p>
              <p className="text-2xl font-bold">${dailyStats.dailyRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <ChartBarIcon className="h-8 w-8 text-purple-500 mr-4" />
            <div>
              <p className="text-gray-500">Tasa de ocupación</p>
              <p className="text-2xl font-bold">{dailyStats.occupancyRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Citas del día</h2>
          <div className="space-y-4">
            {todayAppointments.map((appointment) => (
              <div key={appointment.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{appointment.patientName}</p>
                  <p className="text-sm text-gray-500">{appointment.type}</p>
                </div>
                <span className="text-sm font-medium">{appointment.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Ingresos Semanales</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4F46E5"
                  fill="#818CF8"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inventory Alerts */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Alertas de Inventario</h2>
          <div className="space-y-4">
            {inventoryAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center p-3 bg-red-50 rounded">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mr-3" />
                <div>
                  <p className="font-medium">{alert.itemName}</p>
                  <p className="text-sm text-red-600">
                    Stock actual: {alert.currentStock} (Mínimo: {alert.minimumStock})
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Payments */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Pagos Pendientes</h2>
          <div className="space-y-4">
            {pendingPayments.map((payment) => (
              <div key={payment.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{payment.patientName}</p>
                  <p className="text-sm text-gray-500">Vence: {payment.dueDate}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${payment.amount.toLocaleString()}</p>
                  <span className={`text-sm ${
                    payment.status === 'overdue' ? 'text-red-500' : 'text-yellow-500'
                  }`}>
                    {payment.status === 'overdue' ? 'Vencido' : 'Pendiente'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 