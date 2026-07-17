import { getWebsiteInfo } from '@/lib/apiServices'

export default async function HomePage() {
  const webInfo = await getWebsiteInfo()
  return <></>
}
