import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { linkGroup } from '@/fields/linkGroup'
import { revalidateHomePage } from './hooks/revalidateHomePage'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home Page',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'tagline',
              type: 'text',
              label: 'Tagline',
            },
            {
              name: 'headline',
              type: 'text',
              label: 'Headline',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
            },
            linkGroup({
              appearances: ['default', 'outline'],
              overrides: { maxRows: 2 },
            }),
            {
              name: 'sidecardHeading',
              type: 'text',
              label: 'Side Card Heading',
            },
            {
              name: 'sidecardDescription',
              type: 'textarea',
              label: 'Side Card Description',
            },
            {
              name: 'sidecardBullets',
              type: 'array',
              label: 'Side Card Bullet Points',
              maxRows: 6,
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'About',
          fields: [
            {
              name: 'aboutLabel',
              type: 'text',
              label: 'Section Label',
            },
            {
              name: 'aboutHeading',
              type: 'text',
              label: 'Heading',
            },
            {
              name: 'aboutDescription',
              type: 'textarea',
              label: 'Description',
            },
            {
              name: 'aboutCards',
              type: 'array',
              label: 'Cards',
              maxRows: 4,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Focus',
          fields: [
            {
              name: 'focusLabel',
              type: 'text',
              label: 'Section Label',
            },
            {
              name: 'focusHeading',
              type: 'text',
              label: 'Heading',
            },
            {
              name: 'focusDescription',
              type: 'textarea',
              label: 'Description',
            },
            {
              name: 'focusAreas',
              type: 'array',
              label: 'Focus Areas',
              maxRows: 8,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Philosophy',
          fields: [
            {
              name: 'philosophyLabel',
              type: 'text',
              label: 'Section Label',
            },
            {
              name: 'philosophyHeading',
              type: 'text',
              label: 'Heading',
            },
            {
              name: 'philosophyDescription',
              type: 'textarea',
              label: 'Description',
            },
            {
              name: 'principles',
              type: 'array',
              label: 'Principles',
              maxRows: 10,
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'ctaHeading',
              type: 'text',
              label: 'CTA Heading',
            },
            {
              name: 'ctaDescription',
              type: 'textarea',
              label: 'CTA Description',
            },
            link({
              overrides: { name: 'ctaLink' },
            }),
          ],
        },
        {
          label: 'Opportunities',
          fields: [
            {
              name: 'opportunitiesLabel',
              type: 'text',
              label: 'Section Label',
            },
            {
              name: 'opportunitiesHeading',
              type: 'text',
              label: 'Heading',
            },
            {
              name: 'opportunitiesDescription',
              type: 'textarea',
              label: 'Description',
            },
            {
              name: 'opportunityTypes',
              type: 'array',
              label: 'Opportunity Types',
              maxRows: 8,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'contactLabel',
              type: 'text',
              label: 'Section Label',
            },
            {
              name: 'contactHeading',
              type: 'text',
              label: 'Heading',
            },
            {
              name: 'contactDescription',
              type: 'textarea',
              label: 'Description',
            },
            {
              name: 'contactEmail',
              type: 'text',
              label: 'Email Address',
            },
            {
              name: 'contactRegion',
              type: 'text',
              label: 'Region',
            },
            {
              name: 'partnershipTitle',
              type: 'text',
              label: 'Partnership Card Title',
            },
            {
              name: 'partnershipDescription',
              type: 'textarea',
              label: 'Partnership Card Description',
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHomePage],
  },
}
