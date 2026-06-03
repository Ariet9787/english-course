import type { CollectionConfig } from 'payload'
import { groudReadAccess } from '@/access/groupReadAccess'

export const Groups: CollectionConfig = {
  slug: 'groups',
  access: {
    read: groudReadAccess,
  },
  labels: {
    singular: 'Группа',
    plural: 'Группы',
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Заголовок',
      type: 'text',
      required: true,
    },
    {
      name: 'teacher',
      label: 'Преподователь группы',
      type: 'relationship',
      filterOptions: {
        role: {
          equals: 'teacher',
        },
      },
      relationTo: 'users',
      required: true,
    },
    {
      name: 'groupLevel',
      type: 'select',
      label: 'Уровень группы',
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
      name: 'schedule',
      label: 'Расписние',
      labels: {
        singular: 'Расписние',
        plural: 'Расписания',
      },
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'day',
              type: 'select',
              label: 'День',
              options: [
                { label: 'Понедельник', value: 'Monday' },
                { label: 'Вторник', value: 'Tuesday' },
                { label: 'Среда', value: 'Wednesday' },
                { label: 'Четверг', value: 'Thursday' },
                { label: 'Пятница', value: 'Friday' },
                { label: 'Суббота', value: 'Saturday' },
              ],
            },
            {
              name: 'startTime',
              type: 'date',
              label: 'Время начало занятий',
              admin: {
                date: {
                  pickerAppearance: 'timeOnly',
                  displayFormat: 'HH:mm',
                  timeFormat: 'HH:mm',
                },
              },
            },
            {
              name: 'endTime',
              type: 'date',
              label: 'Время конца занятий',
              admin: {
                date: {
                  pickerAppearance: 'timeOnly',
                  displayFormat: 'HH:mm',
                  timeFormat: 'HH:mm',
                },
              },
            },
          ],
        },
      ],
    },
  ],
}
// title - text, group level - select, teacher of group, doing relationship from teachers, schedule - [], day and hours of end and start
