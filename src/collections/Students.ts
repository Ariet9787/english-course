import { studentReadAccess } from '@/access/studentReadAccess'
import type { CollectionConfig } from 'payload'

export const Students: CollectionConfig = {
  slug: 'students',
  labels: {
    singular: 'Ученик',
    plural: 'Ученики',
  },
  admin: {
    useAsTitle: 'fullName',
  },
  access: {
    read: studentReadAccess,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'users',
          label: 'Пользователь',
          filterOptions: {
            role: {
              equals: 'student',
            },
          },
        },
        {
          name: 'firstName',
          type: 'text',
          required: true,
          label: 'Имя',
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
          label: 'Фамилия',
        },
      ],
    },

    {
      name: 'fullName',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
      },
      label: 'Полная имя',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          type: 'text',
          required: false,
          label: 'Номер телефона ученика',
        },
        {
          name: 'parentsPhone',
          type: 'text',
          required: true,
          label: 'Номер телефона Родителя',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'level',
          type: 'select',
          label: 'Уровень английского',
          options: [
            { label: 'A1', value: 'a1' },
            { label: 'A2', value: 'a2' },
            { label: 'B1', value: 'b1' },
            { label: 'B2', value: 'b2' },
            { label: 'C1', value: 'c1' },
            { label: 'C2', value: 'c2' },
          ],
          required: true,
        },
        {
          name: 'group',
          type: 'relationship',
          relationTo: 'groups',
          label: 'Группа ученика',
          required: true,
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        data.fullName = `${data.firstName} ${data.lastName}`
        return data
      },
    ],
  },
}
