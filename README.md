
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/d6d1444a-0a1f-4a4c-8d6a-91670562961f

## UI Design System

### Цветовая палитра (Color Palette)

#### Основные цвета (Primary Colors)
- **Синий (Blue)**: `#3B55A2` - Основной цвет бренда, используется для панели навигации, кнопок и акцентов
- **Оранжевый (Orange)**: `#FB8607` - Вторичный цвет, используется для кнопок действий и выделений

#### Нейтральные цвета (Neutral Colors)
- **Белый (White)**: `#FFFFFF` - Фон контента, текст на темном фоне
- **Светло-серый (Light Gray)**: `#F5F5F5` - Фон страницы, разделители
- **Серый (Gray)**: `#CCCCCC` - Границы, второстепенные элементы
- **Темно-серый (Dark Gray)**: `#333333` - Основной текст, заголовки

#### Цвета состояний (Status Colors)
- **Зеленый (Green)**: `#4CAF50` - Успех, подтверждение
- **Красный (Red)**: `#F44336` - Ошибки, удаление, отмена

### Шрифты (Fonts)

#### Основные шрифты
- **Montserrat** - Основной шрифт для текста и элементов интерфейса
  - Веса: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
  - Используется для: основного текста, описаний, кнопок, форм

- **Syncopate** - Акцентный шрифт для заголовков
  - Веса: 400 (Regular), 700 (Bold)
  - Используется для: заголовков, значимых элементов

### Компоненты UI

#### Кнопки (Buttons)
- **Первичная (Primary)**: Синяя кнопка (`bg-logaz-blue`) с белым текстом для главных действий
- **Вторичная (Secondary)**: Белая кнопка с синей рамкой (`border-logaz-blue`) и синим текстом
- **Действие (Action)**: Оранжевая кнопка (`bg-logaz-orange`) с белым текстом для действий над объектами
- **Отмена (Cancel)**: Серая кнопка (`bg-logaz-gray`) с темным текстом

#### Карточки (Cards)
- Белые карточки (`bg-white`) с легкой тенью
- Скругленные углы (`rounded-lg`)
- Внутренние отступы (`p-4` или `p-6`)
- Возможность подсветки при наведении (`hover:shadow-lg`)

#### Боковая панель (Sidebar)
- Синий фон (`bg-sidebar`)
- Белый текст
- Оранжевые акценты для активных элементов
- Поддержка сворачивания/разворачивания

#### Формы (Forms)
- Четкие подписи полей
- Группировка связанных элементов
- Визуальная обратная связь (фокус, ошибки)
- Адаптивная раскладка для различных размеров экрана

### Анимации (Animations)
- **Fade-in**: Плавное появление элементов
- **Slide-in-left**: Эффект выдвижения слева
- **Accordion**: Плавное раскрытие/скрытие

### Темы (Themes)
- **Светлая (Light)**: Светлый фон с темным текстом (по умолчанию)
- **Темная (Dark)**: Темный фон со светлым текстом
- **Системная (System)**: Автоматическое переключение в зависимости от настроек системы

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/d6d1444a-0a1f-4a4c-8d6a-91670562961f) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/d6d1444a-0a1f-4a4c-8d6a-91670562961f) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
