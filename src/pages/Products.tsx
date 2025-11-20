import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Button, Chip, IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import type { GridColDef } from '@mui/x-data-grid'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { ProductForm } from '../components/ProductForm'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { deleteProduct } from '../store/productSlice'

export const Products = () => {
  const dispatch = useAppDispatch()
  const products = useAppSelector((state) => state.products.items)
  const role = useAppSelector((state) => state.auth.currentUser?.role)
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const actingProduct = products.find((product) => product.id === selectedProduct)

  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id))
    toast.success('Product removed')
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 160 },
    { field: 'sku', headerName: 'SKU', minWidth: 120 },
    { field: 'category', headerName: 'Category', minWidth: 140 },
    {
      field: 'quantity',
      headerName: 'On hand',
      width: 110,
      type: 'number',
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: ({ row }) => {
        const remaining = row.quantity - row.reorderLevel
        const label =
          remaining <= 0 ? 'Reorder now' : remaining < 15 ? 'Low stock' : 'Healthy'
        const color =
          remaining <= 0 ? 'error' : remaining < 15 ? 'warning' : 'success'

        return <Chip label={label} color={color} size="small" />
      },
    },
    {
      field: 'actions',
      headerName: '',
      width: 140,
      sortable: false,
      renderCell: ({ row }) => (
        <div className="flex items-center gap-1">
          <IconButton
            color="primary"
            onClick={() => {
              setSelectedProduct(row.id)
              setIsDialogOpen(true)
            }}
          >
            <EditOutlinedIcon />
          </IconButton>
          <IconButton
            color="error"
            disabled={role !== 'admin'}
            onClick={() => handleDelete(row.id)}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="section-title">Products</h2>
          <p className="text-muted">
            Manage inventory catalogue, pricing and reorder levels
          </p>
        </div>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => {
            setSelectedProduct(null)
            setIsDialogOpen(true)
          }}
        >
          Add product
        </Button>
      </div>
      <div style={{ height: 520 }} className="glass-card p-4">
        <DataGrid
          rows={products}
          columns={columns}
          disableRowSelectionOnClick
          initialState={{
            pagination: { paginationModel: { pageSize: 8 } },
          }}
          pageSizeOptions={[8, 12]}
        />
      </div>

      <ProductForm
        open={isDialogOpen}
        initialProduct={actingProduct}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  )
}

