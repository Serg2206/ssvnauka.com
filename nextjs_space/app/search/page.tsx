import Link from 'next/link';
import type { Metadata } from 'next';
import { prisma } from '@/lib/db';

// Results must reflect the live query, so this route is never cached.
export const dynamic = 'force-dynamic';

export async function generateMetadata(
  { searchParams }: { searchParams: { q?: string } }
): Promise<Metadata> {
  const q = searchParams.q?.trim();
  return {
    title: q ? `Поиск: ${q}` : 'Поиск',
    robots: { index: false, follow: true },
  };
}

async function searchArticles(query: string) {
  try {
    return await prisma.article.findMany({
      where: {
        published: true,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { excerpt: { contains: query, mode: 'insensitive' } },
          { content: { contains: query, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        category: { select: { name: true } },
      },
      orderBy: { publishedAt: 'desc' },
      take: 20,
    });
  } catch (error) {
    console.error('search: could not query articles', error);
    return [];
  }
}

export default async function SearchPage(
  { searchParams }: { searchParams: { q?: string } }
) {
  const query = (searchParams.q ?? '').trim();
  const articles = query ? await searchArticles(query) : [];

  return (
    <main className="min-h-screen bg-background text-foreground px-6 pt-32 pb-24 max-w-4xl mx-auto">
      <Link href="/" className="text-sm text-gray-400 hover:text-primary transition-colors">
        ← На главную
      </Link>

      <h1 className="text-3xl font-bold mt-6 mb-10">
        {query ? `Результаты по запросу «${query}»` : 'Поиск'}
      </h1>

      {!query && <p className="text-gray-500">Введите запрос в строке поиска.</p>}
      {query && articles.length === 0 && (
        <p className="text-gray-500">По запросу «{query}» ничего не найдено.</p>
      )}

      <div className="space-y-4">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/article/${article.slug}`}
            className="block border border-white/10 bg-surface p-6 hover:border-primary transition-colors"
          >
            <span className="text-xs font-mono text-accent">
              {article.category.name.toUpperCase()}
            </span>
            <h2 className="text-xl font-bold mt-2">{article.title}</h2>
            <p className="text-gray-400 mt-1">{article.excerpt}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
