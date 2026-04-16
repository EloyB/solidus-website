'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { NAV_ITEMS } from '../Component.client'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const pathname = usePathname()
  const hasNavItems = data?.navItems && data.navItems.length > 0

  const ctaLabel = data?.ctaLabel || 'Get in Touch'
  const ctaUrl = data?.ctaUrl || 'mailto:info@soliduscapital.org'

  const links = hasNavItems
    ? data.navItems!.map((item) => ({
        label: (item.link as { label?: string })?.label ?? '',
        href: (item.link as { url?: string })?.url ?? '/',
      }))
    : NAV_ITEMS.filter((i) => i.href !== '/contact')

  return (
    <>
      <nav className="flex items-center gap-6 text-[0.95rem] text-navy-soft">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={[
              'transition-colors duration-150',
              pathname === item.href ? 'text-navy font-medium' : 'text-navy/60 hover:text-navy',
            ].join(' ')}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <Link
        href={ctaUrl}
        className="inline-flex items-center justify-center rounded-full bg-gold text-navy text-sm font-semibold px-5 py-2.5 hover:brightness-105 transition-all duration-150 shadow-sm"
      >
        {ctaLabel}
      </Link>
    </>
  )
}
