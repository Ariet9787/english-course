  import { getAboutUs } from '@/lib/apiServices'
  import Container from '@/components/container/container'
  import { Media } from '@/payload-types'
  import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'

  export default async function AboutPage() {
    const aboutUsData = await getAboutUs()
    const banner = typeof aboutUsData.banner === 'object' ? (aboutUsData.banner as Media) : null

    return (
      <div>
        <div className="relative h-screen w-full overflow-hidden">
            {banner?.url && <img src={banner.url} alt={banner.alt || aboutUsData.title} className="absolute inset-0 size-full object-cover object-center" />}
          <div className="absolute inset-x-0 bottom-5 border-y border-white/30 bg-slate-900/25 px-4 py-8 text-center backdrop-blur-md sm:py-12">
            <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl lg:text-6xl">{aboutUsData.title}</h1>
          </div>
        </div>
        <Container>



          <div className="richtext">
            <RichTextConverter data={aboutUsData.description} />
          </div>

        </Container>
      </div>
    )
  }
