import { socialReadAccess } from '@/access/socialReadAccess'
import type { CollectionConfig } from 'payload'

export const Socials: CollectionConfig = {
  slug: 'socials',
  access: {
    read: socialReadAccess,
  },
  admin: {
    useAsTitle: 'title',
  },
  labels: {
    singular: 'Социальная сеть',
    plural: 'Социальные сеть',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Заголовок',
    },
    {
      name: 'link',
      type: 'text',
      required: false,
      label: 'ссылка',
    },
    {
      name: 'Icon',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'qrCode',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if (!data?.link && !data?.qrCode) {
          throw new Error('Необходимо заполнить email или телефон')
        }
        return data
      },
    ],
  },
}
// company
