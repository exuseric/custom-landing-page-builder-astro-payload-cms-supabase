import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            const { filename } = siblingData
            if (filename) {
              value = filename
                .replace(/\.[^/.]+$/, '')
                .replace(/[-_\.]/g, ' ')
                .replace(/\b\w/g, (char: string) => char.toUpperCase())
                .trim()

              return value
            }
          }
        ]
      }
    },
    {
      name: 'aspect',
      type: 'select',
      options: ['landscape', 'portrait', 'square'],
      defaultValue: 'landscape'
    }
  ],
  upload: true,
  folders: true
}
