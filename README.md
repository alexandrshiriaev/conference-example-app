# Демонстрационный проект на Next.js и Playwright

> Данное приложение является демонстрацией того, как можно протестировать веб-приложение, используя Playwright, интегрируя процесс тестирования в CI pipeline.

## Запуск приложения

```bash
git clone https://github.com/alexandrshiriaev/conference-example-app.git

cd conference-example-app

npm install --force

npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000), чтобы посмотреть демонстрационное приложение в браузере.

## Выполнение тестов

```bash
npx playwright test

# или, чтобы открыть интерфейс выполнения тестов

npx playwright test --ui
```

Для того, чтобы посмотреть отчёт о результатах тестирования:

```bash
npx playwright show-report
```
