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

  // Ищем документ в коллекции `students`, привязанный к текущему авторизованному user'у.
  // depth: 2 достаточно, чтобы раскрыть student -> group (group.teacher тоже развернётся).
  const studentsResult = await payload.find({
    collection: 'students',
    where: {
      user: { equals: authUser.id },
    },
    depth: 2,
    limit: 1,
    user: authUser,
    overrideAccess: false, // уважаем access-контроль из studentReadAccess
  })

  const studentDoc = studentsResult.docs[0]

  if (!studentDoc) {
    // У авторизованного user'а нет связанной анкеты студента
    redirect('/login')
  }

  // У студента только одна группа
  const group = (studentDoc as any).group

  // Уроки не хранятся внутри группы — в схеме Lessons есть поле `group`,
  // которое ссылается НА группу, а не наоборот. Поэтому уроки нужно
  // запрашивать отдельно, фильтруя по id группы.
  let lessons: any[] = []

  if (group) {
    const lessonsResult = await payload.find({
      collection: 'lessons',
      where: {
        group: { equals: group.id },
      },
      sort: 'date', // сортировка по дате урока (в схеме Lessons нет поля order)
      depth: 1, // чтобы lessonMaterials развернулись из id в объекты media
      limit: 200,
      user: authUser,
      overrideAccess: false, // уважаем access-контроль из lessonReadAccess
    })

    lessons = lessonsResult.docs
  }

  // Оборачиваем в массив групп, чтобы переиспользовать UI с аккордеоном,
  // и приклеиваем найденные уроки к группе вручную.
  const groups = group ? [{ ...group, lessons }] : []

  return <DashboardClient student={studentDoc} groups={groups} />
}
