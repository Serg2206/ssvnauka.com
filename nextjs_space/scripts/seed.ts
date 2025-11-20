
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create default admin user
  const hashedPassword = await bcrypt.hash('johndoe123', 10);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      name: 'John Doe',
      hashedPassword: hashedPassword,
    },
  });

  console.log('✅ Admin user created:', adminUser.email);

  // Create test user
  const testHashedPassword = await bcrypt.hash('password123', 10);
  
  const testUser = await prisma.user.upsert({
    where: { email: 'test@ssvnauka.com' },
    update: {},
    create: {
      email: 'test@ssvnauka.com',
      name: 'Test User',
      hashedPassword: testHashedPassword,
    },
  });

  console.log('✅ Test user created:', testUser.email);

  // Create categories
  const categories = [
    { name: 'Физика', slug: 'physics', color: 'primary' },
    { name: 'Биотех', slug: 'biotech', color: 'accent' },
    { name: 'AI/ML', slug: 'ai-ml', color: 'primary' },
    { name: 'Безопасность', slug: 'security', color: 'accent' },
    { name: 'Квантовые технологии', slug: 'quantum', color: 'primary' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  console.log('✅ Categories created');

  // Create tags
  const tags = [
    { name: 'Квантовые вычисления', slug: 'quantum-computing' },
    { name: 'Нейронауки', slug: 'neuroscience' },
    { name: 'Генеративный AI', slug: 'generative-ai' },
    { name: 'Криптография', slug: 'cryptography' },
    { name: 'CRISPR', slug: 'crispr' },
    { name: 'Blockchain', slug: 'blockchain' },
  ];

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag,
    });
  }

  console.log('✅ Tags created');

  // Get created categories and tags
  const physicsCategory = await prisma.category.findUnique({ where: { slug: 'physics' } });
  const biotechCategory = await prisma.category.findUnique({ where: { slug: 'biotech' } });
  const aiCategory = await prisma.category.findUnique({ where: { slug: 'ai-ml' } });

  const quantumTag = await prisma.tag.findUnique({ where: { slug: 'quantum-computing' } });
  const neuroTag = await prisma.tag.findUnique({ where: { slug: 'neuroscience' } });
  const aiTag = await prisma.tag.findUnique({ where: { slug: 'generative-ai' } });

  // Create sample articles
  if (physicsCategory && quantumTag) {
    await prisma.article.upsert({
      where: { slug: 'quantum-supremacy-2025' },
      update: {},
      create: {
        title: 'Квантовое превосходство: Миф или реальность?',
        slug: 'quantum-supremacy-2025',
        excerpt: 'Разбираем алгоритм Sycamore и объясняем, почему заявление Google о квантовом превосходстве было преждевременным.',
        content: `# Квантовое превосходство: Миф или реальность?

В 2019 году Google заявила о достижении "квантового превосходства" — момента, когда квантовый компьютер решает задачу, недоступную классическим суперкомпьютерам. Но так ли это на самом деле?

## Что такое квантовое превосходство?

Квантовое превосходство — это демонстрация того, что квантовый компьютер может выполнить вычисление, практически невозможное для классического компьютера за разумное время.

### Эксперимент Google

Google использовала 53-кубитный процессор Sycamore для выполнения специфической задачи — проверки выходных данных квантовой схемы. По их данным:

- **Квантовый компьютер:** 200 секунд
- **Классический суперкомпьютер (оценка Google):** 10,000 лет

## Критика

Однако IBM быстро опровергла эти заявления, показав, что классический суперкомпьютер может решить ту же задачу за 2.5 дня, используя более эффективные алгоритмы.

### Проблемы эксперимента

1. Задача была искусственно подобрана под возможности квантового компьютера
2. Отсутствует практическое применение
3. Высокий уровень ошибок (1.6% на операцию)

## Настоящее квантовое превосходство

Для настоящего квантового превосходства необходимо:

- Решение практически значимой задачи
- Доказуемое превосходство над всеми классическими методами
- Низкий уровень ошибок и стабильность

## Будущее

Квантовые компьютеры продолжают развиваться. В 2024 году появились системы с более чем 1000 кубитов. Но до практического применения еще далеко.

---

**Вывод:** Квантовое превосходство пока остается больше маркетинговым термином, чем реальным научным достижением. Но прогресс идет, и настоящий прорыв может случиться в ближайшие 5-10 лет.`,
        categoryId: physicsCategory.id,
        authorId: adminUser.id,
        readTime: 12,
        published: true,
        publishedAt: new Date(),
        tags: {
          connect: [{ id: quantumTag.id }],
        },
      },
    });
  }

  if (biotechCategory && neuroTag) {
    await prisma.article.upsert({
      where: { slug: 'neurointerfaces-future' },
      update: {},
      create: {
        title: 'Нейроинтерфейсы: Как мы будем управлять ПК силой мысли',
        slug: 'neurointerfaces-future',
        excerpt: 'Разбор технологии Neuralink и её конкурентов в РФ. От чтения мыслей до киборгизации человека.',
        content: `# Нейроинтерфейсы: Как мы будем управлять ПК силой мысли

Нейроинтерфейсы (BCI - Brain-Computer Interface) - технология, позволяющая напрямую подключить мозг к компьютеру. Звучит как фантастика, но это уже реальность.

## Neuralink: Прорыв Илона Маска

В 2024 году Neuralink впервые имплантировал чип в мозг человека. Результаты впечатляющие:

- Пациент может управлять курсором мыши силой мысли
- Скорость набора текста: 25 слов в минуту
- Латентность: менее 100 мс

### Технология

Устройство содержит:
- 1024 электрода толщиной 5 микрон
- Беспроводную зарядку
- Процессор обработки сигналов
- Bluetooth-передатчик

## Российские разработки

В России также ведутся исследования:

### НТИ Neuron
- Неинвазивный нейроинтерфейс на основе ЭЭГ
- Используется для реабилитации после инсульта
- Цена: от 500,000 рублей

### МГУ: Project Brain-Net
- Прямая связь мозг-компьютер-мозг
- Передача простых команд между двумя людьми
- Стадия: лабораторные испытания

## Применения

1. **Медицина:** Восстановление после инсульта, протезирование
2. **Gaming:** Управление персонажем мыслями
3. **Коммуникация:** Для людей с параличом
4. **AR/VR:** Более глубокое погружение

## Этические вопросы

- Безопасность данных (взлом мыслей?)
- Неравенство (доступ только богатым?)
- Идентичность (где кончается человек и начинается машина?)

## Прогноз

К 2030 году нейроинтерфейсы станут доступны широкой публике. Цена упадет до $1000, а производительность вырастет в 10 раз.

---

**Вывод:** Будущее уже наступило. Нейроинтерфейсы изменят нашу жизнь так же, как когда-то это сделали смартфоны.`,
        categoryId: biotechCategory.id,
        authorId: adminUser.id,
        readTime: 15,
        published: true,
        publishedAt: new Date(),
        tags: {
          connect: [{ id: neuroTag.id }],
        },
      },
    });
  }

  if (aiCategory && aiTag) {
    await prisma.article.upsert({
      where: { slug: 'ai-artists-how-it-works' },
      update: {},
      create: {
        title: 'AI-художники: Как работают Midjourney и DALL-E',
        slug: 'ai-artists-how-it-works',
        excerpt: 'Технический разбор генеративных моделей изображений. От диффузии до трансформеров.',
        content: `# AI-художники: Как работают Midjourney и DALL-E

Генеративные модели изображений произвели революцию в дизайне и искусстве. Но как они работают внутри?

## Diffusion Models

Основа современных AI-художников — диффузионные модели.

### Принцип работы

1. **Прямой процесс:** Постепенно добавляем шум к изображению
2. **Обратный процесс:** Учим модель убирать шум
3. **Генерация:** Начинаем с чистого шума и постепенно получаем изображение

\`\`\`python
# Упрощенный пример
def denoise_step(noisy_image, noise_predictor, timestep):
    predicted_noise = noise_predictor(noisy_image, timestep)
    return noisy_image - predicted_noise
\`\`\`

## DALL-E vs Midjourney

### DALL-E 3 (OpenAI)
- Основа: Диффузия + GPT-интеграция
- Сильные стороны: Точность следования промпту
- Слабые: Иногда "слишком правильно"

### Midjourney v6
- Основа: Proprietary diffusion architecture
- Сильные стороны: Художественность, стиль
- Слабые: Хуже с текстом

## Техники улучшения результата

### 1. Промпт-инженерия
\`\`\`
Плохо: "кот"
Хорошо: "realistic photo of a fluffy orange cat, natural lighting, shallow depth of field, professional photography"
\`\`\`

### 2. Negative prompts
Указываем, чего НЕ хотим видеть:
\`\`\`
--no "blurry, low quality, deformed"
\`\`\`

### 3. Seed control
Фиксируем seed для воспроизводимости

## Ограничения

1. **Авторские права:** Кому принадлежат созданные изображения?
2. **Датасеты:** Модели обучались на миллионах изображений (часто без согласия авторов)
3. **Deepfakes:** Потенциал для злоупотреблений

## Будущее

В разработке:
- **Video generation:** Sora от OpenAI
- **3D models:** Point-E, Shap-E
- **Real-time generation:** Stable Diffusion Turbo

---

**Вывод:** AI-художники — это не магия, а сложная математика. Понимание принципов работы поможет получать лучшие результаты.`,
        categoryId: aiCategory.id,
        authorId: testUser.id,
        readTime: 18,
        published: true,
        publishedAt: new Date(),
        tags: {
          connect: [{ id: aiTag.id }],
        },
      },
    });
  }

  console.log('✅ Sample articles created');

  console.log('🎉 Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
