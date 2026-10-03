import { ApiError, apiRequest } from '@/src/lib/api-client'
import type { AuthUser, LoginRequest, RegisterRequest, ResetPasswordRequest } from '@/src/types/api/auth'

export function login(data: LoginRequest): Promise<AuthUser> {
  return apiRequest<AuthUser>('/auth/login', { method: 'POST', body: data, skipRefresh: true })
}

export function register(data: RegisterRequest): Promise<AuthUser> {
  return apiRequest<AuthUser>('/auth/register', { method: 'POST', body: data, skipRefresh: true })
}

export function logout(): Promise<void> {
  return apiRequest<void>('/auth/logout', { method: 'POST', skipRefresh: true })
}

/** The logged-in user, or null when there is no valid session. */
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    return await apiRequest<AuthUser>('/auth/me')
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) return null
    throw error
  }
}

export function forgotPassword(email: string): Promise<void> {
  return apiRequest<void>('/auth/forgot-password', { method: 'POST', body: { email }, skipRefresh: true })
}

export function resetPassword(data: ResetPasswordRequest): Promise<void> {
  return apiRequest<void>('/auth/reset-password', { method: 'POST', body: data, skipRefresh: true })
}

export function verifyEmail(token: string): Promise<void> {
  return apiRequest<void>('/auth/verify-email', { method: 'POST', body: { token }, skipRefresh: true })
}

export function resendVerification(): Promise<void> {
  return apiRequest<void>('/auth/resend-verification', { method: 'POST' })
}
