import { lexicalHTMLField } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

const TwoImageCta: Block = {
    slug: 'two-image-cta',
    labels: {
        singular: 'Two Image CTA',
        plural: 'Two Image CTAs'
    },
    fields: [
        {
            type: 'text',
            name: 'title',
            required: true
        },
        {
            type: 'richText',
            name: 'body',
            required: true
        },
        lexicalHTMLField({
            htmlFieldName: 'body_html',
            lexicalFieldName: 'body',
        }),
        {
            type: 'array',
            name: 'images',
            minRows: 2,
            maxRows: 2,
            required: true,
            fields: [{
                type: 'upload',
                name: 'image',
                relationTo: 'media'
            }]
        }
    ]
}

export default TwoImageCta