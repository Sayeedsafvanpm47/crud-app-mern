import { apiSlice } from "./apiSlice";

const ADMIN_URL = '/api/admin'

export const adminApiSlice = apiSlice.injectEndpoints({
          endpoints : (builder)=>({
                    getUsers : builder.query({
                       query : ()=>({
                              url : `${ADMIN_URL}/`,
                              method : 'GET',
                             transformResponse:(response)=>response.data
                       })
                        
                    })
          })
})

export const {useGetUsersQuery} = adminApiSlice