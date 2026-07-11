
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Eye, Share2, Copy, Check } from 'lucide-react';
import { markdownToHtml } from '@/lib/markdown';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  readTime: number;
  views: number;
  publishedAt: string;
  author: { name: string; email: string };
  category: { name: string; slug: string; color: string };
  tags: { name: string; slug: string }[];
}

export default function ArticleClient() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/articles/${params.slug}`);
        if (!res.ok) throw new Error('Article not found');
        const data = await res.json();
        setArticle(data);
        
        // Extract headings for Table of Contents
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = markdownToHtml(data.content);
        const headingElements = tempDiv.querySelectorAll('h1, h2, h3');
        const extractedHeadings = Array.from(headingElements).map((heading, index) => ({
          id: `heading-${index}`,
          text: heading.textContent || '',
          level: parseInt(heading.tagName[1]),
        }));
        setHeadings(extractedHeadings);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchArticle();
    }
  }, [params.slug]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-gray-400 mb-8">Статья не найдена</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-primary text-black font-bold hover:bg-accent transition-colors"
          >
            На главную
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-surface z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent"
          style={{ width: `${readingProgress}%` }}
          initial={{ width: 0 }}
        />
      </div>

      {/* Sticky Header */}
      <nav className="fixed top-1 w-full bg-background/80 backdrop-blur-md border-b border-white/10 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-mono text-sm">BACK</span>
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={copyLink}
              className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-primary transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-accent" />
                  <span className="text-sm text-accent">Скопировано</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Поделиться</span>
                </>
              )}
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Table of Contents (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 self-start">
            <h3 className="text-sm font-mono text-gray-500 mb-4 uppercase">Содержание</h3>
            <nav className="space-y-2">
              {headings.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className={`block text-sm hover:text-primary transition-colors ${
                    heading.level === 1
                      ? 'font-bold'
                      : heading.level === 2
                      ? 'ml-4'
                      : 'ml-8 text-gray-500'
                  }`}
                >
                  {heading.text}
                </a>
              ))}
            </nav>

            {/* Stats */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime} мин чтения</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Eye className="w-4 h-4" />
                  <span>{article.views} просмотров</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <article className="lg:col-span-9">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              {/* Category & Tags */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span
                  className={`px-3 py-1 text-xs font-bold uppercase ${
                    article.category.color === 'primary'
                      ? 'bg-primary/10 text-primary border border-primary/30'
                      : 'bg-accent/10 text-accent border border-accent/30'
                  }`}
                >
                  {article.category.name}
                </span>
                {article.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag.slug}
                    className="px-3 py-1 text-xs bg-surface border border-white/10 text-gray-400"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 font-display">
                {article.title}
              </h1>

              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                {article.excerpt}
              </p>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold">
                    {article.author.name?.[0] || 'A'}
                  </div>
                  <div>
                    <p className="font-semibold">{article.author.name}</p>
                    <p className="text-gray-500 text-xs">
                      {new Date(article.publishedAt).toLocaleDateString('ru-RU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                {/* Mobile Stats */}
                <div className="flex items-center gap-4 lg:hidden ml-auto">
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime} мин</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Eye className="w-4 h-4" />
                    <span>{article.views}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-primary via-accent to-transparent mb-12" />

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="prose prose-invert prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(article.content) }}
            />

            {/* Share at the end */}
            <div className="mt-16 pt-8 border-t border-white/10">
              <p className="text-center text-gray-400 mb-4">Понравилась статья? Поделитесь с коллегами</p>
              <div className="flex justify-center">
                <button
                  onClick={copyLink}
                  className="flex items-center gap-2 px-6 py-3 bg-surface border border-white/10 hover:border-primary transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span>Скопировать ссылку</span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
