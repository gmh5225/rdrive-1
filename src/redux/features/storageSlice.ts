import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface StorageState {
    quota: {
      used: number;
      remaining: number;
      total: number;
      percentageUsed: number;
    };
    folderSize1: number | null;
    folderSize2: number | null;
  }
  
  const initialState: StorageState = {
    quota: {
      used: 0,
      remaining: 0,
      total: 0,
      percentageUsed: 0,
    },
    folderSize1: null,
    folderSize2: null,
  };
  
  const storageSlice = createSlice({
    name: 'storage',
    initialState,
    reducers: {
      setQuota: (state, action: PayloadAction<StorageState['quota']>) => {
        state.quota = action.payload;
      },
      setFolderSize1: (state, action: PayloadAction<number | null>) => {
        state.folderSize1 = action.payload;
      },
      setFolderSize2: (state, action: PayloadAction<number | null>) => {
        state.folderSize2 = action.payload;
      },
    },
  });
  
  export const { setQuota, setFolderSize1, setFolderSize2 } = storageSlice.actions;
  
  export default storageSlice.reducer;
  