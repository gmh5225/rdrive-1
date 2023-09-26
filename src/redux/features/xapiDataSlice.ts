import { createSlice } from '@reduxjs/toolkit';

const apiDataSlice = createSlice({
  name: 'apiData',
  initialState: {
    clientId: '',
    clientSecret: '',
    authApi: 'https://login.microsoftonline.com//token',
    driveApi: 'https://graph.microsoft.com/drive',
    scope: 'user.read files.read.all Files.ReadWrite files.readwrite.all offline_access Sites.ReadWrite.All',
    cacheControlHeader: 'max-age=0, s-maxage=60, stale-while-revalidate'
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
