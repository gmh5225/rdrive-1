// import { fetchData } from '../features/apiSlice'
// import { useDispatch } from 'react-redux'

// const YourComponent: React.FC = () => {
//   const dispatch = useDispatch()

//   const handleFetchData = async () => {
//     // Use the authApi URL to authenticate and get an access token
//     const authResponse = await fetch('https://login.microsoftonline.com/token', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       },
//       body: `client_id=YOUR_CLIENT_ID&scope=YOUR_SCOPES&client_secret=YOUR_CLIENT_SECRET&grant_type=client_credentials`
//     })
//     const authData = await authResponse.json()
//     const accessToken = authData.access_token

//     // Use the driveApi URL and access token to fetch data from the drive API
//     const driveResponse = await fetch('https://graph.microsoft.com/drive', {
//       headers: {
//         'Authorization': `Bearer ${accessToken}`
//       }
//     })
//     const driveData = await driveResponse.json()

//     // Dispatch an action to update your store with the fetched data
//     dispatch(fetchData(driveData))
//   }

//   return (
//     <button onClick={handleFetchData}>Fetch Data</button>
//   )
// }

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://graph.microsoft.com/drive' }),
  endpoints: (builder) => ({
    getDriveData: builder.query({
      query: () => '/drive',
    }),
  }),
});

export const { useGetDriveDataQuery } = api;
