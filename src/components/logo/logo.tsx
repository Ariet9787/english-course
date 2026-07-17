import Image from 'next/image'
import Link from 'next/link'
import { Media } from '@/payload-types'

interface LogoProps {
  image: Media
}
function Logo({ image }: LogoProps) {
  const { url, alt } = image || {}

  return (
    <Link className="group inline-flex shrink-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-400" href="/" aria-label="На главную">
      {url ? (
        <Image
          className="h-auto w-36 transition duration-200 group-hover:scale-[1.02] group-hover:opacity-90 sm:w-40 lg:w-44 motion-reduce:transition-none"
          alt={alt || 'logo'}
          src={url}
          width={220}
          height={108}
          priority
        />
      ) : (
        <span className="font-serif text-xl font-bold tracking-tight text-sky-700">English Course</span>
      )}
    </Link>
  )
}

export default Logo
