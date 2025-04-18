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
