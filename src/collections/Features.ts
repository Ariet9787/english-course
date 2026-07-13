import type { CollectionConfig } from 'payload'
import { relationship } from 'payload/shared'

export const Features: CollectionConfig = {
  slug: 'features',
  labels: {
    singular: 'Особенность',
    plural: 'Особенности',
  },
  admin: {
    useAsTitle: 'title'
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
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      label: 'Иконка',
      admin: {
        position: 'sidebar',
      },
      required: true,
    },
  ],
}
