import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EPUBPreviewState {
  location: string | undefined;
  epubContainerWidth: number;
}

const initialState: EPUBPreviewState = {
  location: undefined,
  epubContainerWidth: 400,
};

const epubPreviewSlice = createSlice({
  name: 'epubPreview',
  initialState,
  reducers: {
    setLocation(state, action: PayloadAction<string | undefined>) {
      state.location = action.payload;
    },
    setEpubContainerWidth(state, action: PayloadAction<number>) {
      state.epubContainerWidth = action.payload;
    },
  },
});

export const { setLocation, setEpubContainerWidth } = epubPreviewSlice.actions;
export default epubPreviewSlice.reducer;
