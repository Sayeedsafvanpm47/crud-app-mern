import { useSelector } from "react-redux";
import { apiSlice } from "./apiSlice";
import Cookies from 'js-cookie';

const ADMIN_URL = '/api/admin'

const getTokenFromCookies = () => Cookies.get('jwt');

export const adminApiSlice = apiSlice.injectEndpoints({
   
          endpoints : (builder)=>({
                    getUsers : builder.query({
                       query : ()=>({
                              url : `${ADMIN_URL}/home`,
                              method : 'GET',
                              headers :{
                                 'Authorization': `Bearer ${getTokenFromCookies()}`,
                                 'Content-Type': 'application/json',
                              }
                           
                       })
                        
                    }),
                    searchUsers : builder.query({
                     query: (searchText)=>({
                               url : `${ADMIN_URL}/search?searchText=${searchText}`,
                               method : 'GET',
                               
                     })
                    }),
                    updateUser : builder.mutation({
                     query : (data)=>({
                            url : `${ADMIN_URL}/update`,
                            method : 'PATCH',
                            body : data 
                     })
                    })
                    ,
                    deleteUser : builder.mutation({
                     query : (data)=>({
                        url:`${ADMIN_URL}/delete`,
                        method : 'DELETE',
                        body : data
                     })
                    })
          })
})

export const {useGetUsersQuery,useSearchUsersQuery,useUpdateUserMutation,useDeleteUserMutation} = adminApiSlice