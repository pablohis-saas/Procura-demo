import { Billing, FinancialSummary } from '../types/billing';

export const mockBillings: Billing[] = [
  {
    id: '1',
    patientName: 'Juan Pérez',
    service: 'Consulta General',
    amount: 1500,
    date: '2024-03-20',
    status: 'pending'
  },
  {
    id: '2',
    patientName: 'María García',
    service: 'Limpieza Dental',
    amount: 2000,
    date: '2024-03-20',
    status: 'partial',
    partialPayment: 1000
  },
  {
    id: '3',
    patientName: 'Carlos López',
    service: 'Extracción',
    amount: 3000,
    date: '2024-03-19',
    status: 'paid'
  }
];

export const mockFinancialSummary: FinancialSummary = {
  totalCollectedToday: 2500,
  pendingAmount: 2500,
  serviceBreakdown: [
    { service: 'Consulta General', amount: 1500 },
    { service: 'Limpieza Dental', amount: 2000 },
    { service: 'Extracción', amount: 3000 }
  ]
}; 

export type PaymentStatus = 'pendiente' | 'pagado' | 'parcial';
export type ServiceType = 'consulta' | 'procedimiento' | 'medicamento' | 'laboratorio';

export type BillingStatus = 'pendiente' | 'parcial' | 'pagado';

export interface BillingRecord {
  id: string;
  patientName: string;
  serviceType: ServiceType;
  serviceDescription: string;
  amount: number;
  status: BillingStatus;
  date: string;
  paidAmount?: number;
}

export const billingRecords: BillingRecord[] = [
  {
    id: '1',
    patientName: 'Juan Pérez',
    serviceType: 'consulta',
    serviceDescription: 'Consulta de rutina',
    amount: 50.00,
    status: 'pagado',
    date: new Date().toISOString().split('T')[0],
    paidAmount: 50.00
  },
  {
    id: '2',
    patientName: 'María García',
    serviceType: 'procedimiento',
    serviceDescription: 'Extracción dental',
    amount: 150.00,
    status: 'parcial',
    date: new Date().toISOString().split('T')[0],
    paidAmount: 75.00
  },
  {
    id: '3',
    patientName: 'Carlos López',
    serviceType: 'medicamento',
    serviceDescription: 'Antibióticos',
    amount: 30.00,
    status: 'pendiente',
    date: new Date().toISOString().split('T')[0]
  },
  {
    id: '4',
    patientName: 'Ana Martínez',
    serviceType: 'laboratorio',
    serviceDescription: 'Análisis de sangre',
    amount: 80.00,
    status: 'pagado',
    date: new Date().toISOString().split('T')[0],
    paidAmount: 80.00
  },
  {
    id: '5',
    patientName: 'Roberto Sánchez',
    serviceType: 'consulta',
    serviceDescription: 'Consulta de emergencia',
    amount: 75.00,
    status: 'pendiente',
    date: new Date().toISOString().split('T')[0]
  }
];

export const serviceTypes: ServiceType[] = ['consulta', 'procedimiento', 'medicamento', 'laboratorio'];

export interface BillingSummary {
  totalCollectedToday: number;
  totalPending: number;
  revenueByService: {
    type: string;
    amount: number;
  }[];
}

export function getBillingSummary(): BillingSummary {
  const today = new Date().toISOString().split('T')[0];
  const todayRecords = billingRecords.filter(record => record.date === today);

  const totalCollectedToday = todayRecords
    .filter(record => record.status === 'pagado')
    .reduce((sum, record) => sum + record.amount, 0);

  const totalPending = todayRecords
    .filter(record => record.status !== 'pagado')
    .reduce((sum, record) => {
      if (record.status === 'parcial' && record.paidAmount) {
        return sum + (record.amount - record.paidAmount);
      }
      return sum + record.amount;
    }, 0);

  const revenueByService = serviceTypes.map(type => ({
    type: type.charAt(0).toUpperCase() + type.slice(1),
    amount: todayRecords
      .filter(record => record.serviceType === type && record.status === 'pagado')
      .reduce((sum, record) => sum + record.amount, 0)
  }));

  return {
    totalCollectedToday,
    totalPending,
    revenueByService
  };
} 