// Import createSlice function from Redux Toolkit
// createSlice helps us to create state + reducers in one place
import { createSlice } from "@reduxjs/toolkit"; 

// Define the initial state of auth
// Check if userInformation exists in localStorage (means user already logged in before)
// If yes → parse and use it, else keep it null
const initialState = {
    userInfo: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo")) 
        : null,
}

// Create authSlice for managing authentication (login/logout)
const authSlice = createSlice({
    name: "auth",       // Name of the slice (will be used internally by Redux)
    initialState,        // Initial state defined above

    // Reducers = functions that can update/change the state
    reducers:{
        // ✅ Save user data when login is successful
        setCredientials: (state, action) =>{
            // Save user info to Redux store
            state.userInfo = action.payload;

            // Also save user info in localStorage (so data remains after page refresh)
            localStorage.setItem("userInfo", JSON.stringify(action.payload))

            // Set token expiration time (30 days in milliseconds)
            const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;

            // Save expiration time in localStorage
            localStorage.setItem("expirationTime", expirationTime)
        },

        // ❌ Clear user data when logout
        logout: (state) => {
            // Remove user from Redux store
            state.userInfo = null;

            // Clear everything from localStorage (logout completely)
            localStorage.clear();
        },
    },
})

// Export the actions (functions) so we can use them in components
// Example: dispatch(setCredientials(userData)) or dispatch(logout())
export const {setCredientials, logout} = authSlice.actions;

// Export the reducer so we can add it to store.js
export default authSlice.reducer;
