import type { Access } from 'payload'

export const isAdminOrManager: Access = ({ req: { user } }) => {
  if (!user) return false
  return ['admin', 'manager'].includes(user?.role)
}
