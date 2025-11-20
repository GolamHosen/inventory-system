export type Role = 'admin' | 'staff'

export interface User {
  id: string
  name: string
  username: string
  role: Role
}

export interface AuthState {
  currentUser: User | null
  error?: string
}

export interface Product {
  id: string
  name: string
  sku: string
  category: string
  barcode: string
  price: number
  quantity: number
  reorderLevel: number
  unit: string
}

export interface ProductsState {
  items: Product[]
}

export type StockDirection = 'in' | 'out'

export interface StockMovement {
  id: string
  productId: string
  productName: string
  direction: StockDirection
  quantity: number
  reference: string
  user: string
  date: string
  note?: string
}

export interface TransactionsState {
  records: StockMovement[]
}

export interface LowStockAlert {
  productId: string
  message: string
  severity: 'warning' | 'critical'
}

export interface NotificationsState {
  lowStockAlerts: LowStockAlert[]
}

