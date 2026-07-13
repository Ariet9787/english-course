import { companyReadAccess } from '@/access/companyReadAccess'
import type { GlobalConfig } from 'payload'
import { array, number, relationship } from 'payload/shared'

export const Company: GlobalConfig = {
  slug: 'website-info',
  access: {
    read: companyReadAccess,
  },
  label: {
    singular: 'Компания',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Название',
    },
    {
      name: 'describe',
      type: 'textarea',
      required: true,
      label: 'Описание',
    },
    {
      name: 'email',
      type: 'email',
      required: false,
      label: 'Почта',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Логотип',
    },
    {
      name: 'socials',
      type: 'relationship',
      relationTo: 'socials',
      label: 'Социальные сети',
      required: true,
      hasMany: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Номер Телефона',
    },
    {
      name: 'WhatsApp',
      type: 'text',
      required: true,
      label: 'WhatsApp контакт',
    },
    {
      name: 'addres',
      type: 'textarea',
      required: true,
      label: 'Адрес',
    },
    {
      name: 'banner',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'features',
      type: 'array',
      label: 'Преимущества компании',
      labels: {
        singular: 'Преимущество',
        plural: 'Преимущества',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'icon',
              type: 'relationship',
              relationTo: 'media',
              required: true,
              hasMany: false,
              label: 'Иконка',
            },
            {
              name: 'description',
              type: 'text',
              required: true,
              label: 'Описание',
            },
          ],
        },
      ],
    },
    {
      name: 'classImages',
      type: 'upload',
      relationTo: 'media',
      required: true,
      hasMany: true,
      label: 'Фотографии кабинетов',
    },

  ],
}
