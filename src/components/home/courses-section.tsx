import { Course, Media } from '@/payload-types'
import Image from 'next/image'

interface CoursesSectionProps {
  courses: Course[]
}

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'short' }).format(new Date(date))

export default function CoursesSection({ courses }: CoursesSectionProps) {
  if (courses.length === 0) return null

  return (
    <section className="bg-linear-to-br from-sky-50 via-white to-pink-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-6 text-2xl font-bold text-slate-800">Наши курсы</h2>

        <ul className="flex gap-4 overflow-x-auto rounded-xl border border-white/70 bg-white/60 p-4 pb-3 shadow-sm backdrop-blur-sm">
          {courses.map((course) => {
            const image = typeof course.image === 'object' ? (course.image as Media) : null

            return (
              <li key={course.id} className="w-[250px] shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white">
                {image?.url ? (
                  <Image src={image.url} alt={image.alt || course.title} width={500} height={280} className="h-32 w-full object-cover" />
                ) : (
                  <div className="h-32 bg-sky-100" />
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-slate-800">{course.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600">{course.description}</p>
                  <p className="mt-3 text-xs text-slate-500">{formatDate(course.startDay)} — {formatDate(course.finishDay)}</p>
                  <p className="mt-2 font-semibold text-sky-600">{course.price.toLocaleString('ru-RU')} ₸</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
