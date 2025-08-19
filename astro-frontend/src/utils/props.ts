interface HeroProps {
    title: string;
    excerpt: string;
    image: {
        [key: string]: string;
    };
    cards?: {
        icon: string;
        title: string;
    }[];
}

export type { HeroProps }
