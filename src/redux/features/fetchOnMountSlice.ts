import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FileContentState {
  response: any;
  error: string;
  validating: boolean;
}

const initialState: FileContentState = {
  response: null,
  error: '',
  validating: true,
};

const fileContentSlice = createSlice({
  name: 'fileContent',
  initialState,
  reducers: {
    setResponse(state, action: PayloadAction<any>) {
      state.response = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setValidating(state, action: PayloadAction<boolean>) {
      state.validating = action.payload;
    },
  },
});

export const { setResponse, setError, setValidating } = fileContentSlice.actions;
export default fileContentSlice.reducer;
