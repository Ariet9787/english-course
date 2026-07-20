import React from 'react'

import Link from 'next/link'

interface ComponentLinkProps {
  children: React.ReactNode
  to: string
}

export default function ComponentLink({ children, to }: ComponentLinkProps) {
  return (
    <Link className="text-[16px] font-semibold text-(--text) px-4 py-2 rounded-lg relative tracking-[0.01em] transition-(--transition)
      after:content-[''] after:absolute after:bottom-1 after:left-4 after:right-4 after:h-0.5
      after:bg-linear-to-r after:from-(--blue) after:to-(--pink) after:rounded-0.5
      after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-in-out
      hover:after:scale-x-100" href={to}>
      {children}
    </Link>
  )
}
