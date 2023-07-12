import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false},
    reducers: {
        login(state){
            state.isLoggedIn = true
        },
        logout(state){
            //Removing items from the local storage
            localStorage.removeItem("userId")
            localStorage.removeItem("userName")
            
            state.isLoggedIn = false
        }
    }
})

export const {login, logout} = authSlice.actions
export default authSlice.reducer