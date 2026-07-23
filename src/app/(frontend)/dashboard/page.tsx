import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import DashboardClient from './dashboard-client'

export default async function DashboardPage() {
  const payload = await getPayload({ config })
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value

  if (!token) {
    redirect('/login')
  }

  let authUser
  try {
    const authResult = await payload.auth({
      headers: new Headers({ Authorization: `JWT ${token}` }),
    })
    authUser = authResult.user
  } catch {
    redirect('/login')
  }

  if (!authUser) {
    redirect('/login')
  }


  const studentsResult = await payload.find({
    collection: 'students',
    where: {
      user: { equals: authUser.id },
    },
    depth: 2,
    limit: 1,
    user: authUser,
    overrideAccess: false,
  })

  const studentDoc = studentsResult.docs[0]

  if (!studentDoc) {

    redirect('/login')
  }


  const group = (studentDoc as any).group


  let lessons: any[] = []

  if (group) {
    const lessonsResult = await payload.find({
      collection: 'lessons',
      where: {
        group: { equals: group.id },
      },
      sort: 'date',
      depth: 1,
      limit: 200,
      user: authUser,
      overrideAccess: false,
    })

    lessons = lessonsResult.docs
  }

  const groups = group ? [{ ...group, lessons }] : []

  return <DashboardClient student={studentDoc} groups={groups} />
}
