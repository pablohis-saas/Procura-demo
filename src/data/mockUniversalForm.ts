export interface InsuranceFormat {
  id: string;
  name: string;
  logo: string;
  color: string;
  requiredFields: string[];
  layout: 'vertical' | 'horizontal' | 'grid';
}

export interface UniversalFormData {
  patientInfo: {
    name: string;
    age: number;
    gender: string;
    insuranceNumber: string;
    policyNumber: string;
  };
  diagnosis: {
    mainDiagnosis: string;
    secondaryDiagnosis: string[];
    symptoms: string[];
    observations: string;
  };
  treatment: {
    prescribedMedication: string[];
    procedures: string[];
    followUpDate: string;
    recommendations: string;
  };
  costs: {
    consultation: number;
    medications: number;
    procedures: number;
    total: number;
  };
}

export const insuranceFormats: InsuranceFormat[] = [
  {
    id: 'seguros-mexico',
    name: 'Seguros México',
    logo: '🏥',
    color: '#2563EB',
    requiredFields: ['name', 'insuranceNumber', 'mainDiagnosis', 'prescribedMedication', 'total'],
    layout: 'vertical'
  },
  {
    id: 'medica-universal',
    name: 'Médica Universal',
    logo: '⚕️',
    color: '#059669',
    requiredFields: ['name', 'policyNumber', 'mainDiagnosis', 'procedures', 'followUpDate'],
    layout: 'horizontal'
  },
  {
    id: 'salud-plus',
    name: 'Salud Plus',
    logo: '💊',
    color: '#7C3AED',
    requiredFields: ['name', 'insuranceNumber', 'mainDiagnosis', 'symptoms', 'recommendations'],
    layout: 'grid'
  }
];

export const defaultFormData: UniversalFormData = {
  patientInfo: {
    name: '',
    age: 0,
    gender: '',
    insuranceNumber: '',
    policyNumber: ''
  },
  diagnosis: {
    mainDiagnosis: '',
    secondaryDiagnosis: [],
    symptoms: [],
    observations: ''
  },
  treatment: {
    prescribedMedication: [],
    procedures: [],
    followUpDate: '',
    recommendations: ''
  },
  costs: {
    consultation: 0,
    medications: 0,
    procedures: 0,
    total: 0
  }
}; 