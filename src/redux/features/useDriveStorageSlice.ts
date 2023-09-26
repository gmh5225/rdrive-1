import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DriveStorageState {
  quota: {
    used: number;
    remaining: number;
    total: number;
    percentageUsed: number;
  };
}

const initialState: DriveStorageState = {
  quota: {
    used: 0,
    remaining: 0,
    total: 0,
    percentageUsed: 0,
  },
};

const driveStorageSlice = createSlice({
  name: 'driveStorage',
  initialState,
  reducers: {
    setQuota(state, action: PayloadAction<{ used: number; remaining: number; total: number; percentageUsed: number }>) {
      state.quota = action.payload;
    },
  },
});

export const { setQuota } = driveStorageSlice.actions;
export default driveStorageSlice.reducer

