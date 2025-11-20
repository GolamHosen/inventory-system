import type { Product, StockMovement } from '../types'

export const demoUsers = [
  {
    id: 'u-admin',
    name: 'Admin User',
    username: 'admin',
    password: 'admin123',
    role: 'admin',
  },
  {
    id: 'u-staff',
    name: 'Raihan Staff',
    username: 'staff',
    password: 'staff123',
    role: 'staff',
  },
] as const

export const seedProducts: Product[] = [
  {
    id: 'p-1001',
    name: 'Arabica Coffee Beans',
    sku: 'CB-AR-001',
    category: 'Beverages',
    barcode: '123456789012',
    price: 18.5,
    quantity: 120,
    reorderLevel: 40,
    unit: 'kg',
  },
  {
    id: 'p-1002',
    name: 'Organic Matcha Powder',
    sku: 'MT-OG-002',
    category: 'Beverages',
    barcode: '987654321098',
    price: 32,
    quantity: 24,
    reorderLevel: 15,
    unit: 'kg',
  },
  {
    id: 'p-1003',
    name: 'Reusable Cups (24 pack)',
    sku: 'AC-RC-003',
    category: 'Accessories',
    barcode: '563728194058',
    price: 48,
    quantity: 65,
    reorderLevel: 30,
    unit: 'box',
  },
  {
    id: 'p-1004',
    name: 'Cold Brew Bottles',
    sku: 'CB-BT-004',
    category: 'Ready to drink',
    barcode: '650182739401',
    price: 4.5,
    quantity: 18,
    reorderLevel: 20,
    unit: 'bottle',
  },
]

export const seedTransactions: StockMovement[] = [
  {
    id: 'tx-9001',
    productId: 'p-1001',
    productName: 'Arabica Coffee Beans',
    direction: 'out',
    quantity: 15,
    reference: 'INV-23021',
    user: 'Ava Admin',
    date: new Date().toISOString(),
    note: 'Weekly wholesale order',
  },
  {
    id: 'tx-9002',
    productId: 'p-1003',
    productName: 'Reusable Cups (24 pack)',
    direction: 'in',
    quantity: 25,
    reference: 'PO-1188',
    user: 'Sam Staff',
    date: new Date().toISOString(),
    note: 'Supplier restock',
  },
]

