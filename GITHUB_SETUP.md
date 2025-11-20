
# 🚀 GitHub Setup Instructions

## Пошаговая инструкция для загрузки проекта на GitHub

### Шаг 1: Создайте репозиторий на GitHub
1. Перейдите на [GitHub](https://github.com)
2. Нажмите кнопку "New repository" (зеленая кнопка)
3. Введите название: `ssvnauka.com`
4. Выберите **Public** или **Private**
5. **НЕ инициализируйте** репозиторий с README, .gitignore или лицензией
6. Нажмите "Create repository"

### Шаг 2: Загрузите код в репозиторий
Выполните следующие команды в терминале:

```bash
cd /home/ubuntu/ssvnauka-mvp

# Проверьте статус
git status

# Добавьте все изменения (если есть новые файлы)
git add -A
git commit -m "Add .gitignore and setup instructions"

# Загрузите на GitHub
git push -u origin main
```

### Шаг 3: Настройте GitHub Pages (опционально)
Если хотите бесплатный хостинг документации:
1. Перейдите в Settings репозитория
2. Выберите Pages в боковом меню
3. Выберите ветку `main` и папку `/docs`
4. Сохраните изменения

### Шаг 4: Добавьте темы и badges (опционально)
В настройках репозитория добавьте темы:
- `nextjs`
- `typescript`
- `tailwindcss`
- `cyberpunk`
- `scientific-media`
- `dark-theme`

Добавьте badges в начало README.md:
```markdown
![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwind-css)
![License](https://img.shields.io/badge/license-MIT-green)
```

## 🔐 Если возникает ошибка аутентификации

GitHub больше не принимает пароли для git операций. Используйте один из методов:

### Метод 1: Personal Access Token (PAT)
1. Перейдите на GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Нажмите "Generate new token"
3. Выберите срок действия и права доступа (минимум `repo`)
4. Скопируйте токен (он показывается один раз!)
5. При `git push` вместо пароля используйте этот токен

### Метод 2: SSH ключ (рекомендуется для частого использования)
```bash
# Генерация SSH ключа
ssh-keygen -t ed25519 -C "your_email@example.com"

# Копируйте публичный ключ
cat ~/.ssh/id_ed25519.pub

# Добавьте его на GitHub: Settings → SSH and GPG keys → New SSH key
```

Затем измените URL репозитория:
```bash
git remote set-url origin git@github.com:Serg2206/ssvnauka.com.git
git push -u origin main
```

## ✅ Проверка успешной загрузки
После `git push` перейдите на страницу репозитория:
https://github.com/Serg2206/ssvnauka.com

Вы должны увидеть:
- Все файлы проекта
- README.md с описанием
- Папку `docs` с документацией
- Зеленую галочку у коммита (если есть GitHub Actions)

## 🎯 Следующие шаги
1. ⭐ Добавьте описание репозитория в настройках
2. 📝 Создайте Issues для будущих задач
3. 🌿 Используйте ветки для новых фич (feature branches)
4. 🔄 Настройте CI/CD с GitHub Actions (опционально)

---

**Готово!** Ваш проект теперь на GitHub и доступен для совместной работы! 🎉
