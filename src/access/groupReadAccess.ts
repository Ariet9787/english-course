import { Teachers } from '@/collections/Teachers'
import type { Access, Where } from 'payload'

export const groudReadAccess: Access = async ({ req }) => {
  const { user } = req
  if (!user) return false
  if (user.role === 'manager' || user.role === 'admin') return true
  if (user.role === 'teacher') {
    const teacherResult = await req.payload.find({
      collection: 'teachers',
      where: {
        user: {
          equals: user.id,
        },
      },
      limit: 1,
    })
    const teacher = teacherResult.docs[0]
    if (!teacher) return false
    return {
      teacher: {
        equals: teacher.id,
      },
    }
  }

  if (user.role === 'student') {
    const studentResult = await req.payload.find({
      collection: 'students',
      where: {
        user: {
          equals: user.id,
        },
      },
      limit: 1,
    })
    const student = studentResult.docs[0]
    if (!student?.group) return false
    const groupId = typeof student.group === 'object' ? student.group.id : student.group
    const where: Where = {
      id: {
        equals: groupId,
      },
    }

    return where
  }
  return false
}
