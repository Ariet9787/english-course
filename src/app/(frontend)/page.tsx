import CompanyIntroSection from '@/components/home/company-intro-section'
import CoursesSection from '@/components/home/courses-section'
import { getCourses, getWebsiteInfo } from '@/lib/apiServices'

export default async function HomePage() {
  const webInfo = await getWebsiteInfo()
  const courses = await getCourses()

  return (
    <>
      <CompanyIntroSection company={webInfo} />
      <CoursesSection courses={courses.docs} />
    </>
  )
}
