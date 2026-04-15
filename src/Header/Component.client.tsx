'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const ctaLabel = data?.ctaLabel || 'Get in Touch'
  const ctaUrl = data?.ctaUrl || 'mailto:info@soliduscapital.org'

  const hasNavItems = data?.navItems && data.navItems.length > 0
  const mobileLinks = hasNavItems
    ? data.navItems!.map((item) => ({
        label: (item.link as { label?: string })?.label ?? '',
        href: (item.link as { url?: string })?.url ?? '/',
      }))
    : NAV_ITEMS

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/92 backdrop-blur-md border-b border-gold/25">
        <div className="max-w-[1180px] mx-auto px-5">
          <div className="flex items-center justify-between min-h-[80px] lg:min-h-[100px] gap-5">
            <Link
              href="/"
              aria-label="Solidus Capital home"
              className="flex items-center gap-3.5 shrink-0"
            >
              <Logo />
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
              <HeaderNav data={data} />
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span
                className={[
                  'block h-px bg-navy transition-all duration-200',
                  mobileOpen ? 'w-5 translate-y-[7px] rotate-45 origin-center' : 'w-5',
                ].join(' ')}
              />
              <span
                className={[
                  'block h-px bg-navy transition-all duration-200',
                  mobileOpen ? 'w-0 opacity-0' : 'w-4',
                ].join(' ')}
              />
              <span
                className={[
                  'block h-px bg-navy transition-all duration-200',
                  mobileOpen ? 'w-5 -translate-y-[7px] -rotate-45 origin-center' : 'w-5',
                ].join(' ')}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={[
          'fixed top-[80px] left-0 right-0 z-40 bg-white border-b border-gray-200 overflow-hidden transition-all duration-200 md:hidden',
          mobileOpen ? 'max-h-72' : 'max-h-0',
        ].join(' ')}
      >
        <nav className="max-w-[1180px] mx-auto px-5 py-5 flex flex-col gap-4">
          {mobileLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-navy/70 hover:text-navy transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100">
            <Link
              href={ctaUrl}
              className="inline-flex items-center justify-center rounded-full bg-gold text-navy text-sm font-semibold px-5 py-2.5 hover:brightness-105 transition-all"
            >
              {ctaLabel}
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}

export const NAV_ITEMS = [
  // { label: 'About', href: '/about' },
  // { label: 'Focus', href: '/focus' },
  // { label: 'Investments', href: '/investments' },
  // { label: 'Opportunities', href: '/opportunities' },
  { label: 'Contact', href: '/contact' },
]
