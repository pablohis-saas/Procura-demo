import { format, subDays } from 'date-fns';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  type: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'María González',
    age: 35,
    email: 'maria.gonzalez@email.com',
    phone: '555-0101',
    lastVisit: '2024-03-15',
    allergies: ['Polen', 'Ácaros']
  },
  {
    id: '2',
    name: 'Juan Pérez',
    age: 28,
    email: 'juan.perez@email.com',
    phone: '555-0102',
    lastVisit: '2024-03-10',
    allergies: ['Látex', 'Penicilina']
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    date: '2024-04-01',
    time: '10:00',
    status: 'scheduled',
    notes: 'Control de alergia estacional'
  },
  {
    id: '2',
    patientId: '2',
    date: '2024-04-02',
    time: '11:30',
    status: 'scheduled',
    notes: 'Prueba de alergia'
  }
];

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dra. Ana Martínez',
    specialty: 'Alergología',
    schedule: [
      {
        day: 'Lunes',
        hours: ['09:00', '10:00', '11:00', '12:00']
      },
      {
        day: 'Miércoles',
        hours: ['14:00', '15:00', '16:00', '17:00']
      }
    ]
  }
];

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minimumStock: number;
  unit: string;
  lastRestock: string;
  usageHistory: {
    date: string;
    quantity: number;
    usedBy: string;
  }[];
}

export interface Payment {
  id: string;
  patientId: string;
  patientName: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'overdue' | 'paid';
  invoiceId?: string;
}

export interface DailyStats {
  totalAppointments: number;
  dailyRevenue: number;
  occupancyRate: number;
  pendingPayments: number;
}

export interface WeeklyRevenue {
  date: string;
  revenue: number;
}

// Mock data for today's appointments
export const todayAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Juan Pérez',
    type: 'Consulta General',
    time: '09:00',
    status: 'scheduled',
    notes: 'Revisión de rutina'
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'María García',
    type: 'Procedimiento Dental',
    time: '10:30',
    status: 'scheduled',
    notes: 'Limpieza dental'
  },
  {
    id: '3',
    patientId: '3',
    patientName: 'Carlos López',
    type: 'Consulta de Seguimiento',
    time: '11:45',
    status: 'scheduled',
    notes: 'Control post-tratamiento'
  }
];

// Mock data for inventory alerts
export const inventoryAlerts: InventoryItem[] = [
  {
    id: '1',
    name: 'Anestesia Local',
    category: 'Medicamentos',
    currentStock: 5,
    minimumStock: 10,
    unit: 'unidades',
    lastRestock: '2024-03-15',
    usageHistory: [
      {
        date: '2024-03-20',
        quantity: 2,
        usedBy: 'Dr. Martínez'
      }
    ]
  },
  {
    id: '2',
    name: 'Guantes L',
    category: 'Insumos',
    currentStock: 20,
    minimumStock: 50,
    unit: 'pares',
    lastRestock: '2024-03-10',
    usageHistory: [
      {
        date: '2024-03-20',
        quantity: 5,
        usedBy: 'Dr. Martínez'
      }
    ]
  }
];

// Mock data for pending payments
export const pendingPayments: Payment[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Juan Pérez',
    amount: 1500,
    dueDate: '2024-03-25',
    status: 'pending',
    invoiceId: 'F001-2024'
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'María García',
    amount: 2500,
    dueDate: '2024-03-20',
    status: 'overdue',
    invoiceId: 'F002-2024'
  }
];

// Mock data for daily stats
export const dailyStats: DailyStats = {
  totalAppointments: 8,
  dailyRevenue: 12500,
  occupancyRate: 75,
  pendingPayments: 2
};

// Mock data for weekly revenue
export const weeklyRevenue: WeeklyRevenue[] = [
  { date: 'Lun', revenue: 8500 },
  { date: 'Mar', revenue: 9200 },
  { date: 'Mié', revenue: 7800 },
  { date: 'Jue', revenue: 12500 },
  { date: 'Vie', revenue: 0 }
]; 