import CompanyIntroSection from '@/components/home/company-intro-section'
import { getWebsiteInfo } from '@/lib/apiServices'

export default async function HomePage() {
  const webInfo = await getWebsiteInfo()

  return <CompanyIntroSection company={webInfo} />
}
