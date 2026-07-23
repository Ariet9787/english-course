import type { Access } from 'payload'

export const userReadAccess: Access = async ({ req }) => {
  const { user } = req

  if (!user) return false
  if (user.role === 'manager' || user.role === 'admin' || user.role === 'student') return true
  return false
}
