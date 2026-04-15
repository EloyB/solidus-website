import Link from 'next/link'
import React from 'react'

import type { Footer as FooterType } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Logo } from '@/components/Logo/Logo'
import { CMSLink } from '@/components/Link'

const FALLBACK_NAV = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Team', href: '/team' },
  { label: 'Contact', href: '/contact' },
]

export async function Footer() {
  const footerData: FooterType = await getCachedGlobal('footer', 1)()

  const description =
    footerData?.description ||
    'A private investment partnership deploying family capital in selected businesses, real estate, and financing.'
  const email = footerData?.contactEmail || 'info@soliduscapital.org'
  const navItems = footerData?.navItems || []

  return (
    <footer className="bg-navy border-t-2 border-gold">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-24">
          {/* Left */}
          <div>
            <Link href="/" aria-label="Solidus — Home">
              <Logo variant="light" />
            </Link>
            <p className="mt-4 text-sm text-white/35 leading-relaxed max-w-xs">{description}</p>
          </div>

          {/* Right */}
          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-4 font-sans">
                Contact
              </p>
              <div className="flex flex-col gap-2.5">
                <a
                  href={`mailto:${email}`}
                  className="text-sm text-white/45 hover:text-white transition-colors duration-150"
                >
                  {email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} Solidus Capital. All rights reserved.
          </p>
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/15">
            Gebouwd door{' '}
            <a
              href="https://studio-swyft.be"
              className="text-white/50 hover:text-white/70 transition-colors"
            >
              Studio Swyft
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
