// step2
// fetchBaseQuery = small wrapper around fetch for API requests
// createApi = used to create the main API slice
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'

// Import the base URL (your backend server address or root path)
import { BASE_URL } from '../constants.js'

// Create a default query function with the base URL
// This means every API request will automatically start from BASE_URL
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// Create the main API slice (like the "hub" for all API endpoints)
export const apiSlice = createApi({
    // base query function for all requests
    baseQuery,

    // tagTypes are used for caching and invalidation
    // Example: If a "Product" changes, all queries with "Product" tag can be refetched
    tagTypes: ["Product", "Order", "User", "Category"],

    // endpoints = where you define API endpoints (login, fetchProducts, etc.)
    // Currently empty, we will inject endpoints later (like in userApiSlice.js)
    endpoints: () => ({})
})
