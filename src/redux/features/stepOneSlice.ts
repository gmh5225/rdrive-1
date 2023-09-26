import { createSlice } from '@reduxjs/toolkit'

// Define the initial state of your slice
const initialState = {
  clientId: '',
  clientSecret: '',
  redirectUri: '',
  authApi: '',
  driveApi: '',
  scope: '',
}

// Create a slice to manage your configuration values
const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    // Define your reducer functions here
    setConfigValue: (state, action) => {
      const { key, value } = action.payload
      state[key] = value
    },
  },
})

// Extract the action creators and the reducer from the slice
export const { setConfigValue } = configSlice.actions
export default configSlice.reducer
