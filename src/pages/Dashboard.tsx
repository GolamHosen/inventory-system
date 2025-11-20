import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Legend,
} from 'recharts'
import { useEffect } from 'react'
import { StatsCard } from '../components/StatsCard'
import { LowStockAlert } from '../components/LowStockAlert'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { setLowStockAlerts } from '../store/notificationSlice'

export const Dashboard = () => {
  const dispatch = useAppDispatch()
  const products = useAppSelector((state) => state.products.items)
  const transactions = useAppSelector((state) => state.transactions.records)

  const totalProducts = products.length
  const totalStock = products.reduce((sum, product) => sum + product.quantity, 0)
  const lowStock = products.filter(
    (product) => product.quantity <= product.reorderLevel,
  )

  useEffect(() => {
    dispatch(
      setLowStockAlerts(
        lowStock.map((product) => ({
          productId: product.id,
          severity: product.quantity === 0 ? 'critical' : 'warning',
          message: `${product.name} has only ${product.quantity} ${product.unit} left`,
        })),
      ),
    )
  }, [dispatch, lowStock])

  const stockByCategory = Object.values(
    products.reduce<Record<string, { category: string; quantity: number }>>(
      (acc, product) => {
        if (!acc[product.category]) {
          acc[product.category] = { category: product.category, quantity: 0 }
        }
        acc[product.category].quantity += product.quantity
        return acc
      },
      {},
    ),
  )

  const recentMovements = transactions.slice(0, 7).reverse()
  const movementChartData = recentMovements.map((movement) => ({
    ...movement,
    stockIn: movement.direction === 'in' ? movement.quantity : 0,
    stockOut: movement.direction === 'out' ? movement.quantity : 0,
  }))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatsCard
          title="Total products"
          value={totalProducts}
          description="Active SKUs"
          accent="blue"
        />
        <StatsCard
          title="Stock on hand"
          value={`${totalStock} units`}
          description="All warehouses"
          accent="green"
        />
        <StatsCard
          title="Low stock"
          value={lowStock.length}
          description="Needs attention"
          accent="amber"
        />
      </div>

      <LowStockAlert />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="glass-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="section-title">Stock by category</h3>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={stockByCategory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="section-title">Recent stock movement</h3>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={movementChartData}>
              <defs>
                <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="reference" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="stockIn"
                name="Stock in"
                stroke="#22c55e"
                fillOpacity={1}
                fill="url(#colorIn)"
              />
              <Area
                type="monotone"
                dataKey="stockOut"
                name="Stock out"
                stroke="#ef4444"
                fillOpacity={1}
                fill="url(#colorOut)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

