import { cache } from 'react';
import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import ArticleClient from './ArticleClient';

// Article data is fetched per request; never prerendered at build (no DB needed then).
export const dynamic = 'force-dynamic';

const BASE_URL = 'https://ssvnauka.com';

// Shared, de-duplicated fetch: generateMetadata and the page reuse one query.
const getArticle = cache(async (slug: string) => {
  try {
    return await prisma.article.findUnique({
      where: { slug },
      include: { author: { select: { name: true } }, category: true },
    });
  } catch (error) {
    console.error('article page: could not load article', error);
    return null;
  }
});

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const article = await getArticle(params.slug);

  if (!article) {
    return {
      title: 'Статья не найдена',
      robots: { index: false, follow: false },
    };
  }

  const url = `${BASE_URL}/article/${article.slug}`;
  const images = article.coverImage ? [article.coverImage] : ['/og-image.png'];

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      url,
      images,
      publishedTime: article.publishedAt?.toISOString(),
      authors: article.author?.name ? [article.author.name] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images,
    },
  };
}

export default async function Page(
  { params }: { params: { slug: string } }
) {
  const article = await getArticle(params.slug);

  const jsonLd = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt,
        image: article.coverImage
          ? [article.coverImage]
          : [`${BASE_URL}/og-image.png`],
        datePublished: article.publishedAt?.toISOString(),
        dateModified: article.updatedAt?.toISOString(),
        author: {
          '@type': 'Person',
          name: article.author?.name ?? 'Prof. Sergiy Sushkov',
        },
        publisher: {
          '@type': 'Organization',
          name: 'ssvnauka',
        },
        mainEntityOfPage: `${BASE_URL}/article/${article.slug}`,
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ArticleClient />
    </>
  );
}
