import type { Access } from 'payload'

export const teacherReadAccess: Access = async ({ req }) => {
  const { user } = req

  if (!user) return false
  if (user.role === 'admin' || user.role === 'manager') return true
  return false
}
