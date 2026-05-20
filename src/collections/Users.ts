import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Пользователь',
    plural: 'Пользователи',
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      label: 'Роль',
      defaultValue: 'student',
      options: [
        { label: 'Студент', value: 'student' },
        { label: 'Преподователь', value: 'teacher' },
        { label: 'Админ', value: 'admin' },
        { label: 'Менеджер', value: 'manager' },
      ],
    },
  ],
}
