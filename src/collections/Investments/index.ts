import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from 'payload'

export const Investments: CollectionConfig<'investments'> = {
  slug: 'investments',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'sector', 'status', 'sortOrder', 'updatedAt'],
    useAsTitle: 'name',
  },
  defaultPopulate: {
    name: true,
    slug: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Company Name',
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      label: 'Location',
    },
    {
      name: 'sector',
      type: 'select',
      required: true,
      options: [
        { label: 'Industrial', value: 'industrial' },
        { label: 'Technology', value: 'technology' },
        { label: 'Real Estate', value: 'real-estate' },
        { label: 'Special Situations', value: 'special-situations' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'investmentStatus',
      type: 'select',
      label: 'Status',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Exited', value: 'exited' },
        { label: 'In Development', value: 'in-development' },
      ],
    },
    {
      name: 'link',
      type: 'text',
      label: 'Website URL',
      admin: {
        description: 'External link to the investment (e.g. company website). If set, the investment card becomes clickable.',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  versions: {
    drafts: true,
  },
}
