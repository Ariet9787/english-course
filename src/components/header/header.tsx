import { Media } from '@/payload-types'
import HeaderClient from './headerClient'

export default async function Header({ logo }: { logo: Media }) {

  return (
    <header className="sticky top-0 z-50 border-b border-sky-200/60 bg-white/90 shadow-[0_6px_30px_rgba(38,104,139,0.08)] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <HeaderClient logo={logo} />
      </div>
    </header>
  )
}
