import { createSlice } from '@reduxjs/toolkit';

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
    setIsOpen(state, action) {
      state.isOpen = action.payload;
    },
    setUrl(state, action) {
      state.url = action.payload;
    },
  },
});

export const { setIsOpen, setUrl } = shareSlice.actions;
export default shareSlice.reducer;
