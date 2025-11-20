import { Chip } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import type { GridColDef } from '@mui/x-data-grid'
import dayjs from 'dayjs'
import { useAppSelector } from '../hooks/useAppSelector'

const columns: GridColDef[] = [
  { field: 'reference', headerName: 'Reference', flex: 1, minWidth: 120 },
  {
    field: 'productName',
    headerName: 'Product',
    flex: 1,
    minWidth: 160,
  },
  {
    field: 'direction',
    headerName: 'Type',
    width: 120,
    renderCell: ({ value }) => (
      <Chip
        label={value === 'in' ? 'Stock in' : 'Stock out'}
        color={value === 'in' ? 'success' : 'error'}
        size="small"
      />
    ),
  },
  { field: 'quantity', headerName: 'Qty', width: 100, type: 'number' },
  {
    field: 'user',
    headerName: 'Handled by',
    minWidth: 140,
    flex: 1,
  },
  {
    field: 'date',
    headerName: 'Date',
    flex: 1,
    minWidth: 160,
    valueGetter: ({ value }) => dayjs(value).format('DD MMM YYYY HH:mm'),
  },
]

export const StockMovementTable = () => {
  const records = useAppSelector((state) => state.transactions.records)

  return (
    <div style={{ height: 420 }} className="glass-card p-4">
      <DataGrid
        rows={records}
        columns={columns}
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
      />
    </div>
  )
}

