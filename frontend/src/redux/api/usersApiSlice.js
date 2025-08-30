// Step 3
// Import the main apiSlice we made in apiSlice.js
// This is like the "base API setup"
import { apiSlice } from "./apiSlice.js";

// Import USERS_URL constant
// This holds the base path for user-related routes ("/api/users")
import { USERS_URL } from "../constants.js";

// Add (inject) new endpoints into apiSlice
// Think of it as "adding extra routes" for API calls
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create a "login" API call
    login: builder.mutation({
      // mutation = for actions that CHANGE data (POST, PUT, DELETE)
      query: (data) => ({
        // Final URL: /api/users/auth
        // USERS_URL = "/api/users" → add "/auth"
        url: `${USERS_URL}/auth`,

        // HTTP method → POST (because we are sending login info)
        method: "POST",

        // Body of the request = the login form data
        // Example: { email: "test@test.com", password: "12345" }
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),

    //FOR GETTING USER IN ADMIN DASHBOARD
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),

    //FOR DELETING THE USER FROM ADMIN SIDE
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      }),
    }),

    getUserDetails: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags:['User'],
    }),
  }),
});


// RTK Query automatically creates a custom React hook for us
// useLoginMutation → used inside React components
// Example:
// const [login, { isLoading }] = useLoginMutation();
// login({ email, password }) will call the backend
export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} = userApiSlice;
