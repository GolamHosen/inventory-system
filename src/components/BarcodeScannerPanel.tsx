import BarcodeScannerComponent from 'react-qr-barcode-scanner'
import { useState } from 'react'
import { TextField, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface BarcodeScannerPanelProps {
  onDetected: (value: string) => void
}

export const BarcodeScannerPanel = ({ onDetected }: BarcodeScannerPanelProps) => {
  const [manualCode, setManualCode] = useState('')

  const handleScan = (code: string) => {
    if (code) {
      onDetected(code)
    }
  }

  const handleManualSubmit = () => {
    if (manualCode.trim()) {
      onDetected(manualCode.trim())
      setManualCode('')
    }
  }

  return (
    <div className="glass-card flex flex-col gap-4 p-6">
      <div className="flex items-center gap-3">
        <SearchIcon className="text-slate-500" />
        <TextField
          label="Scan barcode or enter manually"
          fullWidth
          value={manualCode}
          onChange={(event) => setManualCode(event.target.value)}
        />
        <Button variant="contained" onClick={handleManualSubmit}>
          Search
        </Button>
      </div>
      <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-slate-500">
        <p className="font-medium">Camera scanner</p>
        <p className="text-sm text-slate-400">
          Allow camera access to scan QR / barcodes
        </p>
        <div className="mx-auto mt-4 flex max-w-md justify-center overflow-hidden rounded-xl border border-slate-200 bg-black/70">
          <BarcodeScannerComponent
            width={400}
            height={300}
            onUpdate={(_error: unknown, result: { text?: string } | null) => {
              if (result?.text) {
                handleScan(result.text)
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

