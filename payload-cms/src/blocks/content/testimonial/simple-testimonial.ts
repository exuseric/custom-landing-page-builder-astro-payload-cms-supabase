import { lexicalHTMLField } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

const SimpleTestimonial: Block = {
    slug: 'simple-testimonial',
    labels: {
        singular: 'Simple Testimonial',
        plural: 'Simple Testimonials'
    },
    fields: [
        {
            type: 'text',
            name: 'title',
            required: true,
        },
        {
            type: 'richText',
            name: 'description',
            required: false,
        },
        lexicalHTMLField({
            htmlFieldName: 'description_html',
            lexicalFieldName: 'description',
        }),
        {
            type: 'checkbox',
            name: 'highlight',
            defaultValue: false
        },
        {
            type: 'array',
            name: 'testimonies',
            maxRows: 6,
            fields: [
                {
                    type: 'richText',
                    name: 'testimony',
                    required: true
                },
                {
                    type: 'text',
                    name: 'title',
                    required: true,
                },
                lexicalHTMLField({
                    htmlFieldName: 'testimony_html',
                    lexicalFieldName: 'testimony',
                }),
            ]
        }
    ]
}

export default SimpleTestimonial