'use client'

import { RxCross1, RxHamburgerMenu } from 'react-icons/rx'
import { useEffect, useState } from 'react'
import { Media } from '@/payload-types'
import Link from 'next/link'
import Logo from '../logo/logo'

interface HeaderClientProps {
  logo: Media
}

export default function HeaderClient({ logo }: HeaderClientProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const navigation = [
    { href: '/', label: 'Главная' },
    { href: '/about', label: 'О нас' },
    { href: '/courses', label: 'Курсы' },
    { href: '/news', label: 'Новости' },
    { href: '/contacts', label: 'Контакты' },
  ]

  return (
    <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
      <div className="flex w-full items-center justify-between lg:w-auto">
        <Logo image={logo} />
        <button
          className="grid size-11 place-items-center rounded-xl border border-sky-200 bg-sky-50 text-slate-800 transition duration-200 hover:border-pink-200 hover:bg-pink-50 hover:text-pink-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 lg:hidden motion-reduce:transition-none"
          type="button"
          aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <RxCross1 className="size-5" aria-hidden="true" /> : <RxHamburgerMenu className="size-6" aria-hidden="true" />}
        </button>
      </div>

      <nav
        id="primary-navigation"
        className={`grid w-full transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none lg:w-auto lg:opacity-100 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 lg:grid-rows-[1fr]'}`}
        aria-label="Основная навигация"
      >
        <ul className="flex min-h-0 flex-col overflow-hidden border-t border-sky-100 pt-3 lg:flex-row lg:items-center lg:gap-1 lg:overflow-visible lg:border-0 lg:pt-0">
          {navigation.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setIsOpen(false)}
                className="group relative block rounded-xl px-4 py-3 text-[15px] font-semibold tracking-wide text-slate-700 transition-colors duration-200 hover:bg-sky-50 hover:text-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400 motion-reduce:transition-none lg:py-2"
              >
                {label}
                <span className="absolute inset-x-4 bottom-1 h-0.5 origin-left scale-x-0 rounded-full bg-linear-to-r from-sky-400 via-pink-300 to-amber-300 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
