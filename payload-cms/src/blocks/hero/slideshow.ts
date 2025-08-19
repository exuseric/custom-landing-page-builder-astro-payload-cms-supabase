import { Block } from "payload";

const SlideshowHero: Block = {
    slug: 'slideshow-hero',
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
            name: 'slides',
            type: 'array',
            minRows: 2,
            fields: [
                {
                    name: 'cover',
                    type: 'upload',
                    relationTo: 'media',
                    required: true
                },
            ]
        },
        {
            type: 'select',
            name: 'type',
            options: ['default', 'horizontal', 'vertical', 'stylised horizontal', 'alternate vertical', 'fullscreen', 'alternate fullscreen', 'split']
        }
    ]
}

export default SlideshowHero