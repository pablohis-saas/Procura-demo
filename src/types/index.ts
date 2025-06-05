export interface Patient {
  id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  lastVisit: string;
  allergies: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  schedule: {
    day: string;
    hours: string[];
  }[];
} 