export interface LoginResponse {
  access_token: string
  token_type: string
}

export interface ApiError {
  detail?: string
  message?: string
}

export interface User {
  username: string
  email?: string
  token?: string
}

export interface Todo {
  id: number
  title: string
  description?: string
  completed: boolean
  createdAt?: string
  updatedAt?: string
}