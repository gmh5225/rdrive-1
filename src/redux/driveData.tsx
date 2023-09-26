// import React from 'react';
// import { useGetDriveDataQuery } from '../redux/features/url';

// export const DriveData = () => {
//   const { data, isLoading, error } = useGetDriveDataQuery();

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>An error occurred: {error.toString()}</div>;
//   }

//   return (
//     <div>
//       <h1>Drive Data</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// };
