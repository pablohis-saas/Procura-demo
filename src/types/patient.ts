export interface Patient {
  id: string;
  name: string;
  age: number;
  phone: string;
  mainDiagnosis: string;
  lastVisit: string;
  allergies: string[];
  currentTreatments: Treatment[];
  consultationHistory: Consultation[];
}

export interface Treatment {
  id: string;
  name: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Consultation {
  id: string;
  date: string;
  doctor: string;
  diagnosis: string;
  notes: string;
  prescriptions?: string[];
} 