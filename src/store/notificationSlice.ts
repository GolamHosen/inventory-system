import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { LowStockAlert, NotificationsState } from '../types'

const initialState: NotificationsState = {
  lowStockAlerts: [],
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setLowStockAlerts(state, action: PayloadAction<LowStockAlert[]>) {
      state.lowStockAlerts = action.payload
    },
    dismissAlert(state, action: PayloadAction<string>) {
      state.lowStockAlerts = state.lowStockAlerts.filter(
        (alert) => alert.productId !== action.payload,
      )
    },
  },
})

export const { setLowStockAlerts, dismissAlert } = notificationSlice.actions
export default notificationSlice.reducer

