import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/user/getUser`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload; // Store the fetched user data
    });
    builder.addCase(getUserData.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload; // Handle login error
      });
  },
});


export default userSlice.reducer;
