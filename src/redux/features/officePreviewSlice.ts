import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OfficePreviewState {
  docContainerWidth: number;
}

const initialState: OfficePreviewState = {
  docContainerWidth: 600,
};

const officePreviewSlice = createSlice({
  name: 'officePreview',
  initialState,
  reducers: {
    setDocContainerWidth(state, action: PayloadAction<number>) {
      state.docContainerWidth = action.payload;
    },
  },
});

export const { setDocContainerWidth } = officePreviewSlice.actions;
export default officePreviewSlice.reducer;
