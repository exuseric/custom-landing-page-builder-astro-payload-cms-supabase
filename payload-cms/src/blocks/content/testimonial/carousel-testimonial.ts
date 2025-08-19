import { lexicalHTMLField } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

const CarouselTestimonial: Block = {
    slug: 'carousel-testimonial',
    labels: {
        singular: 'Carousel Testimonial',
        plural: 'Carousel Testimonials'
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

export default CarouselTestimonial