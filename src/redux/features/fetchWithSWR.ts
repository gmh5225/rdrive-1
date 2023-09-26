import { createSlice } from '@reduxjs/toolkit';

const apiDataSlice = createSlice({
  name: 'apiData',
  initialState: {
    response: '',
    error: '',
    validating: true
  },
  reducers: {
    updateApiData(state, action) {
      // update the state with the new API data
      state = {...state, ...action.payload};
    }
  }
});

export const { updateApiData } = apiDataSlice.actions;
export default apiDataSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const uiStateSlice = createSlice({
//   name: 'uiState',
//   initialState: {
//     // define your initial UI state here
//     inputValue: '',
//     isModalOpen: false
//   },
//   reducers: {
//     // define actions and reducers for updating your UI state here
//     setInputValue(state, action) {
//       state.inputValue = action.payload;
//     },
//     toggleModal(state) {
//       state.isModalOpen = !state.isModalOpen;
//     }
//   }
// });

// export const { setInputValue, toggleModal } = uiStateSlice.actions;
// export default uiStateSlice.reducer;
