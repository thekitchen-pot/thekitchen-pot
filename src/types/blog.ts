//import type { ImageFunction } from 'astro:content';
import type { ImageMetadata } from 'astro';

export interface BlogPost {
  id: string;
  slug?: string;
  data: {
    title: string;
    slug: string;
    pubDate: Date;
    modDate: Date;
    author: string;
    authorBio?: string;
    authorId?: string;
    authorImage?: string;
    authorImageAlt?: string;
    coverAlt?: string;
    description: string;
    tags: string[];
    category: string;
    seo?: string;

    image: ImageMetadata;
  };
}