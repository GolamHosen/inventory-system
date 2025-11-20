import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import SearchIcon from '@mui/icons-material/Search'
import { IconButton, TextField } from '@mui/material'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { logout } from '../store/authSlice'

export const TopBar = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.currentUser)
  const alerts = useAppSelector(
    (state) => state.notifications.lowStockAlerts.length,
  )

  return (
    <header className="glass-card mb-6 flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-2">
        <SearchIcon className="text-slate-400" fontSize="small" />
        <TextField
          placeholder="Search products, SKU or reference"
          variant="standard"
          InputProps={{ disableUnderline: true }}
          className="w-72"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <IconButton color="primary">
            <NotificationsActiveIcon />
          </IconButton>
          {alerts > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
              {alerts}
            </span>
          )}
        </div>
        {user && (
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-2">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                {user.name}
              </p>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                {user.role}
              </p>
            </div>
            <IconButton
              color="error"
              size="small"
              onClick={() => dispatch(logout())}
            >
              <PowerSettingsNewIcon fontSize="small" />
            </IconButton>
          </div>
        )}
      </div>
    </header>
  )
}

