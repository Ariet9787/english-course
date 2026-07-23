'use client'
import { RxCross1, RxHamburgerMenu, RxChevronDown } from 'react-icons/rx'
import { useEffect, useRef, useState } from 'react'
import { Media, User } from '@/payload-types'
import Link from 'next/link'
import Logo from '../logo/logo'

interface HeaderClientProps {
  logo: Media
}

export default function HeaderClient({ logo }: HeaderClientProps) {

  const [isOpen, setIsOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [authChecked, setAuthChecked] = useState(false)
  const loginRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/users/me', {
          credentials: 'include',
        })
        const data = await res.json()
        setUser(data?.user ?? null)
      } catch {
        setUser(null)
      } finally {
        setAuthChecked(true)
      }
    }
    checkAuth()
  }, [])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        setIsLoginOpen(false)
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (loginRef.current && !loginRef.current.contains(event.target as Node)) {
        setIsLoginOpen(false)
      }
    }
    document.addEventListener('mousedown', closeOnOutsideClick)
    return () => document.removeEventListener('mousedown', closeOnOutsideClick)
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      })
    } finally {
      setUser(null)
      setIsLoginOpen(false)
      setIsOpen(false)
      window.location.href = '/'
    }
  }

  const navigation = [
    { href: '/', label: 'Главная' },
    { href: '/about', label: 'О нас' },
    { href: '/courses', label: 'Курсы' },
    { href: '/news', label: 'Новости' },
    { href: '/contacts', label: 'Контакты' },
  ]

  const loginLinks = [
    { href: '/login', label: 'Вход для студентов' },
    { href: '/admin', label: 'Вход для учителей' },
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

          {authChecked && user ? (
            <>
              <li>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="group relative block rounded-xl px-4 py-3 text-[15px] font-semibold tracking-wide text-slate-700 transition-colors duration-200 hover:bg-sky-50 hover:text-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400 motion-reduce:transition-none lg:py-2"
                >
                  Личный кабинет
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="block w-full rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-left text-[15px] font-semibold tracking-wide text-slate-800 transition-colors duration-200 hover:border-pink-200 hover:bg-pink-50 hover:text-pink-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400 motion-reduce:transition-none lg:ml-2 lg:w-auto lg:py-2"
                >
                  Выход
                </button>
              </li>
            </>
          ) : (
            <li ref={loginRef} className="relative lg:ml-2">
              <button
                type="button"
                onClick={() => setIsLoginOpen((open) => !open)}
                aria-haspopup="true"
                aria-expanded={isLoginOpen}
                aria-controls="login-menu"
                className="flex w-full items-center justify-between gap-2 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-[15px] font-semibold tracking-wide text-slate-800 transition-colors duration-200 hover:border-pink-200 hover:bg-pink-50 hover:text-pink-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400 motion-reduce:transition-none lg:w-auto lg:py-2"
              >
                Вход
                <RxChevronDown
                  className={`size-4 transition-transform duration-200 ${isLoginOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>

              <ul
                id="login-menu"
                role="menu"
                className={`mt-2 flex flex-col gap-1 rounded-xl border border-sky-100 bg-white p-2 shadow-lg shadow-sky-100/50 transition-[grid-template-rows,opacity] duration-200 ease-out lg:absolute lg:right-0 lg:z-20 lg:mt-2 lg:min-w-56 ${
                  isLoginOpen ? 'block opacity-100' : 'hidden opacity-0 lg:hidden'
                }`}
              >
                {loginLinks.map(({ href, label }) => (
                  <li key={href} role="none">
                    <Link
                      href={href}
                      role="menuitem"
                      onClick={() => {
                        setIsLoginOpen(false)
                        setIsOpen(false)
                      }}
                      className="block rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-sky-50 hover:text-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400 motion-reduce:transition-none"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          )}
        </ul>
      </nav>
    </div>
  )
}
