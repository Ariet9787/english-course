import CompanyIntroSection from '@/components/home/company-intro-section'
import ContactsSection from '@/components/home/contacts-section'
import CoursesSection from '@/components/home/courses-section'
import FeaturesSection from '@/components/home/features-section'
import PostsSection from '@/components/home/posts-section'
import { getAllPosts, getCourses, getFeatures, getRecentPosts, getWebsiteInfo } from '@/lib/apiServices'

export default async function HomePage() {
  const webInfo = await getWebsiteInfo()
  const courses = await getCourses()
  const features = await getFeatures()
  const posts = await getRecentPosts()
  return (
    <>
      <CompanyIntroSection company={webInfo} />
      <CoursesSection courses={courses.docs} whatsAppNumber={webInfo.WhatsApp} />
      <FeaturesSection features={features.docs} />
      <PostsSection posts={posts.docs} />
      <br className='h-1 bg-slate-800' />
      <ContactsSection address={webInfo.addres} whatsAppNumber={webInfo.WhatsApp} phone={webInfo.phone} />

    </>
  )
}
