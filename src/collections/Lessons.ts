import { lessonReadAccess } from '@/access/lessonReadAccess'
import type { CollectionConfig } from 'payload'
export const Lessons: CollectionConfig = {
  slug: 'lessons',
  access: {
    read: lessonReadAccess,
  },
  labels: {
    singular: 'Урок',
    plural: 'Уроки',
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Информация урока',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'group',
                  label: 'Группа',
                  type: 'relationship',
                  relationTo: 'groups',
                  required: true,
                },
                {
                  name: 'teacher',
                  type: 'relationship',
                  relationTo: 'teachers',
                  required: true,
                  label: 'Учитель группы',
                },
                {
                  name: 'date',
                  type: 'date',
                  required: true,
                  label: 'Дата урока',
                },
              ],
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Тема урока',
            },
          ],
        },
        {
          label: 'Содержание урока',
          fields: [
            {
              name: 'content',
              type: 'richText',
              required: true,
              label: 'Содержание урока',
            },
            {
              name: 'lessonMaterials',
              type: 'upload',
              label: 'Дополнительные материалы',
              relationTo: 'media',
              hasMany: true,
            },
            {
              name: 'homework',
              type: 'textarea',
              label: 'Домашние задания',
            },
          ],
        },
        {
          label: 'Посещаемость',
          fields: [
            {
              name: 'attendanceExceptions',
              type: 'array',
              label: 'Посещаемость',
              labels: {
                singular: 'Посещаемость',
                plural: 'Посещаемость',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'student',
                      label: 'Ученик',
                      type: 'relationship',
                      relationTo: 'students',
                      required: true,
                    },
                    {
                      name: 'status',
                      label: 'Статус',
                      type: 'select',
                      required: true,
                      options: [
                        { label: 'Отсуствовал', value: 'absent' },
                        { label: 'Опоздал', value: 'lated' },
                      ],
                    },
                    {
                      name: 'comment',
                      label: 'Коментарий',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Журнал Оценок',
          fields: [
            {
              name: 'grades',
              type: 'array',
              label: 'Оценки',
              labels: {
                singular: 'Оценка',
                plural: 'Оценки',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'student',
                      label: 'Ученик',
                      type: 'relationship',
                      relationTo: 'students',
                      required: true,
                    },
                    {
                      name: 'grade',
                      label: 'Оценка',
                      type: 'number',
                      required: true,
                      min: 1,
                      max: 25,
                    },
                    {
                      name: 'type',
                      label: 'Причина оценки',
                      type: 'select',
                      required: true,
                      options: [
                        { label: 'Активность в уроке', value: 'activity' },
                        { label: 'Домашние задания', value: 'homeworks' },
                        { label: 'Тесты', value: 'tests' },
                      ],
                    },
                    {
                      name: 'comment',
                      label: 'Коментарий',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
