import React from 'react'
import './link.css'
import Link from 'next/link'

interface ComponentLinkProps {
  children: React.ReactNode
  to: string
}

export default function ComponentLink({ children, to }: ComponentLinkProps) {
  return (
    <Link className="link-component" href={to}>
      {children}
    </Link>
  )
}
