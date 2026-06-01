import { getWebsiteInfo } from '@/lib/apiServices'
import './styles.css'

export default async function HomePage() {
  const webInfo = await getWebsiteInfo()
  return <></>
}
