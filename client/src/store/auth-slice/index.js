/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  user: JSON.parse(localStorage.getItem("authUser")) || null, // Load user from localStorage
  isAuthenticated: !!localStorage.getItem("authUser"), // Determine auth state based on presence of user
  isLoading: false,
};

// Async Thunks
export const registerUser = createAsyncThunk("/auth/register", async (formData) => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/register",
    formData,
    { withCredentials: true }
  );
  return response.data;
});

export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/login",
    formData,
    { withCredentials: true }
  );
  return response.data;
});

export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/logout",
    {},
    { withCredentials: true }
  );  
  return response.data;
});

export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  const response = await axios.get(
    "http://localhost:5000/api/auth/check-auth",
    {
      withCredentials: true,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    }
  );
  return response.data;
});

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;

      // Persist state to localStorage
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated));
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;

      // Clear localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // Login User
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { success, user } = action.payload;
        state.isLoading = false;
        state.isAuthenticated = success;
        state.user = success ? user : null;

        // Persist to localStorage
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated));
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // Check Authentication
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        const { success, user } = action.payload;
        state.isLoading = false;
        state.isAuthenticated = success;
        state.user = success ? user : null;

        // Persist to localStorage
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated));
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;

        // Clear localStorage if auth check fails
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
      })

      // Logout User
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;

        // Clear localStorage on logout
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
      });
  },
});

// Export Actions and Reducer
export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
