import { apiSlice } from "./apiSlice";

const USERS_URL = '/api'

export const userApiSlice = apiSlice.injectEndpoints({
          endpoints : (builder)=>({
                    login : builder.mutation({
                              query : (data)=>({
                                        url : `${USERS_URL}/login`,
                                        method: 'POST',
                                        body : data 
                              })
                    }),
                    logout : builder.mutation({
                              query : ()=>({
                                        url : `${USERS_URL}/logout`,
                                        method : 'GET'
                              })
                    }),
                    register : builder.mutation({
                              query : (data)=>({
                                    url : `${USERS_URL}/register`,
                                    method:'POST',
                                    body:data    
                              })
                    })
          })
})

export const {useLoginMutation,useLogoutMutation,useRegisterMutation} = userApiSlice 