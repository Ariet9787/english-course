import { FaWhatsapp, FaPhone, FaLocationDot } from 'react-icons/fa6'

interface ContactsSectionProps {
  address: string
  whatsAppNumber: string
  phone: string
}

export default function ContactsSection({ address, whatsAppNumber, phone }: ContactsSectionProps) {
  const cleanWhatsApp = whatsAppNumber.replace(/\D/g, '')

  return (
    <section className="bg-slate-50 border-t border-slate-200/80 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-pink-500">Связь с нами</p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
          Наши контакты
        </h2>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

          <a
            href={`https://wa.me/${cleanWhatsApp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 rounded-lg border border-slate-200 bg-white p-3.5 transition hover:border-emerald-400 hover:bg-emerald-50/30"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-emerald-600">
              <FaWhatsapp className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500">WhatsApp</p>
              <p className="mt-0.5 truncate text-sm font-semibold text-slate-800">
                {whatsAppNumber}
              </p>
            </div>
          </a>


          <a
            href={`tel:${phone}`}
            className="flex items-center gap-3.5 rounded-lg border border-slate-200 bg-white p-3.5 transition hover:border-pink-300 hover:bg-pink-50/30"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-pink-100 text-pink-600">
              <FaPhone className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500">Телефон</p>
              <p className="mt-0.5 truncate text-sm font-semibold text-slate-800">{phone}</p>
            </div>
          </a>


          <div className="flex items-center gap-3.5 rounded-lg border border-slate-200 bg-white p-3.5 sm:col-span-2 lg:col-span-1">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-sky-100 text-sky-600">
              <FaLocationDot className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500">Адрес</p>
              <p className="mt-0.5 text-sm font-semibold text-slate-800">{address}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
