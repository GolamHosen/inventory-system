import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { Button } from '@mui/material'
import { dismissAlert } from '../store/notificationSlice'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'

export const LowStockAlert = () => {
  const dispatch = useAppDispatch()
  const alerts = useAppSelector((state) => state.notifications.lowStockAlerts)

  if (alerts.length === 0) return null

  return (
    <div className="glass-card border-l-4 border-amber-400 p-4">
      <div className="flex items-center gap-3">
        <WarningAmberIcon className="text-amber-500" />
        <div className="flex-1">
          <p className="font-semibold text-slate-800">
            Low stock alerts ({alerts.length})
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-600">
            {alerts.map((alert) => (
              <li key={alert.productId} className="flex items-center justify-between gap-2">
                <span>{alert.message}</span>
                <Button
                  size="small"
                  variant="text"
                  onClick={() => dispatch(dismissAlert(alert.productId))}
                >
                  Dismiss
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

