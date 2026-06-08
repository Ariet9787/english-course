import { companyReadAccess } from '@/access/companyReadAccess'
import type { GlobalConfig } from 'payload'

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
  ],
}
