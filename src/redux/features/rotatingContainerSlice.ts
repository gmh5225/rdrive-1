import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RotatingContainerState {
  hoverStyle: React.CSSProperties;
}

const initialState: RotatingContainerState = {
  hoverStyle: {},
};

const rotatingContainerSlice = createSlice({
  name: 'rotatingContainer',
  initialState,
  reducers: {
    setHoverStyle(state, action: PayloadAction<React.CSSProperties>) {
      state.hoverStyle = action.payload;
    },
  },
});

export const { setHoverStyle } = rotatingContainerSlice.actions;
export default rotatingContainerSlice.reducer;
