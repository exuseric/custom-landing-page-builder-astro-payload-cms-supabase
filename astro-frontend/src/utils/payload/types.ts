export interface FolderInterface {
  id: number;
  name: string;
  folder?: (number | null) | FolderInterface;
  documentsAndFolders?: {
    docs?: (
      | {
        relationTo?: 'payload-folders';
        value: number | FolderInterface;
      }
      | {
        relationTo?: 'media';
        value: number | Media;
      }
    )[];
    hasNextPage?: boolean;
    totalDocs?: number;
  };
  updatedAt: string;
  createdAt: string;
}
export interface Media {
  id: number;
  alt: string;
  aspect?: ('landscape' | 'portrait' | 'square') | null;
  prefix?: string | null;
  folder?: (number | null) | FolderInterface;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}

export type LexicalNode = {
  detail: number;
  format: number;
  mode: string;
  style: string;
  text: string;
  type: string;
  version: number;
};

export type LexicalParagraph = {
  children: LexicalNode[];
  direction: string;
  format: string;
  indent: number;
  type: string;
  version: number;
  textFormat?: number;
  textStyle?: string;
  tag?: string; // For heading elements like h3, h4, etc.
};

export type LexicalContent = {
  root: {
    children: LexicalParagraph[];
    direction: string;
    format: string;
    indent: number;
    type: string;
    version: number;
  };
};

export type ContactInfo = {
  phone: Array<{
    id: string;
    number: string;
    type: "mobile" | "whatsapp" | "landline";
  }>;
  email: Array<{
    id: string;
    email: string;
  }>;
};

export type LocationInfo = {
  address: LexicalContent;
  address_html: string;
  iframe: string;
};

// Block type definitions
export type HeroBlock = {
  heading: string;
  excerpt: string;
  cover: Media;
  type?:
  | (
    | 'default'
    | 'horizontal'
    | 'vertical'
    | 'stylised horizontal'
    | 'alternate vertical'
    | 'fullscreen'
    | 'alternate fullscreen'
    | 'split'
    | 'bubble'
  )
  | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'simple-hero';
};

export type WhyChooseUsColumnBlock = {
  id: string;
  blockType: "why-choose-us-column" | "why-choose-us-grid";
  title: string;
  description: LexicalContent;
  description_html: string;
  image: Media;
  highlight?: boolean;
  blockName: string | null;
  options: Array<{
    id: string;
    title: string;
    description?: LexicalContent;
    description_html: string;
    icon?: string;
    body?: LexicalContent;
    body_html: string;
  }>;
};

export type WhyChooseUsInteractiveBlock = {
  id: string;
  blockType: "why-choose-us-interactive";
  title: string;
  description: LexicalContent;
  description_html: string;
  blockName: string | null;
  options: Array<{
    id: string;
    title: string;
    description?: LexicalContent;
    description_html: string;
    image: Media;
  }>;
};

export type ContentWithMediaBlock = {
  id: string;
  blockType: "content-with-media";
  title: string;
  'anchor id'?: ('home' | 'about' | 'services' | 'contact' | 'products') | null;
  image: Media;
  position?: ('left' | 'right' | 'bottom' | 'top') | null;
  highlight: boolean;
  blockName: string | null;
  body: LexicalContent;
  body_html: string;
};

// NEW: Content with Grid block type
export type ContentWithGridBlock = {
  id: string;
  blockType: "content-with-grid";
  title: string;
  'anchor id'?: ('home' | 'about' | 'services' | 'contact' | 'products') | null;
  body: LexicalContent;
  body_html: string;
  highlight: boolean;
  'card type'?: ('basic' | 'alternating' | 'alternating basic') | null;
  blockName: string | null;
  "card grid": Array<{
    id: string;
    image: Media;
    title: string;
    body: LexicalContent;
    body_html: string;
  }>;
};

export type BasicCard = {
  id: string;
  image: Media;
  title: string;
  body: LexicalContent;
  body_html: string;
}

export type SimpleCallToActionBlock = {
  id: string;
  blockType: "simple-call-to-action";
  heading: string;
  description: LexicalContent;
  description_html: string;
  buttonText: string;
  blockName: string | null;
};

export type ImageGridCallToActionBlock = {
  id: string;
  title: string;
  images: Media[];
  blockType: "image-grid-cta";
  blockName: string | null;
  body: LexicalContent;
  body_html: string;
}

export type TwoImageCallToActionBlock = {
  id: string;
  blockType: "two-image-cta";
  title: string;
  body: LexicalContent;
  body_html: string;
  blockName: string | null;
  images: Array<{
    id: string;
    image: Media;
  }>;
}

