'use client';

import React from 'react';
import { MessageCircle, Stethoscope, Users, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const WHATSAPP_URL = 'https://chat.whatsapp.com/BP1uBjDZEE70SlyKBmpZiZ';

interface CTACardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  label: string;
  utmContent: string;
  delay?: number;
}

function CTACard({ icon, title, description, label, utmContent, delay = 0 }: CTACardProps) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'whatsapp_join', {
        event_category: 'engagement',
        event_label: utmContent,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-surface/50 p-6 hover:border-accent/50 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10">
        <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 text-accent">
          {icon}
        </div>
        
        <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
        <p className="text-sm text-gray-400 mb-4 leading-relaxed">{description}</p>
        
        <a
          href={`${WHATSAPP_URL}?utm_source=ssvnauka&utm_medium=website&utm_campaign=community_launch&utm_content=${utmContent}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-black text-sm font-bold rounded-full hover:bg-white transition-all duration-300"
        >
          <MessageCircle className="w-4 h-4" />
          {label}
        </a>
      </div>
    </motion.div>
  );
}

export default function WhatsAppCTASection() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-mono mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          WHATSAPP COMMUNITY
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
          Присоединяйтесь к <span className="text-accent">экспертному сообществу</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          40+ лет хирургического опыта, профессиональные консилиумы, образовательный контент и поддержка пациентов
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CTACard
          icon={<Stethoscope className="w-6 h-6" />}
          title="Консилиум"
          description="Обсуждение сложных кейсов, протоколов лечения, разбор осложнений с коллегами"
          label="Вступить"
          utmContent="consilium_section"
          delay={0}
        />
        
        <CTACard
          icon={<GraduationCap className="w-6 h-6" />}
          title="Образование"
          description="КТ за 60 секунд, анатомия операций, тесты знаний, книжные рекомендации"
          label="Учиться"
          utmContent="education_section"
          delay={0.1}
        />
        
        <CTACard
          icon={<Users className="w-6 h-6" />}
          title="Пациентам"
          description="Поддержка, ответы на вопросы, подготовка к обследованию и операции"
          label="Получить помощь"
          utmContent="patients_section"
          delay={0.2}
        />
        
        <CTACard
          icon={<MessageCircle className="w-6 h-6" />}
          title="Объявления"
          description="Анонсы вебинаров, дней открытых дверей, акций и новых публикаций"
          label="Следить"
          utmContent="announcements_section"
          delay={0.3}
        />
      </div>
    </section>
  );
}
