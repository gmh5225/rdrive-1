import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FolderGridState {
  heartCounts: Record<string, number>;
  loading: boolean;
}

const initialState: FolderGridState = {
  heartCounts: {},
  loading: true,
};

const folderGridLayoutSlice = createSlice({
  name: 'folderGridLayout',
  initialState,
  reducers: {
    setHeartCount: (state, action: PayloadAction<{ id: string; count: number }>) => {
      state.heartCounts[action.payload.id] = action.payload.count;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setHeartCount, setLoading } = folderGridLayoutSlice.actions;

export default folderGridLayoutSlice.reducer;
