import type { CollectionConfig } from 'payload'
import { relationship } from 'payload/shared'

export const Courses: CollectionConfig = {
  slug: 'courses',
  labels: {
    singular: 'Курс',
    plural: 'Курсы',
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'startDay',
          type: 'date',
          label: 'Дата начала',
          required: true,
        },
        {
          name: 'finishDay',
          type: 'date',
          label: 'Дата конца',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          max: 30000,
          label: 'Цена',
          required: true
        },
      ]
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Изображение',
      relationTo: 'media',
      admin: {
        position: 'sidebar'
      },
      required: true,
    }
  ],
}
