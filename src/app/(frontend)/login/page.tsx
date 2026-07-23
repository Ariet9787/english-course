'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { loginAction } from '@/lib/apiServices'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const result = await loginAction(email, password)

      if (!result.success) {
        setError(result.error ?? 'Не удалось войти')
        return
      }

      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      console.error(err)
      setError('Что-то пошло не так. Попробуйте снова.')
    } finally {
      setIsLoading(false)
    }
  }
  const [skyGradient, setSkyGradient] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 12) {
      setSkyGradient('from-amber-100 via-sky-200 to-sky-300');
    } else if (hour >= 12 && hour < 18) {

      setSkyGradient('from-sky-300 via-sky-200 to-sky-100');
    } else if (hour >= 18 && hour < 22) {

      setSkyGradient('from-indigo-900 via-purple-800 to-amber-600');
    } else {

      setSkyGradient('from-slate-950 via-slate-900 to-indigo-950');
    }
  }, []);

  return (
    <div className={`flex min-h-screen w-full items-center justify-center bg-linear-to-b ${skyGradient} px-4 transition-colors duration-1000`}>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-2xl border border-white/20 bg-white/90 p-8 shadow-2xl backdrop-blur-md"
      >
        <h1 className="text-2xl font-bold text-slate-800">Вход для студентов</h1>

        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-semibold text-slate-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl border border-sky-200 px-4 py-2.5 text-slate-800 outline-none transition focus:border-sky-400 bg-white"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-semibold text-slate-700">
            Пароль
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-xl border border-sky-200 px-4 py-2.5 text-slate-800 outline-none transition focus:border-sky-400 bg-white"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-sky-600 px-4 py-3 font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Вход...' : 'Войти'}
        </button>
      </form>
    </div>
  )
}
