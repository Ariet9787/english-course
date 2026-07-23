'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'
import { Media } from '@/payload-types'
import { useState } from 'react'
import Image from 'next/image'

interface GradeEntry {
  student: string
  grade: number
  type: 'activity' | 'homeworks' | 'tests'
  comment?: string
}

interface Lesson {
  id: string
  title: string
  content?: unknown
  lessonMaterials?: Media[]
  date?: string
  homework?: string
  grades?: GradeEntry[]
}

interface Group {
  id: string
  title: string
  lessons?: Lesson[]
}

interface StudentDoc {
  id: string
  fullName: string
  level?: string
}

interface DashboardClientProps {
  student: StudentDoc
  groups: Group[]
}
function formatDate(isoString: string): string {
  if (!isoString) return ''
  return new Date(isoString).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  })
}
export default function DashboardClient({ student, groups }: DashboardClientProps) {
  const [openGroupId, setOpenGroupId] = useState<string | null>(groups[0]?.id ?? null)
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(
    groups[0]?.lessons?.[0] ?? null,
  )

  const toggleGroup = (groupId: string) => {
    setOpenGroupId((current) => (current === groupId ? null : groupId))
  }
  console.log(selectedLesson)

  return (
    <div className="flex min-h-screen">
      <aside className="w-72 shrink-0 border-r border-sky-100 bg-white p-4">
        <h2 className="mb-1 text-lg font-bold text-slate-800">Все группы</h2>
        <p className="mb-4 text-xs text-slate-400">{student.fullName}</p>

        {groups.length === 0 && (
          <p className="text-sm text-slate-500">Вы пока не состоите ни в одной группе.</p>
        )}

        <ul className="space-y-2">
          {groups.map((group) => {
            const isOpen = openGroupId === group.id
            const lessons = [...(group.lessons ?? [])].sort((a, b) => {
              const dateA = a.date ? new Date(a.date).getTime() : 0
              const dateB = b.date ? new Date(b.date).getTime() : 0
              return dateA - dateB
            })

            return (
              <li key={group.id}>
                <button
                  type="button"
                  onClick={() => toggleGroup(group.id)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-sky-50"
                >
                  {group.title}
                  <span
                    className={`text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  >
                    ▾
                  </span>
                </button>

                {isOpen && (
                  <ul className="ml-3 mt-1 space-y-1 border-l border-sky-100 pl-3">
                    {lessons.length === 0 && (
                      <li className="py-1 text-xs text-slate-400">Уроков пока нет</li>
                    )}
                    {lessons.map((lesson) => (
                      <li key={lesson.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedLesson(lesson)}
                          className={`block w-full rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                            selectedLesson?.id === lesson.id
                              ? 'bg-sky-100 font-semibold text-sky-700'
                              : 'text-slate-600 hover:bg-sky-50'
                          }`}
                        >
                          {lesson.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </aside>

      <section className="flex-1 p-8">
        {selectedLesson ? (
          <article className="mx-auto max-w-3xl">
            <section>
              <span>{formatDate(selectedLesson.date ?? '')}</span>
              <h1 className="mb-4 text-2xl font-bold text-slate-800 border-slate-500 border-b-2">{selectedLesson.title}</h1>
              <div className="prose max-w-none">
                <h3>Содержание урока</h3>
                <LessonContent content={selectedLesson.content} />
                {selectedLesson.lessonMaterials && selectedLesson.lessonMaterials.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-4">
                    {selectedLesson.lessonMaterials.map((material) =>
                      material.url ? (
                        <Image
                          key={material.id}
                          src={material.url}
                          alt={material.alt ?? ''}
                          width={500}
                          height={500}
                        />
                      ) : null,
                    )}
                  </div>
                )}


              </div>
              {selectedLesson.homework && (
                <div className="mt-6 rounded-lg bg-amber-50 p-4">
                  <h3 className="mb-1 text-sm font-semibold text-amber-800">Домашнее задание</h3>
                  <p className="text-sm text-amber-900 whitespace-pre-wrap">
                    {selectedLesson.homework}
                  </p>
                </div>
              )}
            </section>
            <aside>
              <div>
                <h2>Оценки</h2>
                <p>{selectedLesson.grades}</p>
              </div>
            </aside>

          </article>
        ) : (
          <p className="text-slate-500">Выберите урок слева, чтобы увидеть его содержание.</p>
        )}

      </section>
    </div>
  )
}

function LessonContent({ content }: { content: unknown }) {
  if (!content) {
    return <p className="text-slate-400">Для этого урока пока нет содержания.</p>
  }

  // richText-поле в Payload/Lexical хранит контент как объект
  // (сериализованное состояние редактора), а не как строку.
  if (typeof content === 'object') {
    return <RichText className="richtext" data={content as any} />
  }

  return (
    <pre className="whitespace-pre-wrap text-sm text-slate-600">
      {JSON.stringify(content, null, 2)}
    </pre>
  )
}
