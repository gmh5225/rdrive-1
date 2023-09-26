import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface PathPageState {
    connectedAccounts: string[];
    token: string | null;
    ogImage: string | null;
  }
  
  const initialState: PathPageState = {
    connectedAccounts: [],
    token: null,
    ogImage: null,
  };
  
  const pathpageSlice = createSlice({
    name: 'pathpage',
    initialState,
    reducers: {
      setConnectedAccounts: (state, action: PayloadAction<string[]>) => {
        state.connectedAccounts = action.payload;
      },
      setToken: (state, action: PayloadAction<string | null>) => {
        state.token = action.payload;
      },
      setOgImage: (state, action: PayloadAction<string | null>) => {
        state.ogImage = action.payload;
      },
    },
  });
  
  export const { setConnectedAccounts, setToken, setOgImage } = pathpageSlice.actions;
  
  export default pathpageSlice.reducer;
  