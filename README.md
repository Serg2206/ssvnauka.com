
# ssvnauka.com — Scientific Media Platform v2.0

**ssvnauka.com** — это современная медиа-платформа, трансформирующая научные знания в доступный, интерактивный и технологичный формат. Мы отказываемся от PDF-архивов в пользу "живых" данных, темной темы и AI-инструментов.

> **Миссия:** Исследуй. Понимай. Применяй.

## 🚀 Основные фичи
- **Cyberpunk UI:** Dark Mode, минимализм, неоновые акценты (Electric Blue / Acid Lime).
- **Интерактивность:** Живые графики, AI-саммари статей, 3D-модели.
- **Tech Stack:** Next.js (App Router), Tailwind CSS, Strapi CMS.
- **Для авторов:** Сервис "под ключ" (верстка, перевод, продвижение).

## 📂 Структура документации
Вся стратегия и техническое задание находятся в папке `/docs`:

1. [**Бренд-бук и Дизайн**](docs/BRAND_BOOK.md) — Цвета, шрифты, логотип.
2. [**Техническое Задание (ТЗ)**](docs/TECHNICAL_SPEC.md) — Стек, архитектура, требования к MVP.
3. [**Стратегия и Маркетинг**](docs/STRATEGY.md) — Бизнес-модель, привлечение авторов и читателей.
4. [**Контент-Манифест**](docs/MANIFEST.md) — Тексты для запуска и Tone-of-Voice.

## 🛠 Установка (для разработчиков)

### Требования
- Node.js 18+
- PostgreSQL
- Yarn

### Быстрый старт

```bash
# 1. Клонируйте репозиторий
git clone https://github.com/Serg2206/ssvnauka.com.git
cd ssvnauka-com

# 2. Перейдите в директорию Next.js
cd nextjs_space

# 3. Установите зависимости
yarn install

# 4. Настройте переменные окружения
cp .env.example .env
# Отредактируйте .env и добавьте DATABASE_URL и NEXTAUTH_SECRET

# 5. Инициализируйте базу данных
yarn prisma generate
yarn prisma db push
yarn prisma db seed

# 6. Запустите dev-сервер
yarn dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

### Тестовый аккаунт
- Email: `john@doe.com`
- Password: `johndoe123`

## 📦 Технологии

- **Frontend Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Authentication:** NextAuth.js
- **Database:** PostgreSQL + Prisma ORM
- **Type Safety:** TypeScript

## 🎨 Дизайн-система

Проект использует кастомную палитру **Neon Noir**:
- **Void Black** (#050505) — фон
- **Electric Blue** (#00F0FF) — акцент для структуры и данных
- **Acid Lime** (#CCFF00) — акцент для действий и CTA
- **Paper White** (#EAEAEA) — основной текст

Подробнее в [Brand Book](docs/BRAND_BOOK.md).

## 📋 Статус проекта

- ✅ MVP интерфейса (Hero + Bento Grid)
- ✅ Аутентификация пользователей
- ✅ База данных и ORM
- 🔄 Страницы отдельных статей (в разработке)
- 🔄 CMS интеграция (планируется Strapi)
- 🔄 AI-саммари статей (планируется)

## 🤝 Для авторов

Хотите опубликовать свою работу на платформе? Свяжитесь с нами:
- Email: contact@ssvnauka.com
- Telegram: @ssvnauka

Мы предлагаем:
- Профессиональную верстку вашей статьи
- Перевод на английский язык
- AI-генерацию краткого содержания
- Продвижение в научном сообществе

---

**Designed by Serg2206 & AI Co-pilot. 2025.**
