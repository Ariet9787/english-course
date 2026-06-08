import type { Access } from 'payload'

export const companyReadAccess: Access = async ({ req }) => {
  const { user } = req

  if (!user) return false
  if (user.role === 'admin') return true
  return false
}
