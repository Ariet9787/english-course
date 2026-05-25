import type { CollectionConfig } from 'payload'
import { relationship } from 'payload/shared'
export const Lessons: CollectionConfig = {
  slug: 'lessons',
  labels: {
    singular: 'Урок',
    plural: 'Уроки',
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'group',
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
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Тема урока',
    },
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
    {
      name: 'isPublished',
      type: 'checkbox',
      label: 'Опубликовать?',
      defaultValue: false,
    },
  ],
}
