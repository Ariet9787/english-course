import { Course, Media } from '@/payload-types'
import Image from 'next/image'

interface CoursesSectionProps {
  courses: Course[]
  whatsAppNumber?: string | null
}

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'short' }).format(new Date(date))

export default function CoursesSection({ courses, whatsAppNumber }: CoursesSectionProps) {
  const displayedCourses = courses.slice(0, 3)
  const phoneNumber = whatsAppNumber?.replace(/\D/g, '')
  const whatsAppLink = phoneNumber ? `https://wa.me/${phoneNumber}` : '/contacts'

  if (displayedCourses.length === 0) return null

  return (
    <section className="bg-linear-to-br from-sky-50 via-white to-pink-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-7 text-3xl font-bold tracking-tight text-slate-800">Наши курсы</h2>

        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {displayedCourses.map((course) => {
            const image = typeof course.image === 'object' ? (course.image as Media) : null

            return (
              <li key={course.id} className="group flex overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-pink-200 hover:shadow-lg motion-reduce:transition-none">
                <article className="flex w-full flex-col">
                  {image?.url ? (
                    <Image src={image.url} alt={image.alt || course.title} width={500} height={280} className="h-44 w-full object-cover transition duration-300 group-hover:scale-[1.03] motion-reduce:transition-none" />
                  ) : (
                    <div className="h-44 bg-sky-100" />
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-xl font-bold text-slate-800">{course.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{course.description}</p>
                    <p className="mt-4 text-xs text-slate-500">{formatDate(course.startDay)} — {formatDate(course.finishDay)}</p>
                    <p className="mt-2 font-semibold text-sky-600">{course.price.toLocaleString('ru-RU')} с</p>
                    <a href={whatsAppLink} className="mt-5 rounded-xl bg-sky-500 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-sky-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 motion-reduce:transition-none">
                      Записаться
                    </a>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
// Вход в header - для студентов, учителя,
// Особенности, новости, контакты
