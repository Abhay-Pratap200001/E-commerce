// Import function to create the Redux store
import { configureStore } from "@reduxjs/toolkit";

// Import helper for auto re-fetch (when app focuses or reconnects to internet)
import { setupListeners } from "@reduxjs/toolkit/query/react";

// Import the main API slice (where all API endpoints are defined)
import { apiSlice } from "./api/apiSlice";

//
import authReducer from './features/auth/authSlice'

// Create the store (the main place where all app data is stored)
const store = configureStore({
    reducer: {
        // Add API slice reducer (to saves API data in Redux)
        [apiSlice.reducerPath]: apiSlice.reducer,
         auth: authReducer,
    },

    // Add API slice middleware (handles caching, refresh, retries, etc.)
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),

    // Turn ON Redux DevTools (so we can see store in browser extension)
    devTools: true,
});

// Setup auto listeners (refresh data when focus returns or internet reconnects)
setupListeners(store.dispatch);

// Export the store (to connect with <Provider> in index.js / App.js)
export default store;
