import axios from "axios"
import type { User, LoginCredentials } from "./types"

const API_URL = process.env.NEXT_PUBLIC_API_URL

const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const login = async (credentials: LoginCredentials) => {
  const response = await api.post<{ token: string }>("/users/login", credentials)
  return response.data
}

export const register = async (userData: Omit<User, "_id" | "createdAt" | "updatedAt">) => {
  const response = await api.post<{ token: string }>("/users/register", userData)
  return response.data
}

export const fetchUsers = async () => {
  const response = await api.get<User[]>("/users")
  return response.data
}

export const createUser = async (userData: Omit<User, "_id" | "createdAt" | "updatedAt">) => {
  const response = await api.post<User>("/users", userData)
  return response.data
}

export const updateUser = async (userData: Partial<User> & { _id: string }) => {
  const response = await api.put<User>(`/users/${userData._id}`, userData)
  return response.data
}

export const deleteUser = async (id: string) => {
  await api.delete(`/users/${id}`)
}

