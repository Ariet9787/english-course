import { Feature, Media } from '@/payload-types'
import Image from 'next/image'

interface FeaturesSectionProps {
  features: Feature[]
}

export default function FeaturesSection({ features }: FeaturesSectionProps) {
  if (features.length === 0) return null

  return (
    <section className="bg-linear-to-br from-amber-50 via-white to-sky-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-pink-500">О нас</p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
          Наши особенности
        </h2>


        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature }: { feature: Feature }) {
  const icon = typeof feature.icon === 'object' ? (feature.icon as Media) : null

  return (
    <article className="group overflow-hidden rounded-lg border border-slate-200 bg-white hover:border-pink-300">
      {icon?.url && (
        <div className="relative h-28 w-full bg-slate-100">
          <Image
            src={icon.url}
            alt={icon.alt || feature.title}
            fill
            className="object-cover object-center"
          />
        </div>
      )}
      <div className="p-3.5">
        <h3 className="text-base font-semibold text-pink-600 line-clamp-1">{feature.title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-slate-600 line-clamp-3">
          {feature.description}
        </p>
      </div>
    </article>
  )
}
