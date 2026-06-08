import { group } from 'node:console'
import { Access, Where } from 'payload'

export const lessonReadAccess: Access = async ({ req }) => {
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
    const groupResult = await req.payload.find({
      collection: 'groups',
      where: {
        teacher: {
          equals: teacher.id,
        },
      },
      limit: 100,
    })

    const groupIds = groupResult.docs.map((group) => group.id)
    if (groupIds.length === 0) return false

    return {
      group: {
        in: groupIds,
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
      group: {
        equals: groupId,
      },
    }

    return where
  }
  return false
}
