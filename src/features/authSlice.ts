import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../api/apiConfig';

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  avatar: string;
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

type LoginCredentials = {
  username: string;
  password: string;
};

// Load user from localStorage
const loadInitialState = (): AuthState => {
  const storedUser = localStorage.getItem('user');
  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    loading: false,
    error: null,
  };
};

const initialState: AuthState = loadInitialState();

// Async thunk for login
export const loginUser = createAsyncThunk<
  User,
  LoginCredentials,
  { rejectValue: string }
>('auth/loginUser', async ({ username, password }, { rejectWithValue }) => {
  try {
    const res = await axiosClient.post('/auth/login', {
      username,
      password,
      expiresInMins: 30,
    });

    const data = res.data;

    const user: User = {
      id: data.id,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      avatar: data.image, // assuming `image` is the avatar
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };

    return user;
  } catch (error: any) {
    if (error.response && error.response.data?.message) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue('Network error. Please try again.');
  }
});

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
      state.loading = false;
      localStorage.removeItem('user');
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Login failed';
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
