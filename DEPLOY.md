# GitHub Pages Deployment Guide

## Настройка GitHub Pages

### Шаг 1: Активировать GitHub Pages

1. Перейди в настройки репозитория:
   ```
   https://github.com/Wert1go/super-cart-3/settings/pages
   ```

2. В разделе **"Source"** выбери:
   - **"GitHub Actions"** (не "Deploy from a branch")
   
3. Нажми **"Save"**

### Шаг 2: Проверить Workflow

1. Перейди в Actions:
   ```
   https://github.com/Wert1go/super-cart-3/actions
   ```

2. Если workflow не запустился автоматически:
   - Найди workflow "Deploy to GitHub Pages"
   - Нажми "Run workflow" → "Run workflow" (вручную запустить)

### Шаг 3: Дождаться деплоя

- Workflow автоматически соберет проект и задеплоит на GitHub Pages
- Обычно занимает 1-2 минуты
- После успешного деплоя приложение будет доступно по адресу:
  ```
  https://wert1go.github.io/super-cart-3/
  ```

## Автоматический деплой

После настройки, каждый push в ветку `main` будет автоматически:
1. Запускать сборку проекта
2. Деплоить на GitHub Pages

## Локальная проверка

Перед деплоем можно проверить локально:

```bash
npm run build
npm run preview
```

## Troubleshooting

### Workflow не запускается

1. Проверь, что GitHub Pages настроен на "GitHub Actions"
2. Проверь, что файл `.github/workflows/deploy.yml` существует в репозитории
3. Попробуй запустить workflow вручную через Actions

### Ошибки сборки

1. Проверь логи в Actions → выбери workflow → посмотри ошибки
2. Убедись, что все зависимости установлены (`package.json` корректен)
3. Проверь, что TypeScript компилируется без ошибок

### 404 на GitHub Pages

1. Убедись, что в `vite.config.ts` указан правильный `base: '/super-cart-3/'`
2. Проверь, что файлы в `dist/` корректны после сборки
3. Подожди 1-2 минуты после деплоя (GitHub Pages может кешировать)

