import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    const { email, password } = credentials;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message || "Failed to login");
      }

      const data = await response.json(); // Assuming response contains token
      return data; // Return token or user data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//User Signup

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userdata, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userdata),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message || "Signup failed");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Forgot Password

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(email),
        }
      );
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message || "Signup failed");
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
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  success:null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload.user.token;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.user.token);
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Handle login error
    });

    // For signupUser thunk

    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user; // Store user details
      state.token = action.payload.user.token;
      localStorage.setItem("token", action.payload.user.token); // Store token in local storage
      state.loading = false;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Handle login error
    });

    // Forgot password cases

    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.message
    });

    builder.addCase(forgotPassword.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.payload; // Handle login error
    })
  },
});
export const { logout } = authSlice.actions;

export default authSlice.reducer;
