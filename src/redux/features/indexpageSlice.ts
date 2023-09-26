import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IndexPageState {
  connectedAccounts: string[];
  token: string | null;
}

const initialState: IndexPageState = {
  connectedAccounts: [],
  token: null,
};

const indexpageSlice = createSlice({
  name: 'indexpage',
  initialState,
  reducers: {
    setConnectedAccounts: (state, action: PayloadAction<string[]>) => {
      state.connectedAccounts = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
});

export const { setConnectedAccounts, setToken } = indexpageSlice.actions;

export default indexpageSlice.reducer;
