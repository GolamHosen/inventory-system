import {
  Dashboard,
  Inventory2,
  QrCodeScanner,
  ReceiptLong,
  SwapHoriz,
} from '@mui/icons-material'
import { NavLink } from 'react-router-dom'

const links = [
  { label: 'Dashboard', to: '/', icon: Dashboard },
  { label: 'Products', to: '/products', icon: Inventory2 },
  { label: 'Stock', to: '/stock', icon: SwapHoriz },
  { label: 'Barcode', to: '/barcode', icon: QrCodeScanner },
  { label: 'Reports', to: '/reports', icon: ReceiptLong },
]

export const Sidebar = () => (
  <aside className="glass-card h-full w-64 shrink-0 p-6">
    <div className="mb-10">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">
        Stock Suite
      </p>
      <h2 className="mt-2 text-2xl font-bold text-slate-900">
        Inventory & POS
      </h2>
    </div>
    <nav className="flex flex-col gap-2">
      {links.map(({ label, to, icon: Icon }) => (
        <NavLink
          key={label}
          to={to}
          className={({ isActive }) =>
            [
              'flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all',
              isActive
                ? 'bg-brand-500 text-white shadow-lg'
                : 'text-slate-600 hover:bg-slate-100',
            ].join(' ')
          }
        >
          <Icon fontSize="small" />
          {label}
        </NavLink>
      ))}
    </nav>
  </aside>
)

