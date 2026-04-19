import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const blog = await getCollection('blog', ({ data }) => !data.draft);
  const articles = await getCollection('articles', ({ data }) => !data.draft);

  const allItems = [...blog.map(p => ({ ...p, basePath: 'blog' })), ...articles.map(p => ({ ...p, basePath: 'articles' }))]
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'sundev.pl',
    description: 'Personal blog and articles',
    site: context.site!,
    items: allItems.map((item) => ({
      title: item.data.title,
      pubDate: item.data.date,
      description: item.data.description,
      link: `/${item.basePath}/${item.slug}/`,
    })),
  });
}
