import type { Access } from 'payload'

export const mediaReadAccess: Access = async ({ req }) => {
  const { user } = req

  if (!user) return false
  if (
    user.role === 'manager' ||
    user.role === 'admin' ||
    user.role === 'student' ||
    user.role === 'teacher'
  )
    return true
  return false
}
