import { prisma } from '@/lib/db';
import HomeClient from './HomeClient';
import type { Article } from '@/components/ArticlesGrid';

// Article list is rendered server-side and revalidated periodically (ISR).
// The try/catch fallback keeps `next build` working even without a reachable
// database connection at build time.
export const revalidate = 300;

async function getArticles(): Promise<Article[]> {
  try {
    return await prisma.article.findMany({
      where: { published: true },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        readTime: true,
        category: { select: { name: true, color: true } },
        tags: { select: { name: true } },
      },
      orderBy: { publishedAt: 'desc' },
      take: 5,
    });
  } catch (error) {
    console.error('home: could not load articles', error);
    return [];
  }
}

export default async function Home() {
  const articles = await getArticles();
  return <HomeClient articles={articles} />;
}
