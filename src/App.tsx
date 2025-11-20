import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Layout } from './components/Layout'
import { useAppSelector } from './hooks/useAppSelector'
import { Dashboard } from './pages/Dashboard'
import { Products } from './pages/Products'
import { Stock } from './pages/Stock'
import { Barcode } from './pages/Barcode'
import { Reports } from './pages/Reports'
import { Login } from './pages/Login'

export const App = () => {
  const user = useAppSelector((state) => state.auth.currentUser)

  if (!user) {
    return (
      <>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </>
    )
  }

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/barcode" element={<Barcode />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

