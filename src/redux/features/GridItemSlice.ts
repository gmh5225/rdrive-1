import { createSlice } from '@reduxjs/toolkit';

interface GridItemState {
  brokenThumbnail: boolean;
}

const initialState: GridItemState = {
  brokenThumbnail: false,
};

const gridItemSlice = createSlice({
  name: 'gridItem',
  initialState,
  reducers: {
    setBrokenThumbnail(state, action) {
      state.brokenThumbnail = action.payload;
    },
  },
});

export const { setBrokenThumbnail } = gridItemSlice.actions;
export default gridItemSlice.reducer;
