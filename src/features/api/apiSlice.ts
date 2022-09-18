import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';


export const apiSlice = createApi({
   reducerPath: 'api', // optional
   baseQuery: fakeBaseQuery(),
   tagTypes: ['Auth', 'Notes', 'Todos'],
   endpoints: build => ({})
})