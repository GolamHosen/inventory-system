import { Alert, Button } from '@mui/material'
import { useState } from 'react'
import { BarcodeScannerPanel } from '../components/BarcodeScannerPanel'
import { useAppSelector } from '../hooks/useAppSelector'

export const Barcode = () => {
  const products = useAppSelector((state) => state.products.items)
  const [message, setMessage] = useState<string | null>(null)
  const [matchedProduct, setMatchedProduct] = useState<string | null>(null)

  const product = products.find((item) => item.id === matchedProduct)

  const handleDetection = (code: string) => {
    const match = products.find((item) => item.barcode === code)
    if (!match) {
      setMessage(`No product found for barcode ${code}`)
      setMatchedProduct(null)
      return
    }
    setMatchedProduct(match.id)
    setMessage(`Scanning successful: ${match.name}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="section-title">Barcode scanner</h2>
          <p className="text-muted">
            Plug in a USB scanner or use device camera to identify products quickly
          </p>
        </div>
      </div>
      <BarcodeScannerPanel onDetected={handleDetection} />
      {message && (
        <Alert severity={product ? 'success' : 'warning'}>{message}</Alert>
      )}
      {product && (
        <div className="glass-card grid gap-4 p-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">
              {product.name}
            </h3>
            <p className="text-sm text-slate-500">{product.category}</p>
            <div className="mt-4 space-y-2 text-sm text-slate-700">
              <p>SKU: {product.sku}</p>
              <p>Barcode: {product.barcode}</p>
              <p>
                Stock: {product.quantity} {product.unit}
              </p>
              <p>Reorder level: {product.reorderLevel}</p>
              <p>Unit price: ${product.price.toFixed(2)}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-dashed border-slate-200 p-4">
            <p className="mb-4 text-sm text-slate-500">
              Quick actions
            </p>
            <div className="flex gap-3">
              <Button variant="contained" color="primary">
                Print label
              </Button>
              <Button variant="outlined" color="secondary">
                Stock adjustment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

