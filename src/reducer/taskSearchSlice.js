import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTasksByTitle = createAsyncThunk(
  "task/fetchTasksByTitle",
  async (searchData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/task/search?title=${searchData}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state for the slice
const initialState = {
  tasks: [],
  loading: false,
  error: null,
};
const taskSearchSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasksByTitle.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchTasksByTitle.fulfilled,(state,action)=>{
        state.loading = false;
        state.tasks = action.payload.data
    });

    builder.addCase(fetchTasksByTitle.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload; // Store error message in state
    })
  },
});

export default taskSearchSlice.reducer;
