# Arknodejs.com application

Derived from self-made `Vue SSR template` (forked from [vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0))

## Checklist

- website Name & Logo & Meta: /pubic/*, /index.template.html, /server.js, /src/mixin/meta.js
- [vue-router](https://router.vuejs.org/en/): /src/router/index.js
- [vuex](https://vuex.vuejs.org/): /src/store/*
- [slm](https://github.com/slm-lang/slm): html template lang
- [stylus](http://stylus-lang.com/) pre-css lang
- webpack 2 level code splitting

## Features

> borrow from vue-hackernews-2.0
- Server Side Rendering
  - Vue + vue-router + vuex working together
  - Server-side data pre-fetching
  - Client-side state & DOM hydration
  - Automatically inlines CSS used by rendered components only
  - Preload / prefetch resource hints
  - Route-level code splitting
- Single-file Vue Components
  - Hot-reload in development
  - CSS extraction for production
- Animation
  - Effects when switching route views

## Build Setup

**Requires Node.js 8+**

``` bash
# install dependencies
npm install # or yarn

# serve in dev mode, with hot reload at localhost, port depends on /config/index.js
npm run dev

# build for production
npm run build

# serve in production mode
npm start
```

## Awesome Examples using this template

- [ELLE Singapore](https://www.elle.sg)

## License

Apache 2.0
