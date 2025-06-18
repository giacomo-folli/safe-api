export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  details?: any
}

export class ApiError extends Error {
  constructor(
    message: string,
    public details?: any,
    public status?: number
  ) {
    super(message)
    this.name = 'ApiError'
  }
}
