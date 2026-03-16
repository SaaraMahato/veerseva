import api from './api'
import { setTokens, clearTokens } from './utils'
import type { LoginPayload, RegisterPayload, OTPPayload, AuthTokens, User } from './types'

export async function registerVeteran(data: RegisterPayload): Promise<void> {
  await api.post('/auth/register/', data)
}

export async function sendOTP(email: string): Promise<void> {
  await api.post('/auth/send-otp/', { email })
}

export async function verifyOTP(data: OTPPayload): Promise<void> {
  await api.post('/auth/verify-otp/', data)
}

export async function loginUser(data: LoginPayload): Promise<{ tokens: AuthTokens; user: User }> {
  const response = await api.post('/auth/login/', data)
  const { access, refresh, user } = response.data
  setTokens(access, refresh)
  return { tokens: { access, refresh }, user }
}

export function logoutUser(): void {
  clearTokens()
  window.location.href = '/login'
}

export async function getCurrentUser(): Promise<User> {
  const response = await api.get('/auth/me/')
  return response.data
}

export async function resendOTP(email: string): Promise<void> {
  await api.post('/auth/send-otp/', { email })
}