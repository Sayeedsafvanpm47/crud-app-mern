import { createSlice } from "@reduxjs/toolkit";

const initialState = {
          userData : []
}

const usersResultSlice = createSlice({
          name : 'users',
          initialState,
          reducers : {
                    setUsersList : (state,action)=>{
                              
                              state.userData = action.payload 
                    }
          }
})

export const {setUsersList} = usersResultSlice.actions 
export default usersResultSlice.reducer 
