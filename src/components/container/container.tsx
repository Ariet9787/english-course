import React from 'react'
import './container-style.css'

interface ContainerProps {
  children: React.ReactNode
}

export default function Container({ children }: ContainerProps) {
  return <div className="container">{children}</div>
}
