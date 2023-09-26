import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TitleIconState {
  isOpen: boolean;
  isHovered: boolean;
  imageError: boolean;
}

const initialState: TitleIconState = {
  isOpen: false,
  isHovered: false,
  imageError: false,
};

const titleIconSlice = createSlice({
  name: 'titleIcon',
  initialState,
  reducers: {
    setIsOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
    setIsHovered(state, action: PayloadAction<boolean>) {
      state.isHovered = action.payload;
    },
    setImageError(state, action: PayloadAction<boolean>) {
      state.imageError = action.payload;
    },
  },
});

export const { setIsOpen, setIsHovered, setImageError } = titleIconSlice.actions;
export default titleIconSlice.reducer;
