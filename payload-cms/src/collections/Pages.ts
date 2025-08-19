import { CollectionConfig } from "payload";
import { generateUrl, getParentUrl, getCompanyName } from "@/utils/generate-url";
import {
    lexicalHTMLField,
} from '@payloadcms/richtext-lexical'

import { NavigationField } from "./fields/navigation-field";
import * as HeroBlocks from "@/blocks/hero";
import * as ContentBlocks from "@/blocks/content";
import * as ContactBlocks from "@/blocks/contact";
import { SEOField } from "./fields/seo";

export const Page: CollectionConfig = {
    slug: 'page',
    access: {
        read: () => true,
        update: () => true,
        create: () => true
    },
    admin: {
        useAsTitle: 'title'
    },
    defaultSort: ['-number', '-title'],
    fields: [
        {
            type: 'row',
            fields: [
                {
                    type: 'text',
                    name: 'title',
                    admin: {
                        width: '33%',
                    },
                    required: true,
                },
                {
                    type: 'select',
                    name: 'country',
                    required: true,
                    admin: {
                        width: '33%',
                    },
                    options: ['ke', 'tz', 'mz', 'cbv', 'stm']
                },
                {
                    type: 'text',
                    name: 'theme color',
                    admin: {
                        width: '33%',
                    },
                },
                {
                    type: 'text',
                    name: 'core values',
                    admin: {
                        width: '33%',
                    }
                },
                {
                    type: 'text',
                    name: 'url',
                    required: true,
                    admin: {
                        width: '33%',
                        description: 'Add all required fields and save to autogenerate',
                    },
                    hooks: {
                        beforeValidate: [({ value, siblingData, originalDoc }) => {
                            const countryChanged = originalDoc?.country !== siblingData.country;
                            if (!value || countryChanged) value = generateUrl({ title: siblingData.title, country: siblingData.country })
                            return value
                        }]
                    }
                },
                {
                    type: 'richText',
                    name: 'operating hours',
                    admin: {
                        width: '33%'
                    }
                },
                lexicalHTMLField({
                    htmlFieldName: 'operatingHours_html',
                    lexicalFieldName: 'operating hours',
                }),
            ]
        },
        SEOField,
        NavigationField,
        {
            type: 'blocks',
            name: 'hero',
            blocks: [...Object.values(HeroBlocks)],
            maxRows: 1,
            minRows: 1,
        },
        {
            type: 'blocks',
            name: 'content',
            blocks: [...Object.values(ContentBlocks)],
            label: 'Content',
            minRows: 1
        },
        {
            type: 'blocks',
            name: 'contact',
            label: 'Contact',
            blocks: [...Object.values(ContactBlocks)],
            maxRows: 1,
            minRows: 1
        },
        {
            type: 'array',
            name: 'social links',
            fields: [
                {
                    type: 'text',
                    name: 'url',
                    required: true
                }, {
                    type: 'text',
                    name: 'title',
                    required: true
                }, {
                    type: 'select',
                    name: 'platform',
                    options: ['facebook', 'instagram', 'x (formerly twitter)', 'linkedin', 'youtube', 'pinterest', 'tiktok', 'telegram', 'whatsapp'],
                }
            ]
        },
        {
            type: 'row',
            fields: [
                {
                    type: 'select',
                    name: 'footer style',
                    options: ['default', 'tiny'],
                    defaultValue: 'default',
                    admin: {
                        width: '33%',
                    }
                },
                {
                    type: 'text',
                    name: 'Company url',
                    required: true,
                    admin: {
                        width: '33%',
                        description: 'Add all required fields and save to autogenerate',
                    },
                    hooks: {
                        beforeValidate: [({ value, siblingData, originalDoc }) => {
                            const countryChanged = originalDoc?.country !== siblingData.country;
                            if (!value || countryChanged) value = getParentUrl({ country: siblingData.country })
                            return value
                        }]
                    }
                },
                {
                    type: 'text',
                    name: 'Company Name',
                    required: true,
                    admin: {
                        width: '33%',
                        description: 'Add all required fields and save to autogenerate',
                    },
                    hooks: {
                        beforeValidate: [({ value, siblingData, originalDoc }) => {
                            const countryChanged = originalDoc?.country !== siblingData.country;
                            if (!value || countryChanged) value = getCompanyName({ country: siblingData.country })
                            return value
                        }]
                    }
                }
            ]
        },
    ]
}