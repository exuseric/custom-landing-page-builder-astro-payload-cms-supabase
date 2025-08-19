import { lexicalHTMLField } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

const SimpleContact: Block = {
    slug: 'simple-contact',
    labels: {
        singular: 'Simple Contact',
        plural: 'Simple Contact'
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true
        },
        {
            name: 'contact',
            type: 'group',
            fields: [
                {
                    name: 'phone',
                    type: 'array',
                    required: true,
                    minRows: 1,
                    fields: [
                        {
                            type: 'text',
                            name: 'number',
                            required: true
                        },
                        {
                            type: 'select',
                            name: 'type',
                            options: ['mobile', 'whatsapp', 'telephone'],
                            defaultValue: 'mobile'
                        }
                    ]
                },
                {
                    name: 'email',
                    type: 'array',
                    required: true,
                    minRows: 1,
                    fields: [
                        {
                            type: 'email',
                            name: 'email',
                            required: true
                        }
                    ]
                }
            ]
        },
        {
            type: 'group',
            name: 'location',
            fields: [
                {
                    name: 'address',
                    type: 'richText',
                    required: true,
                },
                lexicalHTMLField({
                    htmlFieldName: 'address_html',
                    lexicalFieldName: 'address',
                }),
                {
                    name: 'iframe',
                    type: 'text',
                    required: true
                },
            ]
        },
        {
            type: 'radio',
            name: 'direction',
            options: ['vertical', 'horizontal', 'overlap'],
            defaultValue: 'vertical'
        }
    ]
}

export default SimpleContact