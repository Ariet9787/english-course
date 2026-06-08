import { postReadAccess } from '@/access/postReadAccess'
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    read: postReadAccess,
  },
  labels: {
    singular: 'Новость',
    plural: 'Новости',
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Заголовок',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Постер',
    },
    {
      name: 'describe',
      type: 'richText',
      required: true,
      label: 'Содержание',
    },
  ],
}
// post
