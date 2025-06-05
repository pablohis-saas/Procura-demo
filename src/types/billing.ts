export type PaymentStatus = 'pending' | 'paid' | 'partial';

export interface Billing {
  id: string;
  patientName: string;
  service: string;
  amount: number;
  date: string;
  status: PaymentStatus;
  partialPayment?: number;
}

export interface FinancialSummary {
  totalCollectedToday: number;
  pendingAmount: number;
  serviceBreakdown: {
    service: string;
    amount: number;
  }[];
} 