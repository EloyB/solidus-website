import { cn } from '@/utilities/ui'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  variant?: 'dark' | 'light'
}

export const Logo = ({ className, variant = 'dark' }: Props) => {
  return (
    <span
      className={cn(
        'font-display text-lg font-semibold tracking-[0.18em] uppercase select-none',
        variant === 'dark' ? 'text-navy' : 'text-white',
        className,
      )}
    >
      Solidus
    </span>
  )
}
