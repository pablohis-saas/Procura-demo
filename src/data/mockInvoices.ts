export type InvoiceStatus = 'emitida' | 'pagada' | 'cancelada';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  patientId: string;
  patientName: string;
  amount: number;
  date: string;
  status: InvoiceStatus;
  services: InvoiceService[];
  taxInfo: TaxInfo;
  email?: string;
}

export interface InvoiceService {
  id: string;
  name: string;
  description: string;
  amount: number;
}

export interface TaxInfo {
  rfc: string;
  businessName: string;
  address: string;
}

export const mockPatients = [
  { id: '1', name: 'Juan Pérez', email: 'juan@email.com' },
  { id: '2', name: 'María García', email: 'maria@email.com' },
  { id: '3', name: 'Carlos López', email: 'carlos@email.com' },
  { id: '4', name: 'Ana Martínez', email: 'ana@email.com' },
];

export const availableServices: InvoiceService[] = [
  {
    id: '1',
    name: 'Consulta General',
    description: 'Consulta médica de rutina',
    amount: 500
  },
  {
    id: '2',
    name: 'Procedimiento Dental',
    description: 'Limpieza y revisión dental',
    amount: 800
  },
  {
    id: '3',
    name: 'Análisis Clínico',
    description: 'Análisis de sangre completo',
    amount: 1200
  },
  {
    id: '4',
    name: 'Radiografía',
    description: 'Radiografía dental',
    amount: 600
  }
];

export const defaultTaxInfo: TaxInfo = {
  rfc: 'PROC123456ABC',
  businessName: 'ProCura Clínica Dental',
  address: 'Av. Reforma 123, Ciudad de México'
};

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'F001-2024',
    patientId: '1',
    patientName: 'Juan Pérez',
    amount: 1300,
    date: '2024-03-20',
    status: 'pagada',
    services: [
      availableServices[0],
      availableServices[2]
    ],
    taxInfo: defaultTaxInfo,
    email: 'juan@email.com'
  },
  {
    id: '2',
    invoiceNumber: 'F002-2024',
    patientId: '2',
    patientName: 'María García',
    amount: 800,
    date: '2024-03-20',
    status: 'emitida',
    services: [
      availableServices[1]
    ],
    taxInfo: defaultTaxInfo,
    email: 'maria@email.com'
  },
  {
    id: '3',
    invoiceNumber: 'F003-2024',
    patientId: '3',
    patientName: 'Carlos López',
    amount: 600,
    date: '2024-03-19',
    status: 'cancelada',
    services: [
      availableServices[3]
    ],
    taxInfo: defaultTaxInfo,
    email: 'carlos@email.com'
  }
]; 