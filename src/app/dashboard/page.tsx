'use client';

import React from 'react';
import Link from 'next/link';
import { BeakerIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const quickLinks = [
  {
    name: 'Inventario',
    href: '/inventory',
    icon: BeakerIcon,
    description: 'Gestiona el inventario de productos médicos'
  },
  {
    name: 'Cobros',
    href: '/billing',
    icon: CurrencyDollarIcon,
    description: 'Administra los cobros y pagos de servicios'
  },
  {
    name: 'Gestión Financiera',
    href: '/finance',
    icon: CurrencyDollarIcon,
    description: 'Gestiona ingresos, gastos y análisis financieros'
  }
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center mb-4">
              <link.icon className="h-8 w-8 text-blue-600 mr-4" />
              <h2 className="text-xl font-semibold">{link.name}</h2>
            </div>
            <p className="text-gray-600">{link.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
} 