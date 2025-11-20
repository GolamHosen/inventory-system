import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { demoUsers } from '../data/mockData'
import type { AuthState } from '../types'

const initialState: AuthState = {
  currentUser: null,
  error: undefined,
}

interface LoginPayload {
  username: string
  password: string
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      const { username, password } = action.payload
      const match = demoUsers.find(
        (user) => user.username === username && user.password === password,
      )

      if (match) {
        state.currentUser = {
          id: match.id,
          name: match.name,
          username: match.username,
          role: match.role,
        }
        state.error = undefined
      } else {
        state.currentUser = null
        state.error = 'Invalid username or password'
      }
    },
    logout(state) {
      state.currentUser = null
      state.error = undefined
    },
    clearAuthError(state) {
      state.error = undefined
    },
  },
})

export const { login, logout, clearAuthError } = authSlice.actions
export default authSlice.reducer

