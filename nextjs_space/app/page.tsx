
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Atom, BookOpen, Search, Terminal, X } from 'lucide-react';
import { signIn } from 'next-auth/react';
import ArticlesGrid from '@/components/ArticlesGrid';

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submissionEmail, setSubmissionEmail] = useState('');
  const [submissionTitle, setSubmissionTitle] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [loginError, setLoginError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setLoginError('Неверный email или пароль');
      } else {
        setShowLoginModal(false);
        // In a real app, redirect to dashboard
        alert('Успешный вход! (В полной версии здесь будет редирект на личный кабинет)');
      }
    } catch (error) {
      setLoginError('Произошла ошибка при входе');
    }
  };

  const handleArticleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(true);
    // Reset form
    setSubmissionEmail('');
    setSubmissionTitle('');
    setSubmissionMessage('');
    
    setTimeout(() => {
      setShowSubmitModal(false);
      setSubmitSuccess(false);
    }, 2000);
  };

  const handleReadJournal = () => {
    // Scroll to articles section
    document.getElementById('articles-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      
      {/* HEADER / NAV */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-8 bg-gradient-to-b from-primary to-accent skew-x-[-15deg]" />
            <span className="text-xl font-bold tracking-tighter font-display">ssvnauka</span>
          </div>
          
          <div className="hidden md:flex items-center bg-surface/50 border border-white/5 rounded-full px-4 py-2 w-96">
            <Search className="w-4 h-4 text-gray-500 mr-3" />
            <input 
              type="text" 
              placeholder="Search for knowledge..." 
              className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-600"
            />
          </div>

          <button 
            onClick={() => setShowLoginModal(true)}
            className="px-5 py-2 text-sm font-bold border border-accent text-accent rounded-none hover:bg-accent hover:text-black transition-all duration-300"
          >
            LOGIN
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              SYSTEM V2.0 ONLINE
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 font-display">
              НАУКА <br />
              <span className="text-transparent bg-clip-text bg-neon-gradient">ВЗЛОМАНА</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 max-w-lg leading-relaxed">
              Мы превращаем PDF-архивы в медиа-реактор. 
              Читай. Исследуй. Создавай будущее.
            </p>

            <div className="flex gap-4">
              <button 
                onClick={handleReadJournal}
                className="group px-8 py-4 bg-primary text-black font-bold hover:bg-white transition-all flex items-center gap-2"
              >
                ЧИТАТЬ ЖУРНАЛ
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setShowSubmitModal(true)}
                className="px-8 py-4 border border-white/20 hover:border-accent hover:text-accent transition-all"
              >
                ПОДАТЬ СТАТЬЮ
              </button>
            </div>
          </div>

          {/* 3D / VISUAL ELEMENT PLACEHOLDER */}
          <div className="relative h-[400px] bg-surface/30 rounded-xl border border-white/5 flex items-center justify-center overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-20" />
            <Atom className="w-48 h-48 text-primary/20 animate-spin-slow" />
            <div className="absolute bottom-6 left-6">
              <p className="text-xs font-mono text-accent">LATEST INSIGHT</p>
              <h3 className="text-2xl font-bold mt-2">Quantum Supremacy 2025</h3>
            </div>
          </div>
        </motion.div>
      </section>

      {/* BENTO GRID (ARTICLES) */}
      <ArticlesGrid />

      {/* LOGIN MODAL */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowLoginModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface border border-white/10 p-8 max-w-md w-full relative"
            >
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-neon-gradient">
                ВХОД В СИСТЕМУ
              </h2>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-mono text-gray-400 mb-2">EMAIL</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-background border border-white/10 px-4 py-3 text-white focus:border-primary outline-none transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono text-gray-400 mb-2">PASSWORD</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-background border border-white/10 px-4 py-3 text-white focus:border-primary outline-none transition-colors"
                    placeholder="••••••••"
                    required
                  />
                </div>

                {loginError && (
                  <p className="text-red-400 text-sm">{loginError}</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-primary text-black font-bold py-3 hover:bg-white transition-all"
                >
                  ВОЙТИ
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Тестовый доступ: john@doe.com / johndoe123
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SUBMIT ARTICLE MODAL */}
      <AnimatePresence>
        {showSubmitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSubmitModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface border border-white/10 p-8 max-w-md w-full relative"
            >
              <button
                onClick={() => setShowSubmitModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-neon-gradient">
                ПОДАТЬ СТАТЬЮ
              </h2>

              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 border-2 border-accent rounded-full" />
                  </div>
                  <p className="text-accent font-bold">Заявка отправлена!</p>
                  <p className="text-sm text-gray-400 mt-2">Мы свяжемся с вами в ближайшее время.</p>
                </div>
              ) : (
                <form onSubmit={handleArticleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-mono text-gray-400 mb-2">EMAIL</label>
                    <input
                      type="email"
                      value={submissionEmail}
                      onChange={(e) => setSubmissionEmail(e.target.value)}
                      className="w-full bg-background border border-white/10 px-4 py-3 text-white focus:border-accent outline-none transition-colors"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-mono text-gray-400 mb-2">НАЗВАНИЕ СТАТЬИ</label>
                    <input
                      type="text"
                      value={submissionTitle}
                      onChange={(e) => setSubmissionTitle(e.target.value)}
                      className="w-full bg-background border border-white/10 px-4 py-3 text-white focus:border-accent outline-none transition-colors"
                      placeholder="Квантовая механика и..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-mono text-gray-400 mb-2">КРАТКОЕ ОПИСАНИЕ</label>
                    <textarea
                      value={submissionMessage}
                      onChange={(e) => setSubmissionMessage(e.target.value)}
                      className="w-full bg-background border border-white/10 px-4 py-3 text-white focus:border-accent outline-none transition-colors h-24 resize-none"
                      placeholder="О чем ваша работа..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-accent text-black font-bold py-3 hover:bg-white transition-all"
                  >
                    ОТПРАВИТЬ ЗАЯВКУ
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
