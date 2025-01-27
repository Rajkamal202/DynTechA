export interface User {
    _id: string // Changed from 'id' to '_id' to match MongoDB
    name: string
    email: string
    dateOfBirth: string
    role: "user" | "admin"
    createdAt: string
    updatedAt: string
  }
  
  export interface LoginCredentials {
    email: string
    password: string
  }
  
  export interface AuthState {
    token: string | null
    status: "idle" | "loading" | "succeeded" | "failed"
    error: string | null
  }
  
  export interface UserState {
    users: User[]
    status: "idle" | "loading" | "succeeded" | "failed"
    error: string | null
  }
  
  