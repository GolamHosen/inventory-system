import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import { Button, MenuItem, TextField } from '@mui/material'
import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useAppSelector } from '../hooks/useAppSelector'
import { exportInvoiceToPdf } from '../utils/pdf'

interface InvoiceItem {
  productId: string
  quantity: number
}

export const Reports = () => {
  const products = useAppSelector((state) => state.products.items)
  const user = useAppSelector((state) => state.auth.currentUser)
  const [items, setItems] = useState<InvoiceItem[]>([])
  const [customer, setCustomer] = useState('')
  const [notes, setNotes] = useState('')
  const [invoiceNo] = useState(() => `INV-${new Date().getTime().toString().slice(-6)}`)

  const [itemsForm, setItemsForm] = useState<InvoiceItem>({
    productId: '',
    quantity: 1,
  })

  const addItem = () => {
    if (!itemsForm.productId) {
      toast.error('Select a product')
      return
    }
    if (itemsForm.quantity <= 0) {
      toast.error('Quantity should be greater than zero')
      return
    }
    setItems((prev) => {
      const exists = prev.find((item) => item.productId === itemsForm.productId)
      if (exists) {
        return prev.map((item) =>
          item.productId === itemsForm.productId
            ? { ...item, quantity: item.quantity + itemsForm.quantity }
            : item,
        )
      }
      return [...prev, itemsForm]
    })
    setItemsForm({ productId: '', quantity: 1 })
  }

  const detailedItems = useMemo(
    () =>
      items.map((item) => {
        const product = products.find((prod) => prod.id === item.productId)
        return {
          ...item,
          product,
          total: product ? product.price * item.quantity : 0,
        }
      }),
    [items, products],
  )

  const grandTotal = detailedItems.reduce((sum, item) => sum + item.total, 0)

  const handleExport = async () => {
    if (items.length === 0) {
      toast.error('Add at least one line item')
      return
    }
    await exportInvoiceToPdf('invoice-preview', `${invoiceNo}.pdf`)
    toast.success('Invoice exported')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="section-title">Reports & invoices</h2>
          <p className="text-muted">
            Compose printable invoices and export professional PDFs
          </p>
        </div>
        <Button
          variant="contained"
          startIcon={<PictureAsPdfIcon />}
          onClick={handleExport}
        >
          Print / PDF
        </Button>
      </div>

      <div className="glass-card grid gap-6 p-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          <TextField
            label="Customer / Outlet"
            value={customer}
            onChange={(event) => setCustomer(event.target.value)}
            fullWidth
          />
          <TextField
            select
            label="Product"
            value={itemsForm.productId}
            onChange={(event) =>
              setItemsForm((prev) => ({ ...prev, productId: event.target.value }))
            }
            fullWidth
          >
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name} (${product.price.toFixed(2)})
              </MenuItem>
            ))}
          </TextField>
          <TextField
            type="number"
            label="Quantity"
            value={itemsForm.quantity}
            onChange={(event) =>
              setItemsForm((prev) => ({
                ...prev,
                quantity: Number(event.target.value),
              }))
            }
            fullWidth
          />
          <TextField
            label="Notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            multiline
            rows={3}
            fullWidth
          />
          <Button variant="outlined" onClick={addItem}>
            Add line item
          </Button>
        </div>

        <div
          id="invoice-preview"
          className="glass-card lg:col-span-2"
        >
          <div className="border-b border-slate-100 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Invoice</p>
                <h3 className="text-xl font-semibold text-slate-800">{invoiceNo}</h3>
              </div>
              <div className="text-right text-sm text-slate-500">
                <p>Date: {new Date().toLocaleDateString()}</p>
                <p>Prepared by: {user?.name ?? 'System'}</p>
              </div>
            </div>
            {customer && (
              <p className="mt-2 text-sm text-slate-600">Bill to: {customer}</p>
            )}
          </div>
          <div className="px-6 py-4">
            <table className="w-full text-left text-sm text-slate-600">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase text-slate-400">
                  <th className="py-2">Product</th>
                  <th>Qty</th>
                  <th>Unit price</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {detailedItems.map((item) => (
                  <tr key={item.productId} className="border-b border-slate-100">
                    <td className="py-3">
                      {item.product?.name ?? 'Removed product'}
                      <p className="text-xs text-slate-400">{item.product?.sku}</p>
                    </td>
                    <td>{item.quantity}</td>
                    <td>${item.product?.price.toFixed(2)}</td>
                    <td>${item.total.toFixed(2)}</td>
                    <td>
                      <Button
                        size="small"
                        color="error"
                        startIcon={<DeleteSweepIcon fontSize="small" />}
                        onClick={() =>
                          setItems((prev) =>
                            prev.filter((entry) => entry.productId !== item.productId),
                          )
                        }
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td className="py-6 text-center text-slate-400" colSpan={5}>
                      No items yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-4 border-t border-slate-100 px-6 py-4 text-right text-lg font-semibold text-slate-900">
            Grand total: ${grandTotal.toFixed(2)}
          </div>
          {notes && (
            <div className="px-6 pb-6 text-sm text-slate-500">
              Notes: {notes}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

