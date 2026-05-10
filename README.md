# MEBEL

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Структура папок

* `public` -- статические некомпилируемые файлы проекта
* `src/assets` -- компилируемые файлы ассетов
* `src/components` -- переиспользуемые компоненты
* `src/router/index.ts` -- конфигурация роутинга
* `src/stores` -- конфигурация и подключение стора
* `src/pages` -- компоненты страниц, подключаются на роуты в router
* `src/App.vue` -- корневой компонент проекта
* `src/main.ts` -- точка входа проекта

### Переменные окружения

| Название               |   Тип    | Обязательность | Описание                       |
|:-----------------------|:--------:|:--------------:|:-------------------------------|
| VITE_YANDEX_KEY        | `string` |       Да       | APIKey для карт Яндекса        |