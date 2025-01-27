import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchUsers, createUser, updateUser, deleteUser } from "../api"
import type { UserState, User } from "../types"

const initialState: UserState = {
  users: [],
  status: "idle",
  error: null,
}

export const fetchUsersAsync = createAsyncThunk("users/fetchUsers", async () => {
  return await fetchUsers()
})

export const createUserAsync = createAsyncThunk("users/createUser", async (userData: Omit<User, "id">) => {
  return await createUser(userData)
})

export const updateUserAsync = createAsyncThunk("users/updateUser", async (userData: User) => {
  return await updateUser(userData)
})

export const deleteUserAsync = createAsyncThunk("users/deleteUser", async (id: number) => {
  await deleteUser(id)
  return id
})

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.users = action.payload
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch users"
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.users.push(action.payload)
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id)
        if (index !== -1) {
          state.users[index] = action.payload
        }
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload)
      })
  },
})

export default userSlice.reducer

