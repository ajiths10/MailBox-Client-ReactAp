import { createSlice } from "@reduxjs/toolkit";

const initValue = { isAuth: false }

const authSlice = createSlice({
    name: 'Authentication',
    initialState: initValue,
    reducers:{
        setAuth(state,action){
            state.isAuth=action.payload;
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;