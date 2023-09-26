import { createSlice } from '@reduxjs/toolkit';

interface OAuthStep2State {
  oAuthRedirectedUrl: string;
  authCode: string;
  buttonLoading: boolean;
}

const initialState: OAuthStep2State = {
  oAuthRedirectedUrl: '',
  authCode: '',
  buttonLoading: false,
};

const oAuthStep2Slice = createSlice({
  name: 'oAuthStep2',
  initialState,
  reducers: {
    setOAuthRedirectedUrl(state, action) {
      state.oAuthRedirectedUrl = action.payload;
    },
    setAuthCode(state, action) {
      state.authCode = action.payload;
    },
    setButtonLoading(state, action) {
      state.buttonLoading = action.payload;
    },
  },
});

export const { setOAuthRedirectedUrl, setAuthCode, setButtonLoading } = oAuthStep2Slice.actions;
export default oAuthStep2Slice.reducer;
