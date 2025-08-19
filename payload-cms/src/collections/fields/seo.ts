
import { Field } from "payload";

export const SEOField: Field = {
    type: 'group',
    name: 'seo',
    fields: [
        {
            type: 'text',
            name: 'meta title',
            required: true,
            minLength: 50,
            maxLength: 60,
            admin: {
                description: '50 - 60 characters'
            }
        },
        {
            type: 'text',
            name: 'meta description',
            required: true,
            minLength: 70,
            maxLength: 150,
            admin: {
                description: '70 - 150 characters'
            }
        },
        {
            type: 'text',
            name: 'search console',
            required: true,
            defaultValue: '<meta name="google-site-verification" content="N0HompzJ25uz2PejDBXT-26yePXEWujgsnsWOcVrNQQ">'
        }, {
            type: 'text',
            name: 'analytics',
            required: true,
            defaultValue: '<!-- Google tag (gtag.js) -->'
        },
    ]
}
