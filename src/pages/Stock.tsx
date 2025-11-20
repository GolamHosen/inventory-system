import { Button, MenuItem, TextField } from '@mui/material'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { StockMovementTable } from '../components/StockMovementTable'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { adjustStock } from '../store/productSlice'
import { recordMovement } from '../store/transactionSlice'

export const Stock = () => {
  const dispatch = useAppDispatch()
  const products = useAppSelector((state) => state.products.items)
  const user = useAppSelector((state) => state.auth.currentUser)
  const [form, setForm] = useState({
    productId: '',
    quantity: 0,
    direction: 'in',
    reference: '',
    note: '',
  })

  const selectedProduct = products.find((product) => product.id === form.productId)

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    if (!selectedProduct) {
      toast.error('Select a product')
      return
    }
    if (form.quantity <= 0) {
      toast.error('Quantity must be greater than zero')
      return
    }
    if (form.direction === 'out' && selectedProduct.quantity < Number(form.quantity)) {
      toast.error('Insufficient stock available')
      return
    }

    dispatch(
      adjustStock({
        id: selectedProduct.id,
        quantity: Number(form.quantity),
        direction: form.direction as 'in' | 'out',
      }),
    )

    dispatch(
      recordMovement({
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        direction: form.direction as 'in' | 'out',
        quantity: Number(form.quantity),
        reference: form.reference || `REF-${Date.now()}`,
        user: user?.name ?? 'System',
        note: form.note,
      }),
    )

    toast.success('Stock movement recorded')
    setForm({
      productId: '',
      quantity: 0,
      direction: form.direction,
      reference: '',
      note: '',
    })
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h2 className="section-title mb-4">Record stock movement</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            select
            label="Product"
            value={form.productId}
            onChange={(event) => handleChange('productId', event.target.value)}
          >
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name} ({product.quantity} {product.unit} on hand)
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Movement type"
            value={form.direction}
            onChange={(event) => handleChange('direction', event.target.value)}
          >
            <MenuItem value="in">Stock in</MenuItem>
            <MenuItem value="out">Stock out</MenuItem>
          </TextField>
          <TextField
            type="number"
            label="Quantity"
            value={form.quantity}
            onChange={(event) => handleChange('quantity', event.target.value)}
          />
          <TextField
            label="Reference (PO / Invoice)"
            value={form.reference}
            onChange={(event) => handleChange('reference', event.target.value)}
          />
          <TextField
            label="Notes"
            value={form.note}
            onChange={(event) => handleChange('note', event.target.value)}
            multiline
            rows={3}
            className="md:col-span-2"
          />
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="contained" onClick={handleSubmit}>
            Save movement
          </Button>
        </div>
      </div>

      <div>
        <h2 className="section-title mb-3">History</h2>
        <StockMovementTable />
      </div>
    </div>
  )
}

