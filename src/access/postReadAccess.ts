import type { Access } from 'payload'

export const postReadAccess: Access = async ({ req }) => {
  const { user } = req

  if (!user) return false
  if (user.role === 'manager' || user.role === 'admin') return true
  return false
}
