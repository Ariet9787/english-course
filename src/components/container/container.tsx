import React from 'react'

interface ContainerProps {
  children: React.ReactNode
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="mx-auto my-0 max-w-7xl px-4">
      {children}
    </div>
  )
}
