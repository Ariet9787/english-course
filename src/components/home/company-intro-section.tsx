import { Media, WebsiteInfo } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

interface CompanyIntroSectionProps {
  company: WebsiteInfo
}

export default function CompanyIntroSection({ company }: CompanyIntroSectionProps) {
  const banner = typeof company.banner === 'object' ? (company.banner as Media) : null
  const features = company.features || []
// border-2 border-solid border-blue-200
  return (
    <section className="relative isolate overflow-hidden bg-linear-to-br from-sky-50 via-white to-pink-50 px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24 ">
      <div className="absolute -left-28 top-10 -z-10 size-72 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="absolute -right-20 top-1/3 -z-10 size-80 rounded-full bg-pink-200/35 blur-3xl" />
      <div className="absolute bottom-0 left-1/2 -z-10 size-56 -translate-x-1/2 rounded-full bg-amber-100/70 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/80 px-4 py-2 text-sm font-bold tracking-wide text-pink-500 shadow-sm">
            <span className="size-2 rounded-full bg-amber-300" />
            ОБУЧАЕМ С ЗАБОТОЙ
          </p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-800 sm:text-5xl lg:text-6xl">
            Английский, который
            <span className="block bg-linear-to-r from-sky-500 via-pink-400 to-amber-400 bg-clip-text text-transparent"> открывает возможности</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            {company.describe || 'Помогаем детям и взрослым уверенно говорить по-английски, достигать целей и получать удовольствие от обучения.'}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/courses" className="rounded-xl bg-sky-500 px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_22px_rgba(14,165,233,0.25)] transition hover:-translate-y-0.5 hover:bg-sky-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 motion-reduce:transition-none">Смотреть курсы</Link>
            <Link href="/about" className="rounded-xl border border-pink-200 bg-white/80 px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-pink-300 hover:bg-pink-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400 motion-reduce:transition-none">Узнать о нас</Link>
          </div>

        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-4 -z-10 rotate-3 rounded-4xl bg-linear-to-br from-sky-200 via-pink-100 to-amber-100" />
          <div className="relative overflow-hidden rounded-[1.75rem] border-[6px] border-white bg-sky-100 shadow-[0_24px_60px_rgba(50,105,135,0.18)]">
            {banner?.url ? (
              <Image src={banner.url} alt={banner.alt || `Занятия в ${company.name}`} width={900} height={700} priority className="aspect-4/3 w-full object-cover" />
            ) : (
              <div className="flex aspect-4/3 items-center justify-center bg-linear-to-br from-sky-200 via-pink-100 to-amber-100 p-8 text-center text-2xl font-bold text-sky-700">Учимся, общаемся, растём вместе</div>
            )}
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 p-4 shadow-lg backdrop-blur sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-xs">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-pink-500">{company.name}</p>
              <p className="mt-1 font-semibold text-slate-700">Современное обучение в дружеской атмосфере</p>
            </div>
          </div>
          <div className="absolute -right-3 -top-4 grid size-16 place-items-center rounded-2xl bg-amber-200 text-xl shadow-lg sm:size-20 sm:text-2xl">★</div>
        </div>
      </div>


    </section>
  )
}
