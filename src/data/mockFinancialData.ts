export interface MonthlyFinancialData {
  month: string;
  income: number;
  expenses: number;
}

export interface ExpenseByCategory {
  category: string;
  amount: number;
  color: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  value?: number; // Keep value for overall analysis if needed, but add specific cost/stock
  unitCost: number; // Cost per unit
  stock: number; // Current stock quantity
  usageCost?: number; // Keep usageCost if used elsewhere
  profitability?: number; // Keep profitability if used elsewhere
  lowRotation: boolean;
}

export interface PayrollCost {
  role: string;
  salary: number;
  bonuses: number;
  benefits: number;
  total: number;
}

export interface TreatmentProfitability {
  name: string;
  income: number;
  cost: number;
  profit: number;
}

export interface EmployeePayroll {
  id: string;
  name: string;
  role: 'Enfermera' | 'Secretaria';
  baseSalary: number;
  commissionGammaglobulina: number; // Simulated commission amount
  commissionVacunasInfluenza: number; // Simulated commission amount
  totalPay: number; // Calculated: baseSalary + commissions
}

// Mock data for the past 12 months
export const monthlyFinancialData: MonthlyFinancialData[] = [
  { month: 'Ene', income: 15000, expenses: 10000 },
  { month: 'Feb', income: 16000, expenses: 10500 },
  { month: 'Mar', income: 18000, expenses: 11000 },
  { month: 'Abr', income: 20000, expenses: 12000 },
  { month: 'May', income: 22000, expenses: 13000 },
  { month: 'Jun', income: 25000, expenses: 14000 },
  { month: 'Jul', income: 23000, expenses: 13500 },
  { month: 'Ago', income: 21000, expenses: 12500 },
  { month: 'Sep', income: 19000, expenses: 11500 },
  { month: 'Oct', income: 17000, expenses: 10800 },
  { month: 'Nov', income: 15500, expenses: 10200 },
  { month: 'Dic', income: 17000, expenses: 11000 },
];

export const currentMonthFinancialData = monthlyFinancialData[monthlyFinancialData.length - 1];
export const previousMonthFinancialData = monthlyFinancialData[monthlyFinancialData.length - 2];

// Calculate current profit margin
export const currentProfitMargin = ((currentMonthFinancialData.income - currentMonthFinancialData.expenses) / currentMonthFinancialData.income) * 100;
export const previousProfitMargin = ((previousMonthFinancialData.income - previousMonthFinancialData.expenses) / previousMonthFinancialData.income) * 100;
export const profitMarginTrend = currentProfitMargin >= previousProfitMargin ? 'up' : 'down';


// Mock data for expenses by category (example for the current month)
export const currentMonthExpensesByCategory: ExpenseByCategory[] = [
  { category: 'Inventario', amount: 4000, color: '#FF6384' },
  { category: 'Personal', amount: 4500, color: '#36A2EB' },
  { category: 'Operativos', amount: 1500, color: '#FFCE56' },
  { category: 'Administrativos', amount: 700, color: '#4BC0C0' },
  { category: 'Impuestos', amount: 300, color: '#9966CC' },
];

// Mock data for cash flow projection (simplified)
export const cashFlowProjection = 5000; // Projected net cash flow for the next 30 days

// Mock data for break-even point (simplified)
export const fixedCosts = 6000; // Example fixed costs
export const averageRevenuePerPatient = 100; // Example average revenue
export const averageVariableCostPerPatient = 40; // Example average variable cost
export const patientsToBreakEven = fixedCosts / (averageRevenuePerPatient - averageVariableCostPerPatient);
export const currentPatientsCount = 150; // Example current patient count
export const breakEvenProgress = Math.min((currentPatientsCount / patientsToBreakEven) * 100, 100);


// Mock Inventory Data
export const inventoryItems: InventoryItem[] = [
  { id: 'inv1', name: 'Vacuna Gripe', unitCost: 15, stock: 100, lowRotation: false },
  { id: 'inv2', name: 'Gammaglobulina', unitCost: 50, stock: 50, lowRotation: false },
  { id: 'inv3', name: 'Material Curas', unitCost: 5, stock: 200, lowRotation: false },
  { id: 'inv4', name: 'Producto Baja Rotación A', unitCost: 20, stock: 10, lowRotation: true },
  { id: 'inv5', name: 'Jeringas', unitCost: 1, stock: 500, lowRotation: false },
];

// Calculate total inventory value based on unitCost and stock
export const totalInventoryValue = inventoryItems.reduce((sum, item) => sum + item.unitCost * item.stock, 0);
export const lowRotationInventoryValue = inventoryItems.filter(item => item.lowRotation).reduce((sum, item) => sum + item.unitCost * item.stock, 0);

// Mock Detailed Employee Payroll Data (simulated)
export const employeePayrollData: EmployeePayroll[] = [
  { id: 'emp1', name: 'Ana Ruiz', role: 'Enfermera', baseSalary: 3000, commissionGammaglobulina: 150, commissionVacunasInfluenza: 100, totalPay: 3250 },
  { id: 'emp2', name: 'Luis Mora', role: 'Enfermera', baseSalary: 3000, commissionGammaglobulina: 120, commissionVacunasInfluenza: 80, totalPay: 3200 },
  { id: 'emp3', name: 'Sofía Gómez', role: 'Secretaria', baseSalary: 2000, commissionGammaglobulina: 0, commissionVacunasInfluenza: 50, totalPay: 2050 },
  // Add more employees as needed
];

export const totalPayrollCost = employeePayrollData.reduce((sum, emp) => sum + emp.totalPay, 0); // Update total payroll calculation

// Mock Treatment Profitability Data
export const treatmentProfitabilityData: TreatmentProfitability[] = [
  { name: 'Consulta General', income: 10000, cost: 4000, profit: 6000 },
  { name: 'Vacunación', income: 8000, cost: 3000, profit: 5000 },
  { name: 'Tratamiento Alergia', income: 15000, cost: 6000, profit: 9000 },
];

// Mock Financial Insights Data (simplified)
export interface FinancialInsight {
  id: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'success';
}

export const financialInsights: FinancialInsight[] = [
  { id: 'fi1', title: 'Alto Costo de Inventario de Baja Rotación', description: 'El inventario de productos de baja rotación representa un X% del valor total. Considerar estrategias de descontinuación o promoción.', severity: 'warning' },
  { id: 'fi2', title: 'Crecimiento Sostenido de Ingresos', description: 'Los ingresos han mostrado un aumento constante en los últimos 3 meses.', severity: 'success' },
  { id: 'fi3', title: 'Oportunidad en Tratamientos Rentables', description: 'Analizar la posibilidad de promocionar tratamientos como X, que tienen un alto margen de beneficio.', severity: 'info' },
]; 