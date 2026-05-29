import type { Access } from 'payload'

export const isTeacher: Access = ({ req: { user } }) => {
  return user?.role === 'teacher'
}
