import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

export const Layout = () => (
  <div className="min-h-screen bg-slate-50">
    <div className="mx-auto flex max-w-[1440px] gap-6 px-6 py-6">
      <Sidebar />
      <main className="flex-1">
        <TopBar />
        <Outlet />
      </main>
    </div>
  </div>
)

