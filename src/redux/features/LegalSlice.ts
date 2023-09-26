import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LegalState {
  isOpen: boolean;
}

const initialState: LegalState = {
  isOpen: false,
};

const legalSlice = createSlice({
  name: 'legal',
  initialState,
  reducers: {
    setIsOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
  },
});

export const { setIsOpen } = legalSlice.actions;
export default legalSlice.reducer;
