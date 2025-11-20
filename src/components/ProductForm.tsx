import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import type { Product } from '../types'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { addProduct, updateProduct } from '../store/productSlice'

interface ProductFormProps {
  open: boolean
  initialProduct?: Product | null
  onClose: () => void
}

const defaultValues: Omit<Product, 'id'> = {
  name: '',
  sku: '',
  category: '',
  barcode: '',
  price: 0,
  quantity: 0,
  reorderLevel: 10,
  unit: '',
}

export const ProductForm = ({ open, initialProduct, onClose }: ProductFormProps) => {
  const dispatch = useAppDispatch()
  const [formState, setFormState] = useState<Omit<Product, 'id'>>(
    initialProduct ? { ...initialProduct } : defaultValues,
  )

  const handleChange = (field: keyof Omit<Product, 'id'>, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]:
        field === 'price' || field === 'quantity' || field === 'reorderLevel'
          ? Number(value)
          : value,
    }))
  }

  const handleClose = () => {
    setFormState(initialProduct ? { ...initialProduct } : defaultValues)
    onClose()
  }

  const handleSubmit = () => {
    if (initialProduct) {
      dispatch(
        updateProduct({
          id: initialProduct.id,
          changes: formState,
        }),
      )
    } else {
      dispatch(addProduct(formState))
    }
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle className="font-semibold text-slate-800">
        {initialProduct ? 'Edit product' : 'Add new product'}
      </DialogTitle>
      <DialogContent dividers className="py-6">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { label: 'Name', field: 'name', type: 'text' },
            { label: 'SKU', field: 'sku', type: 'text' },
            { label: 'Category', field: 'category', type: 'text' },
            { label: 'Unit', field: 'unit', type: 'text' },
            { label: 'Barcode', field: 'barcode', type: 'text' },
            { label: 'Price', field: 'price', type: 'number' },
            { label: 'Quantity', field: 'quantity', type: 'number' },
            { label: 'Reorder at', field: 'reorderLevel', type: 'number' },
          ].map(({ label, field, type }) => (
            <div key={field}>
              <TextField
                fullWidth
                label={label}
                type={type}
                value={formState[field as keyof typeof formState]}
                onChange={(event) =>
                  handleChange(field as keyof typeof formState, event.target.value)
                }
              />
            </div>
          ))}
        </div>
      </DialogContent>
      <DialogActions className="p-4">
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {initialProduct ? 'Save changes' : 'Add product'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

