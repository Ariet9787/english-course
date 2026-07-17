import React from 'react'

import Link from 'next/link'

interface ComponentLinkProps {
  children: React.ReactNode
  to: string
}

export default function ComponentLink({ children, to }: ComponentLinkProps) {
  return (
    <Link className="text-[16px] font-semibold text-[var(--text)] px-4 py-2 rounded-lg relative tracking-[0.01em] transition-[var(--transition)]
      after:content-[''] after:absolute after:bottom-1 after:left-4 after:right-4 after:h-[2px]
      after:bg-gradient-to-r after:from-[var(--blue)] after:to-[var(--pink)] after:rounded-[2px]
      after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.4,0,0.2,1)]
      hover:after:scale-x-100" href={to}>
      {children}
    </Link>
  )
}
