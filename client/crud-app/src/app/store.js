import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice';
import userReducer from './slices/usersResultSlice'
import { apiSlice } from './slices/apiSlice';

const store = configureStore({
          reducer:{
                    auth : authReducer,
                    [apiSlice.reducerPath] : apiSlice.reducer ,
                    search : userReducer
          },
          middleware : (getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware),
          devTools:true

});

export default store