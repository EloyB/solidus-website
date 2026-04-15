import { cn } from '@/utilities/ui'
import Image from 'next/image'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  variant?: 'dark' | 'light'
}

export const Logo = ({ className, loading = 'eager', priority = 'high' }: Props) => {
  return (
    <Image
      src="/solidus-logo.svg"
      alt="Solidus"
      width={140}
      height={40}
      loading={loading}
      priority={priority === 'high'}
      className={cn('h-14 w-auto', className)}
    />
  )
}
