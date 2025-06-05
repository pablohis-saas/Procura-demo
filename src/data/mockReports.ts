export interface AllergyType {
  id: string;
  name: string;
  percentage: number;
  color: string;
}

export interface MonthlyDiagnosis {
  month: string;
  count: number;
}

export interface SeasonalData {
  allergy: string;
  spring: number;
  summer: number;
  fall: number;
  winter: number;
}

export interface TreatmentEffectiveness {
  name: string;
  effectiveness: number;
  patients: number;
  avgImprovement: number;
}

export interface Alert {
  id: string;
  type: 'warning' | 'info' | 'critical';
  message: string;
  patientName: string;
  date: string;
}

export const allergyTypes: AllergyType[] = [
  { id: '1', name: 'Rinitis Alérgica', percentage: 45, color: '#3B82F6' },
  { id: '2', name: 'Asma Alérgica', percentage: 25, color: '#10B981' },
  { id: '3', name: 'Dermatitis Atópica', percentage: 15, color: '#F59E0B' },
  { id: '4', name: 'Alergia Alimentaria', percentage: 10, color: '#EF4444' },
  { id: '5', name: 'Conjuntivitis Alérgica', percentage: 5, color: '#8B5CF6' }
];

export const monthlyDiagnoses: MonthlyDiagnosis[] = [
  { month: 'Ene', count: 12 },
  { month: 'Feb', count: 15 },
  { month: 'Mar', count: 18 },
  { month: 'Abr', count: 22 },
  { month: 'May', count: 25 },
  { month: 'Jun', count: 28 },
  { month: 'Jul', count: 24 },
  { month: 'Ago', count: 20 },
  { month: 'Sep', count: 16 },
  { month: 'Oct', count: 14 },
  { month: 'Nov', count: 12 },
  { month: 'Dic', count: 10 }
];

export const seasonalData: SeasonalData[] = [
  {
    allergy: 'Rinitis Alérgica',
    spring: 85,
    summer: 65,
    fall: 75,
    winter: 45
  },
  {
    allergy: 'Asma Alérgica',
    spring: 70,
    summer: 50,
    fall: 80,
    winter: 60
  },
  {
    allergy: 'Dermatitis Atópica',
    spring: 60,
    summer: 75,
    fall: 65,
    winter: 70
  },
  {
    allergy: 'Alergia Alimentaria',
    spring: 50,
    summer: 55,
    fall: 45,
    winter: 40
  },
  {
    allergy: 'Conjuntivitis Alérgica',
    spring: 80,
    summer: 70,
    fall: 60,
    winter: 40
  }
];

export const treatmentEffectiveness: TreatmentEffectiveness[] = [
  {
    name: 'Inmunoterapia Sublingual',
    effectiveness: 85,
    patients: 120,
    avgImprovement: 75
  },
  {
    name: 'Antihistamínicos Orales',
    effectiveness: 70,
    patients: 200,
    avgImprovement: 60
  },
  {
    name: 'Corticosteroides Nasales',
    effectiveness: 75,
    patients: 150,
    avgImprovement: 65
  },
  {
    name: 'Inmunoterapia Subcutánea',
    effectiveness: 80,
    patients: 80,
    avgImprovement: 70
  },
  {
    name: 'Antileucotrienos',
    effectiveness: 65,
    patients: 90,
    avgImprovement: 55
  }
];

export const alerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    message: 'Síntomas persistentes después de 3 meses de tratamiento',
    patientName: 'María García',
    date: '2024-03-25'
  },
  {
    id: '2',
    type: 'warning',
    message: 'Baja adherencia al tratamiento de inmunoterapia',
    patientName: 'Juan Pérez',
    date: '2024-03-24'
  },
  {
    id: '3',
    type: 'info',
    message: 'Revisión de seguimiento pendiente',
    patientName: 'Ana Martínez',
    date: '2024-03-23'
  },
  {
    id: '4',
    type: 'warning',
    message: 'Reacción adversa reportada',
    patientName: 'Carlos López',
    date: '2024-03-22'
  }
];

export const kpis = {
  activePatients: 450,
  treatmentAdherence: 78,
  treatmentEffectiveness: 82,
  avgConsultationTime: 25
};

export const operationalMetrics = {
  scheduleOccupancy: 85,
  consultationTypes: {
    firstTime: 35,
    followUp: 65
  },
  avgFollowUpTime: 45,
  cancellationRate: 12
}; 