// NEW: Testimonial block type
export type SimpleTestimonialBlock = {
  id: string;
  blockType: "simple-testimonial";
  title: string;
  description: LexicalContent;
  description_html: string;
  blockName: string | null;
  highlight?: boolean;
  testimonies: Array<{
    id: string;
    testimony: LexicalContent;
    testimony_html: string;
    title: string;
  }>;
};

export type ContactBlock = {
  id: string;
  blockType: "simple-contact";
  title: string;
  direction: "vertical" | "horizontal" | "overlap";
  blockName: string | null;
  contact: ContactInfo;
  location: LocationInfo;
};

export type SymbioticAboutBlock = {
  title: string;
  'anchor id'?: ('home' | 'about' | 'services' | 'contact' | 'products') | null;
  excerpt: LexicalContent;
  body: LexicalContent;
  body_html: string;
  image: Media;
  highlight?: boolean | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'symbiotic-about';
}

export type TestimonialCarousel = {
  title: string;
  description?: LexicalContent | null;
  description_html: string;
  highlight?: boolean | null;
  testimonies?: {
    testimony: LexicalContent;
    title: string;
    id?: string | null;
  }[] | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'carousel-testimonial';
}

export type RoundedAbout = {
  title: string;
  'anchor id'?: ('home' | 'about' | 'services' | 'contact' | 'products') | null;
  excerpt: LexicalContent;
  body: LexicalContent;
  body_html: string;
  image: Media;
  highlight?: boolean | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'rounded-about';
}

export type SlideshowHero = {
  heading: string;
  excerpt: string;
  slides?:{
    cover: Media;
    id?: string | null;
  }[];
  type?:(
    | 'default'
    | 'horizontal'
    | 'vertical'
    | 'stylised horizontal'
    | 'alternate vertical'
    | 'fullscreen'
    | 'alternate fullscreen'
    | 'split'
  )
  | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'slideshow-hero';
}

// Union type for all blocks - UPDATE THIS when adding new block types
export type Block =
  | HeroBlock
  | WhyChooseUsColumnBlock
  | WhyChooseUsInteractiveBlock
  | ContentWithMediaBlock
  | ContentWithGridBlock
  | SimpleCallToActionBlock
  | ImageGridCallToActionBlock
  | TwoImageCallToActionBlock
  | SimpleTestimonialBlock
  | SymbioticAboutBlock
  | TestimonialCarousel
  | ContactBlock
  | RoundedAbout
  | SlideshowHero;

/*
 * GUIDE FOR ADDING NEW BLOCK TYPES:
 * 
 * When the CMS adds new block types, follow these steps:
 * 
 * 1. Create a new type definition following the pattern above:
 *    - Run pnpm generate:types in the payload codebase
 *    - Copy the type(s) for the new block(s)
 *    - Use LexicalContent for rich text fields
 *    - Use Media for image/file fields
 * 
 * 2. Add the new type to the Block union type above
 * 
 * 3. Update handle-response.ts to process the new block sections
 *    if they come from separate API fields
 * 
 * 4. Consider adding helper functions in index.ts for the new block type
 * 
 * Example for a hypothetical "gallery" block:
 * 
 * export type GalleryBlock = {
 *   id: string;
 *   blockType: "gallery";
 *   title: string;
 *   images: Media[];
 *   blockName: string | null;
 * };
 * 
 * Then add GalleryBlock to the Block union type.
 */

export type SocialLink = {
  platform: string;
  url: string;
  icon?: string;
  title: string;
};

export type ParsedPage = {
  id: number;
  title: string;
  url: string;
  country: string;
  themeColor: string;
  coreValues: any;
  seo: {
    metaTitle: string;
    metaDescription: string;
    analytics: string;
    searchConsole: string;
  };
  navigation: {
    logo: Media;
    menuItems: Array<{
      id: string;
      name: string;
      anchorId: string;
      style: string;
    }>;
  };
  operatingHours: string;
  socialLinks: SocialLink[];
  blocks: Block[];
  footerStyle: string;
  companyUrl: string;
  companyName: string;
  updatedAt: string;
  createdAt: string;
};

// Raw API response type - matches the actual structure
export type RawPageData = {
  id: number;
  title: string;
  country: string;
  "theme color": string;
  "core values": any;
  url: string;
  "operating hours": LexicalContent;
  "social links": SocialLink[];
  seo: {
    "meta title": string;
    "meta description": string;
    "search console": string;
    analytics: string;
  };
  navigation: {
    logo: Media;
    menuItems: Array<{
      id: string;
      "anchor name": string;
      "anchor id": string;
      style: string;
    }>;
  };
  hero?: Block[];
  "why choose us"?: Block[];
  content?: Block[];
  "call to action"?: Block[];
  contact?: Block[];
  "footer style": string;
  "Company url": string;
  "Company Name": string;
  updatedAt: string;
  createdAt: string;
};