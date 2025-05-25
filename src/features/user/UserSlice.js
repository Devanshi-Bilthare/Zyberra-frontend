import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserService from "./UserService";

export const register = createAsyncThunk(
  "user/register",
  async (data, thunkApi) => {
    try {
      return await UserService.Register(data);
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const login = createAsyncThunk("user/login", async (data, thunkApi) => {
  try {
    return await UserService.Login(data);
  } catch (err) {
    return thunkApi.rejectWithValue(err);
  }
});

export const forgotPassword = createAsyncThunk(
  "user/forgot-password",
  async (data, thunkApi) => {
    try {
      return await UserService.ForgotPassword(data);
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/reset-password",
  async (data, thunkApi) => {
    try {
      return await UserService.ResetPassword(data);
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const allUsers = createAsyncThunk(
  "user/all",
  async ( thunkApi) => {
    try {
      return await UserService.AllUsers();
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);


const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  allUsers:[],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const resetState = createAction("Reset_all");

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.newUser;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.newUser));
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
       state.message =
          action.payload?.response?.data?.message
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;

        console.log(action)

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;

        state.message =
          action.payload?.response?.data?.message ||
          action.error?.message ||
          "Login failed";
      })
      .addCase(resetState, (state) => {
        state.user = null;
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = "";
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })

      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })

      .addCase(allUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allUsers = action.payload;
      })
      .addCase(allUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.allUsers = null
      })
      
  },
});

export default UserSlice.reducer;

export const { reset } = UserSlice.actions;
