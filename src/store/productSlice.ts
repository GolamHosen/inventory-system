import { createSlice, nanoid } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Product, ProductsState, StockDirection } from '../types'
import { seedProducts } from '../data/mockData'

const initialState: ProductsState = {
  items: seedProducts,
}

interface UpdatePayload {
  id: string
  changes: Partial<Product>
}

interface AdjustStockPayload {
  id: string
  quantity: number
  direction: StockDirection
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: {
      reducer(state, action: PayloadAction<Product>) {
        state.items.push(action.payload)
      },
      prepare(product: Omit<Product, 'id'>) {
        return {
          payload: {
            ...product,
            id: nanoid(),
          },
        }
      },
    },
    updateProduct(state, action: PayloadAction<UpdatePayload>) {
      const { id, changes } = action.payload
      const index = state.items.findIndex((product) => product.id === id)
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...changes }
      }
    },
    deleteProduct(state, action: PayloadAction<string>) {
      state.items = state.items.filter((product) => product.id !== action.payload)
    },
    adjustStock(state, action: PayloadAction<AdjustStockPayload>) {
      const { id, quantity, direction } = action.payload
      const product = state.items.find((item) => item.id === id)
      if (!product) return

      product.quantity =
        direction === 'in'
          ? product.quantity + quantity
          : Math.max(product.quantity - quantity, 0)
    },
  },
})

export const { addProduct, updateProduct, deleteProduct, adjustStock } =
  productSlice.actions
export default productSlice.reducer

