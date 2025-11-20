import { createSlice, nanoid } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { StockMovement, TransactionsState } from '../types'
import { seedTransactions } from '../data/mockData'

const initialState: TransactionsState = {
  records: seedTransactions,
}

interface RecordPayload
  extends Omit<StockMovement, 'id' | 'date' | 'productName'> {
  productName: string
  date?: string
}

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    recordMovement: {
      reducer(state, action: PayloadAction<StockMovement>) {
        state.records.unshift(action.payload)
        state.records = state.records.slice(0, 50)
      },
      prepare(payload: RecordPayload) {
        return {
          payload: {
            ...payload,
            id: nanoid(),
            date: payload.date ?? new Date().toISOString(),
          },
        }
      },
    },
  },
})

export const { recordMovement } = transactionSlice.actions
export default transactionSlice.reducer

