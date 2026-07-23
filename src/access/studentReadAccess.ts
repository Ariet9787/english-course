import type { Access } from 'payload'

export const studentReadAccess: Access = async ({ req }) => {
  const { user } = req

  if (!user) return false
  // if (user.role === 'admin' || user.role === 'manager' || user.role === 'teacher') return true
  return true
}
