
# ⚙️ Техническое Задание (MVP)

## 1. Стек технологий
* **Frontend:** Next.js 14+ (App Router).
* **Styling:** Tailwind CSS + Framer Motion (анимации).
* **Backend/CMS:** Strapi (Headless CMS) или Sanity.
* **Database:** PostgreSQL.
* **Hosting:** Vercel.

## 2. Требования к интерфейсу

### Главная страница
* **Hero Block:** Крупная типографика, 3D-элемент или абстрактное видео, CTA кнопка.
* **Bento Grid:** Сетка статей разного размера.
* **Performance:** Google PageSpeed > 90 (зеленая зона).

### Страница статьи (Reading Mode)
* **Sticky Header:** Прогресс-бар чтения наверху.
* **Table of Contents:** Автоматическое содержание слева.
* **Интерактив:**
    * Копирование цитат в BibTeX/ГОСТ.
    * Возможность переключения "Бит/Кубит" (интерактивные виджеты внутри текста).
* **SEO:** Schema.org/ScholarlyArticle микроразметка.

## 3. Функционал
* **Поиск:** Полнотекстовый поиск по заголовкам и контенту.
* **Фильтры:** По категориям и тегам.
* **Мультиязычность:** Заложена в архитектуру (RU/EN).

## 4. Архитектура данных

### Модели базы данных

#### Article
```prisma
model Article {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  excerpt     String
  content     String   @db.Text
  coverImage  String?
  category    Category @relation(fields: [categoryId], references: [id])
  categoryId  String
  author      User     @relation(fields: [authorId], references: [id])
  authorId    String
  tags        Tag[]
  readTime    Int      // в минутах
  views       Int      @default(0)
  published   Boolean  @default(false)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

#### Category
```prisma
model Category {
  id       String    @id @default(cuid())
  name     String
  slug     String    @unique
  color    String    // для UI акцентов
  articles Article[]
}
```

#### Tag
```prisma
model Tag {
  id       String    @id @default(cuid())
  name     String    @unique
  articles Article[]
}
```

## 5. API Endpoints

### Публичные
- `GET /api/articles` — список статей (с пагинацией)
- `GET /api/articles/[slug]` — конкретная статья
- `GET /api/categories` — список категорий
- `GET /api/search?q=query` — поиск по статьям

### Защищенные (для авторов)
- `POST /api/articles` — создание статьи
- `PUT /api/articles/[id]` — редактирование статьи
- `DELETE /api/articles/[id]` — удаление статьи

## 6. Требования к производительности
* **First Contentful Paint (FCP):** < 1.8s
* **Largest Contentful Paint (LCP):** < 2.5s
* **Cumulative Layout Shift (CLS):** < 0.1
* **Time to Interactive (TTI):** < 3.8s

## 7. Безопасность
* **Authentication:** NextAuth.js с JWT токенами
* **Authorization:** Role-based access control (читатель, автор, админ)
* **Content Security Policy:** Строгие CSP заголовки
* **Rate Limiting:** Ограничение запросов к API
* **XSS Protection:** Санитизация пользовательского контента

## 8. Аналитика
* **Vercel Analytics:** Для отслеживания производительности
* **Google Analytics 4:** Для поведенческой аналитики
* **Custom Events:** Отслеживание кликов, время чтения, скроллинг

## 9. Roadmap

### Phase 1: MVP (Текущая)
- ✅ Главная страница с Hero и Bento Grid
- ✅ Аутентификация пользователей
- ✅ База данных
- ⏳ Страницы отдельных статей
- ⏳ Форма подачи статей

### Phase 2: Content Management
- Интеграция Strapi CMS
- Админ-панель для редакторов
- Система модерации контента
- Markdown редактор с preview

### Phase 3: Advanced Features
- AI-саммари статей (OpenAI API)
- Интерактивные графики (Plotly.js)
- Система комментариев
- Social sharing оптимизация

### Phase 4: Monetization
- Платные услуги для авторов
- Pro-подписка
- Партнерская программа

## 10. Технические ограничения
* **Browser Support:** Last 2 versions of Chrome, Firefox, Safari, Edge
* **Mobile First:** Приоритет мобильной версии
* **Accessibility:** WCAG 2.1 AA compliance
* **i18n:** Поддержка русского и английского языков
