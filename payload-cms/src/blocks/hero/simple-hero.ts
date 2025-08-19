import { Block } from "payload";

const SimpleHero: Block = {
    slug: 'simple-hero',
    fields: [
        {
            name: 'heading',
            type: "text",
            required: true
        },
        {
            name: 'excerpt',
            type: 'text',
            required: true
        },
        {
            name: 'cover',
            type: 'upload',
            relationTo: 'media',
            required: true
        },
        {
            type: 'select',
            name: 'type',
            options: ['default', 'horizontal', 'vertical', 'stylised horizontal', 'alternate vertical', 'fullscreen', 'alternate fullscreen', 'split']
        }
    ]
}

export default SimpleHero