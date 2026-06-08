import { aboutUsReadAccess } from '@/access/aboutUsReadAccess'
import type { GlobalConfig } from 'payload'

export const AboutUs: GlobalConfig = {
  slug: 'about-us',
  label: {
    singular: 'О нас',
  },
  access: {
    read: aboutUsReadAccess,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'banner',
      relationTo: 'media',
      type: 'upload',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
  ],
}
