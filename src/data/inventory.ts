export type ProductCategory = 'vacuna' | 'medicamento' | 'material';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  stock: number;
  price: number;
  expiryDate: string;
  minStock: number;
  criticalStock: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Vacuna COVID-19 Pfizer',
    category: 'vacuna',
    stock: 150,
    price: 25.99,
    expiryDate: '2024-12-31',
    minStock: 50,
    criticalStock: 20
  },
  {
    id: '2',
    name: 'Paracetamol 500mg',
    category: 'medicamento',
    stock: 200,
    price: 5.99,
    expiryDate: '2025-06-30',
    minStock: 100,
    criticalStock: 30
  },
  {
    id: '3',
    name: 'Jeringas 5ml',
    category: 'material',
    stock: 500,
    price: 0.50,
    expiryDate: '2026-01-31',
    minStock: 200,
    criticalStock: 50
  },
  {
    id: '4',
    name: 'Vacuna Influenza',
    category: 'vacuna',
    stock: 80,
    price: 18.99,
    expiryDate: '2024-11-30',
    minStock: 40,
    criticalStock: 15
  },
  {
    id: '5',
    name: 'Ibuprofeno 400mg',
    category: 'medicamento',
    stock: 150,
    price: 7.99,
    expiryDate: '2025-08-31',
    minStock: 75,
    criticalStock: 25
  },
  {
    id: '6',
    name: 'Guantes Látex M',
    category: 'material',
    stock: 1000,
    price: 0.25,
    expiryDate: '2026-03-31',
    minStock: 300,
    criticalStock: 100
  },
  {
    id: '7',
    name: 'Vacuna Hepatitis B',
    category: 'vacuna',
    stock: 60,
    price: 22.99,
    expiryDate: '2024-10-31',
    minStock: 30,
    criticalStock: 10
  },
  {
    id: '8',
    name: 'Amoxicilina 500mg',
    category: 'medicamento',
    stock: 120,
    price: 12.99,
    expiryDate: '2025-05-31',
    minStock: 60,
    criticalStock: 20
  },
  {
    id: '9',
    name: 'Mascarillas Quirúrgicas',
    category: 'material',
    stock: 2000,
    price: 0.15,
    expiryDate: '2026-02-28',
    minStock: 500,
    criticalStock: 200
  },
  {
    id: '10',
    name: 'Vacuna Tétanos',
    category: 'vacuna',
    stock: 45,
    price: 19.99,
    expiryDate: '2024-09-30',
    minStock: 25,
    criticalStock: 8
  },
  {
    id: '11',
    name: 'Omeprazol 20mg',
    category: 'medicamento',
    stock: 180,
    price: 8.99,
    expiryDate: '2025-07-31',
    minStock: 90,
    criticalStock: 30
  },
  {
    id: '12',
    name: 'Algodón Estéril',
    category: 'material',
    stock: 300,
    price: 2.99,
    expiryDate: '2025-12-31',
    minStock: 100,
    criticalStock: 40
  },
  {
    id: '13',
    name: 'Vacuna Triple Viral',
    category: 'vacuna',
    stock: 70,
    price: 21.99,
    expiryDate: '2024-11-30',
    minStock: 35,
    criticalStock: 12
  },
  {
    id: '14',
    name: 'Loratadina 10mg',
    category: 'medicamento',
    stock: 160,
    price: 6.99,
    expiryDate: '2025-09-30',
    minStock: 80,
    criticalStock: 25
  },
  {
    id: '15',
    name: 'Vendas Elásticas',
    category: 'material',
    stock: 250,
    price: 3.99,
    expiryDate: '2026-04-30',
    minStock: 100,
    criticalStock: 35
  }
]; 