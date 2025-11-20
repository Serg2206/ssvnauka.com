
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, Terminal, Clock } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  readTime: number;
  category: { name: string; color: string };
  tags: { name: string }[];
}

export default function ArticlesGrid() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('/api/articles?limit=5');
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
            <Terminal className="w-6 h-6 text-accent" />
            FRESH_DATA
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`${
                  i === 0 ? 'col-span-1 md:col-span-2 h-[300px]' : 'h-[250px]'
                } bg-surface border border-white/10 p-6 animate-pulse`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
          <Terminal className="w-6 h-6 text-accent" />
          FRESH_DATA
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* First article - Large card */}
          {articles[0] && (
            <motion.div
              whileHover={{ scale: 1.01 }}
              onClick={() => router.push(`/article/${articles[0].slug}`)}
              className="col-span-1 md:col-span-2 h-[300px] bg-surface border border-white/10 p-8 relative overflow-hidden group cursor-pointer hover:border-primary transition-colors"
            >
              <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <div className="flex flex-col justify-end h-full z-10 relative">
                <span
                  className={`font-mono text-sm mb-2 ${
                    articles[0].category.color === 'primary' ? 'text-primary' : 'text-accent'
                  }`}
                >
                  {articles[0].category.name.toUpperCase()}
                </span>
                <h3 className="text-3xl font-bold mb-2">{articles[0].title}</h3>
                <p className="text-gray-400">{articles[0].excerpt}</p>
              </div>
            </motion.div>
          )}

          {/* Second article - Small card */}
          {articles[1] && (
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => router.push(`/article/${articles[1].slug}`)}
              className="h-[300px] bg-surface border border-white/10 p-6 flex flex-col justify-between hover:border-accent cursor-pointer transition-colors"
            >
              <div>
                <span
                  className={`font-mono text-xs border px-2 py-1 rounded-full ${
                    articles[1].category.color === 'primary'
                      ? 'text-primary border-primary/30'
                      : 'text-accent border-accent/30'
                  }`}
                >
                  {articles[1].category.name}
                </span>
                <h3 className="text-xl font-bold mt-4">{articles[1].title}</h3>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{articles[1].readTime} мин</span>
              </div>
            </motion.div>
          )}

          {/* Third article */}
          {articles[2] && (
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => router.push(`/article/${articles[2].slug}`)}
              className="h-[250px] bg-surface border border-white/10 p-6 hover:border-primary cursor-pointer transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="text-gray-500 font-mono text-sm">{articles[2].readTime} min read</span>
                <h3 className="text-xl font-bold mt-2">{articles[2].title}</h3>
              </div>
              {articles[2].tags[0] && (
                <span className="text-xs text-gray-500">#{articles[2].tags[0].name}</span>
              )}
            </motion.div>
          )}

          {/* Fourth article */}
          {articles[3] && (
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => router.push(`/article/${articles[3].slug}`)}
              className="h-[250px] bg-surface border border-white/10 p-6 hover:border-primary cursor-pointer transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="text-gray-500 font-mono text-sm">
                  {articles[3].category.name}
                </span>
                <h3 className="text-xl font-bold mt-2">{articles[3].title}</h3>
              </div>
            </motion.div>
          )}

          {/* Call to Action card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="h-[250px] bg-gradient-to-br from-surface to-surface border border-white/10 p-6 flex items-center justify-center hover:border-white cursor-pointer transition-colors"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-neon-gradient mb-2">
                СТАТЬ АВТОРОМ
              </h3>
              <p className="text-sm text-gray-400">Подать заявку →</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
