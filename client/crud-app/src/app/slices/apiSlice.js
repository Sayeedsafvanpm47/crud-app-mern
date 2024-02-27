import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
          baseUrl : ''  //initiating to empty string since i have set up the proxy 
})
export const apiSlice = createApi({
          baseQuery,
          tagTypes:['User','Admin'],
          endpoints:(builder)=>({}) //setting up a space for dependancy injection which will be coming from userApiSlice 
})