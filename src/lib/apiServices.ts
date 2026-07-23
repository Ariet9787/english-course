'use server'
import { getPayloadClient } from './apiClient'
import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayloadClient()

export const getWebsiteInfo = async () => payload.findGlobal({ slug: 'website-info' })

export const getAboutUs = async () => payload.findGlobal({ slug: 'about-us' })

export const getPosts = async () => payload.find({ collection: 'posts' })

export const getCourses = async () => payload.find({ collection: 'courses', limit: 20 })

export const getSocials = async () =>
  payload.find({
    collection: 'socials',
  })

export const getFeatures = async () => payload.find({
  collection: 'features',
})

export const getRecentPosts = async () => payload.find({
  collection: 'posts',
  limit: 3,
  sort: '-createdAt'
})

export const getAllPosts = async (page: number = 1) => payload.find({
  collection: 'posts',
  limit: 6,
  page: page,
  sort: '-createdAt'
})

export const getPostBySlug = async (slug: string) => payload.find({
  collection: 'posts',
  where: { slug: { equals: slug } },
})

export async function loginAction(email: string, password: string) {
  try {
    const payload = await getPayload({ config })

    const result = await payload.login({
      collection: 'users',
      data: { email, password },
    })

    if (!result.token) {
      return { success: false, error: 'Неверный email или пароль' }
    }

    const cookieStore = await cookies()
    cookieStore.set('payload-token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: result.exp ? new Date(result.exp * 1000) : undefined,
    })

    return { success: true, user: result.user }
  } catch (err) {
    console.error('Login error:', err)
    return { success: false, error: 'Неверный email или пароль' }
  }
}
