
// import { createSlice } from '@reduxjs/toolkit';
// // import { IconProp } from '@fortawesome/fontawesome-svg-core';

// interface OAuthStep3State {
//     expiryTimeLeft: number;
//     accountAlreadyConnected: boolean;
//     authPersonInfo: { data: { userPrincipalName: string }, status: number };
//     buttonContent: { text: string; icon: string };
//     buttonError: boolean;
//   }
  
//   const initialState: OAuthStep3State = {
//     expiryTimeLeft: 0,
//     accountAlreadyConnected: false,
//     authPersonInfo: { data: { userPrincipalName: '' }, status: -1 },
//     buttonContent: { text: '', icon: '' },
//     buttonError: false,
//   };
  

// const oAuthStep3Slice = createSlice({
//   name: 'oAuthStep3',
//   initialState,
//   reducers: {
//     setExpiryTimeLeft(state, action) {
//       state.expiryTimeLeft = action.payload;
//     },
//     setAccountAlreadyConnected(state, action) {
//       state.accountAlreadyConnected = action.payload;
//     },
//     setAuthPersonInfo(state, action) {
//       state.authPersonInfo = action.payload;
//     },
//     setButtonContent(state, action) {
//       state.buttonContent = action.payload;
//     },
//     setButtonError(state, action) {
//       state.buttonError = action.payload;
//     },
//   },
// });

// export const { setExpiryTimeLeft, setAccountAlreadyConnected, setAuthPersonInfo, setButtonContent, setButtonError } = oAuthStep3Slice.actions;
// export default oAuthStep3Slice.reducer;


import { createSlice } from '@reduxjs/toolkit';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface OAuthStep3State {
  expiryTimeLeft: number;
  accountAlreadyConnected: boolean;
  authPersonInfo: { data: { userPrincipalName: string }, status: number };
  buttonContent: { text: string; icon: IconProp };
  buttonError: boolean;
}

const initialState: OAuthStep3State = {
  expiryTimeLeft: 0,
  accountAlreadyConnected: false,
  authPersonInfo: { data: { userPrincipalName: '' }, status: -1 },
  buttonContent: { text: '', icon: ['fas', 'check'] },
  buttonError: false,
};

const oAuthStep3Slice = createSlice({
  name: 'oAuthStep3',
  initialState,
  reducers: {
    setExpiryTimeLeft(state, action) {
      state.expiryTimeLeft = action.payload;
    },
    setAccountAlreadyConnected(state, action) {
      state.accountAlreadyConnected = action.payload;
    },
    setAuthPersonInfo(state, action) {
      state.authPersonInfo = action.payload;
    },
    setButtonContent(state, action) {
      state.buttonContent = action.payload;
    },
    setButtonError(state, action) {
      state.buttonError = action.payload;
    },
  },
});

export const { setExpiryTimeLeft, setAccountAlreadyConnected, setAuthPersonInfo, setButtonContent, setButtonError } = oAuthStep3Slice.actions;
export default oAuthStep3Slice.reducer;
