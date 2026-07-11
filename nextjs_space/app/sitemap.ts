import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

// Generated at request time so no database connection is required at build.
export const dynamic = 'force-dynamic';

const BASE_URL = 'https://ssvnauka.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  try {
    const articles = await prisma.article.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true, publishedAt: true },
      orderBy: { publishedAt: 'desc' },
    });

    const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
      url: `${BASE_URL}/article/${a.slug}`,
      lastModified: a.updatedAt ?? a.publishedAt ?? new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    return [...staticRoutes, ...articleRoutes];
  } catch (error) {
    // If the database is unavailable, still return a valid sitemap.
    console.error('sitemap: falling back to static routes only', error);
    return staticRoutes;
  }
}
