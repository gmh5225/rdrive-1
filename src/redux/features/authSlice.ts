import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  token: string
}

const initialState: AuthState = {
  token: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
  },
})

export const { setToken } = authSlice.actions

export default authSlice.reducer
