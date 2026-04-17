import type { Metadata } from 'next'
import type { HomePage } from '@/payload-types'
import Link from 'next/link'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getCachedGlobal } from '@/utilities/getGlobals'

// ─── Data fetching ───────────────────────────────────────────────────────────

async function getHomePageData(): Promise<HomePage> {
  const homePage = await getCachedGlobal('home-page', 1)()
  return homePage as HomePage
}

async function getInvestments() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'investments',
    sort: 'sortOrder',
    limit: 20,
    draft: false,
  })
  return result.docs
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomePageData()
  return {
    title:
      (data?.metaTitle as string) ||
      'Solidus Capital — Entrepreneurial Capital. Long-Term Commitment.',
    description:
      (data?.metaDescription as string) ||
      'Solidus Capital is a small group of experienced entrepreneurs investing family capital across selected industries, technology, real estate, and development projects.',
  }
}

// ─── Shared ───────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-gold font-bold tracking-[0.08em] uppercase text-[0.82rem] mb-2.5">
      {children}
    </p>
  )
}

function SectionHeader({
  label,
  title,
  description,
  className = '',
}: {
  label: string
  title: string
  description?: string
  className?: string
}) {
  return (
    <div className={['max-w-[760px] mb-9', className].join(' ')}>
      <SectionLabel>{label}</SectionLabel>
      <h2 className="font-display font-semibold text-[clamp(1.9rem,3vw,3rem)] text-navy leading-[1.1] tracking-[-0.03em] mb-3.5">
        {title}
      </h2>
      {description && <p className="text-brand-muted text-[1.04rem]">{description}</p>}
    </div>
  )
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <article
      className={[
        'bg-white border border-gray-200 rounded-2xl p-7',
        'shadow-[0_8px_22px_rgba(15,31,58,0.04)]',
        className,
      ].join(' ')}
    >
      {children}
    </article>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero({ data }: { data: HomePage }) {
  const tagline = data.tagline || 'Entrepreneurial capital · Long-term commitment'
  const headline = data.headline || 'Invest. Build. Realize.'
  const description =
    data.description ||
    'We invest in businesses and projects we understand — actively, responsibly, and with a long-term perspective. Solidus Capital is a small group of experienced entrepreneurs investing family capital across selected industries, technology, real estate, and development projects.'
  const sidecardHeading = data.sidecardHeading || 'How we invest'
  const sidecardDescription =
    data.sidecardDescription ||
    'We are not a private equity firm. We prefer direct involvement, transparent partnerships, and sustainable growth. We invest our own capital and remain engaged beyond the investment.'
  const bullets =
    data.sidecardBullets && data.sidecardBullets.length > 0
      ? data.sidecardBullets
      : [
          { text: 'Own capital, not third-party funds' },
          { text: 'Selective investing in sectors we understand' },
          { text: 'Active long-term involvement where we can add value' },
        ]

  return (
    <section
      className="text-white py-24 lg:py-28"
      style={{
        background:
          'linear-gradient(180deg, rgba(15,31,58,0.92), rgba(15,31,58,0.85)), radial-gradient(circle at top right, rgba(198,169,106,0.18), transparent 34%), #0f1f3a',
      }}
    >
      <div className="max-w-[1180px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.9fr] gap-10 items-center">
          {/* Left */}
          <div style={{ animation: 'fadeUp 0.7s ease both', animationDelay: '0.05s' }}>
            <span className="inline-block mb-5 px-3 py-1.5 border border-white/18 rounded-full text-white/86 text-[0.82rem] tracking-[0.08em] uppercase">
              {tagline}
            </span>
            <h1 className="font-display font-semibold text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.04em] max-w-[11ch] mb-5">
              {headline}
            </h1>
            <p className="text-white/86 text-[1.08rem] max-w-[670px] mb-7 leading-relaxed">
              {description}
            </p>
            <div className="flex flex-wrap gap-3.5 mt-7">
              <Link
                href="#investments"
                className="inline-flex items-center justify-center min-h-12 px-6 rounded-full bg-gold text-navy font-semibold text-sm hover:-translate-y-px hover:brightness-105 transition-all duration-200 shadow-[0_10px_30px_rgba(15,31,58,0.08)]"
              >
                Our Investments
              </Link>
              <Link
                href="mailto:info@soliduscapital.org"
                className="inline-flex items-center justify-center min-h-12 px-6 rounded-full border border-white/24 text-white font-medium text-sm hover:border-white/50 transition-all duration-200"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          {/* Right — hero card */}
          <aside
            className="rounded-3xl p-8 shadow-[0_10px_30px_rgba(15,31,58,0.08)]"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              animation: 'fadeUp 0.7s ease both',
              animationDelay: '0.2s',
            }}
          >
            <h3 className="text-white font-display font-semibold text-[1.1rem] mb-3">
              {sidecardHeading}
            </h3>
            <p className="text-white/75 text-[0.98rem] leading-relaxed mb-6">
              {sidecardDescription}
            </p>
            <ul className="flex flex-col gap-3">
              {bullets.map((point, i) => (
                <li key={i} className="flex gap-2.5 items-start text-white/88 text-[0.95rem]">
                  <span className="text-gold font-black mt-0.5">•</span>
                  {point.text}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────

function About({ data }: { data: HomePage }) {
  const label = data.aboutLabel || 'About'
  const heading = data.aboutHeading || 'A focused entrepreneurial investor'
  const description =
    data.aboutDescription ||
    'Solidus Capital was founded by a group of entrepreneurs with experience across industry, technology, and real estate. We invest our own capital in opportunities where we can make a meaningful contribution — strategically, operationally, and over the long term.'
  const cards = data.aboutCards?.length
    ? data.aboutCards
    : [
        {
          title: 'Who we are',
          description:
            'We are a small team of experienced entrepreneurs from different industries and markets. Because we invest our own capital rather than third-party funds, we can take a long-term view and focus on opportunities where we can truly add value.',
        },
        {
          title: 'What makes us different',
          description:
            'We are not a fund. We are not driven by fixed holding periods or predetermined exit schedules. We prefer direct involvement, practical execution, and lasting partnerships built on trust, alignment, and disciplined growth.',
        },
      ]

  return (
    <section className="py-[84px] bg-white">
      <div className="max-w-[1180px] mx-auto px-5">
        <SectionHeader label={label} title={heading} description={description} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <Card key={i}>
              <h3 className="font-display font-semibold text-navy text-[1.15rem] mb-2.5">
                {card.title}
              </h3>
              <p className="text-brand-muted leading-relaxed">{card.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Focus ────────────────────────────────────────────────────────────────────

function Focus({ data }: { data: HomePage }) {
  const label = data.focusLabel || 'Investment focus'
  const heading = data.focusHeading || 'Selected sectors and situations'
  const description =
    data.focusDescription ||
    'We focus on opportunities where capital, experience, and steady involvement can create durable value.'
  const areas = data.focusAreas?.length
    ? data.focusAreas
    : [
        {
          title: 'Industrial businesses',
          description:
            'Companies with strong operational foundations, clear products, and room for structured growth.',
        },
        {
          title: 'Technology & software',
          description:
            'Scalable solutions with a defined market need, understandable business models, and recurring revenue potential.',
        },
        {
          title: 'Real estate & development',
          description:
            'Co-investments in residential and sustainable commercial projects in selected locations where experience and discipline matter.',
        },
        {
          title: 'Special situations',
          description:
            'Selective opportunities where flexibility, operational support, and speed of decision-making create advantage.',
        },
      ]

  return (
    <section id="investments" className="py-[84px] bg-off-white">
      <div className="max-w-[1180px] mx-auto px-5">
        <SectionHeader label={label} title={heading} description={description} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {areas.map((area, i) => (
            <Card key={i}>
              <h3 className="font-display font-semibold text-navy text-[1.15rem] mb-2.5">
                {area.title}
              </h3>
              <p className="text-brand-muted leading-relaxed">{area.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Investments ──────────────────────────────────────────────────────────────

interface InvestmentDoc {
  name: string
  location: string
  description: string
  link?: string | null
}

function InvestmentsSection({ investments }: { investments: InvestmentDoc[] }) {
  return (
    <section className="py-[84px] bg-white">
      <div className="max-w-[1180px] mx-auto px-5">
        <SectionHeader
          label="Investments"
          title="A portfolio built around understanding and engagement"
          description="Our portfolio reflects our focus on industry, technology, and real estate. We back opportunities where we can combine capital with experience and long-term commitment."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {investments.map((inv, i) => {
            const cardContent = (
              <Card key={i} className={`flex flex-col gap-4${inv.link ? ' transition-shadow hover:shadow-md' : ''}`}>
                <span className="text-gold font-bold tracking-[0.05em] uppercase text-[0.86rem]">
                  {inv.location}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-navy text-[1.15rem] mb-1.5">
                    {inv.name}
                  </h3>
                  <p className="text-brand-muted leading-relaxed">{inv.description}</p>
                </div>
              </Card>
            )
            return inv.link ? (
              <a key={i} href={inv.link} target="_blank" rel="noopener noreferrer">
                {cardContent}
              </a>
            ) : (
              cardContent
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Philosophy ───────────────────────────────────────────────────────────────

function Philosophy({ data }: { data: HomePage }) {
  const label = data.philosophyLabel || 'Philosophy'
  const heading = data.philosophyHeading || 'How we work'
  const description =
    data.philosophyDescription ||
    'We invest with discipline, stay close where we can contribute, and focus on resilient value creation rather than financial engineering.'
  const principles = data.principles?.length
    ? data.principles
    : [
        { text: 'We invest our own capital.' },
        { text: 'We take a long-term perspective.' },
        { text: 'We stay involved where we can add value.' },
        { text: 'We work with people we trust.' },
        { text: 'We focus on sectors and situations we understand.' },
      ]
  const ctaHeading = data.ctaHeading || 'Interested in speaking with us?'
  const ctaDescription =
    data.ctaDescription ||
    'We are always open to carefully selected opportunities and partnerships that fit our profile.'

  return (
    <section className="py-[84px] bg-off-white">
      <div className="max-w-[1180px] mx-auto px-5">
        <SectionHeader label={label} title={heading} description={description} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Principles */}
          <Card>
            <h3 className="font-display font-semibold text-navy text-[1.15rem] mb-5">
              Our principles
            </h3>
            <ul className="flex flex-col gap-3.5">
              {principles.map((p, i) => (
                <li
                  key={i}
                  className="px-4 py-3.5 border border-gray-200 rounded-2xl text-navy-soft font-medium text-sm"
                >
                  {p.text}
                </li>
              ))}
            </ul>
          </Card>

          {/* CTA band */}
          <div
            className="rounded-3xl p-11 text-white flex flex-col justify-between shadow-[0_10px_30px_rgba(15,31,58,0.08)]"
            style={{
              background: 'linear-gradient(135deg, #0f1f3a, #1d2f52)',
            }}
          >
            <div>
              <h3 className="font-display font-semibold text-[1.7rem] mb-2.5">{ctaHeading}</h3>
              <p className="text-white/82 leading-relaxed mb-6">{ctaDescription}</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center min-h-12 px-6 rounded-full bg-gold text-navy font-semibold text-sm hover:-translate-y-px hover:brightness-105 transition-all duration-200 self-start"
            >
              Contact Solidus Capital
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Opportunities ────────────────────────────────────────────────────────────

function Opportunities({ data }: { data: HomePage }) {
  const label = data.opportunitiesLabel || 'Opportunities'
  const heading = data.opportunitiesHeading || 'Situations we are interested in'
  const description =
    data.opportunitiesDescription ||
    'We are interested in selected opportunities where long-term capital and active entrepreneurial support can make a difference.'
  const types = data.opportunityTypes?.length
    ? data.opportunityTypes
    : [
        {
          title: 'Owner-managed businesses',
          description: 'Businesses seeking continuity, growth, partnership, or succession.',
        },
        {
          title: 'Companies in transition',
          description:
            'Situations involving restructuring, repositioning, or operational improvement.',
        },
        {
          title: 'Real estate projects',
          description:
            'Development opportunities in defined markets where experience and discipline matter.',
        },
        {
          title: 'Strategic partnerships',
          description: 'Opportunities where trust, speed, and alignment are essential.',
        },
      ]

  return (
    <section className="py-[84px] bg-white">
      <div className="max-w-[1180px] mx-auto px-5">
        <SectionHeader label={label} title={heading} description={description} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {types.map((opp, i) => (
            <Card key={i}>
              <h3 className="font-display font-semibold text-navy text-[1.15rem] mb-2.5">
                {opp.title}
              </h3>
              <p className="text-brand-muted leading-relaxed">{opp.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function ContactSection({ data }: { data: HomePage }) {
  const label = data.contactLabel || 'Contact'
  const heading = data.contactHeading || "Let's connect"
  const description =
    data.contactDescription ||
    'For investment opportunities, partnerships, or general enquiries, please contact us directly.'
  const email = data.contactEmail || 'info@soliduscapital.org'
  const region = data.contactRegion || 'Belgium / Netherlands'
  const partnershipTitle = data.partnershipTitle || 'Partnership mindset'
  const partnershipDescription =
    data.partnershipDescription ||
    'We believe in direct communication, thoughtful decision-making, and long-term collaboration. If your opportunity fits our profile, we would be pleased to hear from you.'

  return (
    <section className="py-[84px] bg-off-white">
      <div className="max-w-[1180px] mx-auto px-5">
        <SectionHeader label={label} title={heading} description={description} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact details */}
          <div className="flex flex-col gap-4">
            <div className="px-5 py-4.5 border border-gray-200 rounded-2xl bg-white shadow-[0_8px_22px_rgba(15,31,58,0.04)]">
              <strong className="block text-navy font-semibold mb-1.5">Email</strong>
              <a
                href={`mailto:${email}`}
                className="text-brand-muted hover:text-gold transition-colors"
              >
                {email}
              </a>
            </div>
            <div className="px-5 py-4.5 border border-gray-200 rounded-2xl bg-white shadow-[0_8px_22px_rgba(15,31,58,0.04)]">
              <strong className="block text-navy font-semibold mb-1.5">Region</strong>
              <span className="text-brand-muted">{region}</span>
            </div>
          </div>

          {/* Partnership card */}
          <Card>
            <h3 className="font-display font-semibold text-navy text-[1.15rem] mb-2.5">
              {partnershipTitle}
            </h3>
            <p className="text-brand-muted leading-relaxed">{partnershipDescription}</p>
          </Card>
        </div>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePageRoute() {
  const [data, investments] = await Promise.all([getHomePageData(), getInvestments()])

  // Fallback investments if none exist in CMS yet
  const investmentDocs = investments.length
    ? investments
    : [
        {
          name: 'LCT-Textilligence B.V.',
          location: 'Tiel, Netherlands',
          description: 'Automated garment dispensing systems for healthcare and industrial users.',
        },
        {
          name: 'GotliLabs B.V.',
          location: 'Boxtel, Netherlands',
          description:
            'Software solutions that support performance improvement in industrial laundries.',
        },
        {
          name: 'Sceatta B.V.',
          location: 'Ravels, Belgium',
          description: 'Real estate investments and short-term business financing solutions.',
        },
        {
          name: 'Project Development Hasselt',
          location: 'Hasselt, Belgium',
          description: 'Selected residential or mixed-use development activity.',
        },
        {
          name: 'Project Development Antwerp',
          location: 'Antwerp, Belgium',
          description: 'Urban real estate development in a strategic location.',
        },
      ]

  return (
    <main>
      <Hero data={data} />
      <About data={data} />
      <Focus data={data} />
      <InvestmentsSection investments={investmentDocs} />
      <Philosophy data={data} />
      <Opportunities data={data} />
      <ContactSection data={data} />
    </main>
  )
}
