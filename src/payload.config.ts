import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { ru } from '@payloadcms/translations/languages/ru'
import { Teachers } from './collections/Teachers'
// import { MainTitle } from './globals/MainTitle'
// import { MainBanner } from './globals/MainBanner'
import { AboutUs } from './globals/AboutUs'
import { Company } from './globals/WebsiteInfo'
import { Groups } from './collections/Groups'
import { Students } from './collections/Students'
import { Posts } from './collections/Posts'
import { Socials } from './collections/Socials'
import { Lessons } from './collections/Lessons'
// import { Spellings } from './collections/Spellings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    timezones: { defaultTimezone: 'Asia/Almaty' },
  },
  collections: [Users, Media, Teachers, Groups, Students, Socials, Posts, Lessons],
  globals: [Company, AboutUs],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  i18n: {
    supportedLanguages: { ru },
  },
})
// 1255tip
