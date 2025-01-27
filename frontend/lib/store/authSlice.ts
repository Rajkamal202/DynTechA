import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { login } from "../api"
import { setToken, removeToken } from "../auth"
import type { AuthState, LoginCredentials } from "../types"

const initialState: AuthState = {
  token: null,
  status: "idle",
  error: null,
}

export const loginAsync = createAsyncThunk("auth/login", async (credentials: LoginCredentials) => {
  const response = await login(credentials.email, credentials.password)
  setToken(response.token)
  return response
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null
      state.status = "idle"
      state.error = null
      removeToken()
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.token = action.payload.token
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Login failed"
      })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer


