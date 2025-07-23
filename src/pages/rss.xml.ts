import rss from '@astrojs/rss';
import { siteConfig } from '@/data/site';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
    const blog = await getCollection('blog');
  return rss({
    // `<title>` field in output xml
    title: siteConfig.name,
    // `<description>` field in output xml
    description: siteConfig.description,
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: context.site,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      // Compute RSS link from post `id`
      // This example assumes all posts are rendered as `/blog/[id]` routes
      link: `/blog/${post.id}/`,
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}