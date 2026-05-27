import { getPayloadClient } from './apiClient'

const payload = await getPayloadClient()

export const getWebsiteInfo = async () => payload.findGlobal({ slug: 'website-info' })

export const getAboutUs = async () => payload.findGlobal({ slug: 'about-us' })

export const getPosts = async () => payload.find({ collection: 'posts' })

export const getSocials = async () =>
  payload.find({
    collection: 'socials',
  })

export const getById = async ({ collection, id }) => payload.findByID({ collection, id })
