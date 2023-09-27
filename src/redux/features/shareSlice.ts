import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ShareState {
  isOpen: boolean;
  url: string;
}

const initialState: ShareState = {
  isOpen: false,
  url: '',
};

const shareSlice = createSlice({
  name: 'share',
  initialState,
  reducers: {
    setIsOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
    setUrl(state, action: PayloadAction<string>) {
      state.url = action.payload;
    },
  },
});

export const { setIsOpen, setUrl } = shareSlice.actions;
export default shareSlice.reducer;
