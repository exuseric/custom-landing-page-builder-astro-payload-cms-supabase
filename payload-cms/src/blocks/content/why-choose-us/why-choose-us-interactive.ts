import { lexicalHTMLField } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

const WhyChooseUsInteractive: Block = {
    slug: 'why-choose-us-interactive',
    labels: {
        singular: 'Why Choose Us - Interactive',
        plural: 'Why Choose Us - Interactive'
    },
    fields: [
        {
            type: 'text',
            name: 'title',
            required: true
        }, {
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
            name: 'options',
            required: true,
            maxRows: 5,
            fields: [{
                type: 'text',
                name: 'title',
                required: true
            }, {
                type: 'richText',
                name: 'description',
                required: false
            },
            lexicalHTMLField({
                htmlFieldName: 'description_html',
                lexicalFieldName: 'description',
            }),
            {
                type: 'upload',
                name: 'image',
                relationTo: 'media'
            }]
        }
    ]
}

export default WhyChooseUsInteractive;