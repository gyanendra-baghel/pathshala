import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User, UserRole } from "../../utils/types";
import API from "../../utils/api";

// Define Auth State
interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

// Login Thunk
export const loginUser = createAsyncThunk<
  { user: User; token: string },
  { email: string; password: string; role: UserRole }
>("auth/loginUser", async ({ email, password, role }, { rejectWithValue }) => {
  try {
    const response = await API.post(`/auth/login`, {
      email,
      password,
      role,
    });
    localStorage.setItem("token", response.data.token);
    location.href = `/${role.toLowerCase()}`;
    return response.data;
  } catch (error: any) {
    console.log(error);
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

// Authenticate Thunk
export const authenticateUser = createAsyncThunk<User, void>(
  "auth/authenticateUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await API.get(`/auth`);
      return response.data.user;
    } catch (error: any) {
      localStorage.removeItem("token");
      return rejectWithValue(
        error.response?.data?.message || "Authentication failed"
      );
    }
  }
);

// Logout Action
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("token");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //  Handle Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle Authentication
      .addCase(authenticateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        authenticateUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.user = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(authenticateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export default authSlice.reducer;
