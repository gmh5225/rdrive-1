import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FolderCardState {
  brokenThumbnail: boolean;
}

const initialState: FolderCardState = {
  brokenThumbnail: false,
};

const folderCardSlice = createSlice({
  name: 'folderCard',
  initialState,
  reducers: {
    setBrokenThumbnail(state, action: PayloadAction<boolean>) {
      state.brokenThumbnail = action.payload;
    },
  },
});

export const { setBrokenThumbnail } = folderCardSlice.actions;
export default folderCardSlice.reducer;
