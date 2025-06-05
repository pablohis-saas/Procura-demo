export interface Appointment {
  id: number;
  title: string;
  start: string;
  end: string;
  patientId: number;
  patientName: string;
  type: string;
  duration: number;
  notes: string;
  completed: boolean;
}

export interface AppointmentFormData {
  patientId: string;
  date: string;
  time: string;
  type: string;
  duration: number;
  notes: string;
} 