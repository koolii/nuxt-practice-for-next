## Build Setup

```bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Nuxt 開発の Tips や気付き

Nuxt は様々なパッケージが依存性などを解決しながらインストールしてくれるパッケージ・フレームワークになっていて、
特定の処理を行うと自動的に裏側で設定などを追加してくれる

### pages 以下に vue ファイルを作成すると自動的にルーティング(routs.js)を生成しマッピングしてくれる

```plain
pages/
\ user/
 - index.vue
 - detail.vue
\- index.vue
```

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-detail',
      path: '/user/detail',
      component: 'pages/user/detail.vue'
    }
  ]
}
```
