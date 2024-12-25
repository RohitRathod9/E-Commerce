/* eslint-disable no-undef */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [], // Array to store feature images
  error: null, // For tracking error messages
};

// Async thunk to fetch feature images
export const getFeatureImages = createAsyncThunk(
  "common/getFeatureImages", // Updated action name for clarity
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/common/feature/get`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching images");
    }
  }
);
console.log(getFeatureImages);


// Async thunk to add a new feature image
export const addFeatureImage = createAsyncThunk(
  "common/addFeatureImage", // Updated action name for clarity
  async (image, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/common/feature/add`,
        { image }
      );

      // Refetch the feature images after adding the new one
      dispatch(getFeatureImages());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error adding image");
    }
  }
);

// Slice definition
const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling getFeatureImages actions
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data || [];
      })
      .addCase(getFeatureImages.rejected, (state, action) => {
        state.isLoading = false;
        state.featureImageList = [];
        state.error = action.payload || "Failed to fetch feature images";
      })

      // Handling addFeatureImage actions
      .addCase(addFeatureImage.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(addFeatureImage.fulfilled, (state) => {
        state.isLoading = false;
        // Optionally update state here if needed
      })
      .addCase(addFeatureImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to add feature image";
      });
  },
});

export default commonSlice.reducer;
