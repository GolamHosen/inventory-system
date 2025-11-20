import LockPersonIcon from '@mui/icons-material/LockPerson'
import { Alert, Button, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { clearAuthError, login } from '../store/authSlice'

export const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { currentUser, error } = useAppSelector((state) => state.auth)
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })

  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser, navigate])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(login(credentials))
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900">
      <div className="glass-card w-full max-w-md p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-500">
            <LockPersonIcon fontSize="large" />
          </div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Inventory Control
          </h1>
          <p className="text-sm text-slate-500">
            Use demo accounts: admin/admin123 or staff/staff123
          </p>
        </div>
        {error && (
          <Alert
            severity="error"
            className="mb-4"
            onClose={() => dispatch(clearAuthError())}
          >
            {error}
          </Alert>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            value={credentials.username}
            onChange={(event) =>
              setCredentials((prev) => ({
                ...prev,
                username: event.target.value,
              }))
            }
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={credentials.password}
            onChange={(event) =>
              setCredentials((prev) => ({
                ...prev,
                password: event.target.value,
              }))
            }
          />
          <Button variant="contained" color="primary" fullWidth type="submit">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  )
}

