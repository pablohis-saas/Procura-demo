import { Patient } from '../types/patient';

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'María González',
    age: 45,
    phone: '555-0101',
    mainDiagnosis: 'Hipertensión arterial',
    lastVisit: '2024-03-15',
    allergies: ['Penicilina', 'Polen'],
    currentTreatments: [
      {
        id: 't1',
        name: 'Enalapril 20mg',
        startDate: '2024-01-15',
        status: 'active',
        notes: 'Tomar una vez al día'
      }
    ],
    consultationHistory: [
      {
        id: 'c1',
        date: '2024-03-15',
        doctor: 'Dr. Rodríguez',
        diagnosis: 'Control de presión arterial',
        notes: 'Presión arterial estable, continuar tratamiento'
      }
    ]
  },
  {
    id: '2',
    name: 'Juan Pérez',
    age: 62,
    phone: '555-0102',
    mainDiagnosis: 'Diabetes tipo 2',
    lastVisit: '2024-03-10',
    allergies: ['Sulfamidas'],
    currentTreatments: [
      {
        id: 't2',
        name: 'Metformina 850mg',
        startDate: '2023-12-01',
        status: 'active',
        notes: 'Tomar dos veces al día'
      }
    ],
    consultationHistory: [
      {
        id: 'c2',
        date: '2024-03-10',
        doctor: 'Dra. Martínez',
        diagnosis: 'Control de glucosa',
        notes: 'Niveles de glucosa mejorando'
      }
    ]
  },
  {
    id: '3',
    name: 'Ana Martínez',
    age: 28,
    phone: '555-0103',
    mainDiagnosis: 'Migraña crónica',
    lastVisit: '2024-03-12',
    allergies: ['Ninguna'],
    currentTreatments: [
      {
        id: 't3',
        name: 'Sumatriptán',
        startDate: '2024-02-01',
        status: 'active',
        notes: 'Tomar según necesidad'
      }
    ],
    consultationHistory: [
      {
        id: 'c3',
        date: '2024-03-12',
        doctor: 'Dr. Sánchez',
        diagnosis: 'Migraña con aura',
        notes: 'Frecuencia de episodios reducida'
      }
    ]
  },
  {
    id: '4',
    name: 'Carlos Rodríguez',
    age: 35,
    phone: '555-0104',
    mainDiagnosis: 'Asma bronquial',
    lastVisit: '2024-03-08',
    allergies: ['Ácaros', 'Pelo de gato'],
    currentTreatments: [
      {
        id: 't4',
        name: 'Salbutamol inhalador',
        startDate: '2023-11-15',
        status: 'active',
        notes: 'Usar según necesidad'
      }
    ],
    consultationHistory: [
      {
        id: 'c4',
        date: '2024-03-08',
        doctor: 'Dra. López',
        diagnosis: 'Asma controlada',
        notes: 'Mejoría en función pulmonar'
      }
    ]
  },
  {
    id: '5',
    name: 'Laura Sánchez',
    age: 50,
    phone: '555-0105',
    mainDiagnosis: 'Artritis reumatoide',
    lastVisit: '2024-03-14',
    allergies: ['Ninguna'],
    currentTreatments: [
      {
        id: 't5',
        name: 'Methotrexate',
        startDate: '2023-10-01',
        status: 'active',
        notes: 'Tomar una vez por semana'
      }
    ],
    consultationHistory: [
      {
        id: 'c5',
        date: '2024-03-14',
        doctor: 'Dr. García',
        diagnosis: 'Artritis estable',
        notes: 'Dolor reducido, continuar tratamiento'
      }
    ]
  }
]; 