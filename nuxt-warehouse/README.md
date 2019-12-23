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

### layouts は共通 View

https://ja.nuxtjs.org/api/pages-layout

`layouts/default.vue` というファイルが Nuxt でプロジェクトを作成した場合に基本的に自動生成されて
ここは全ページで共通するヘッダー・フッター等をマークアップ出来る場所
（または Vuetify を今回使用したので、自動的に生成されたかもしれない）

また、ページ毎に違う layout を設定することができる
使い方は下記のようにクラスを export する際に layout プロパティに使用したい layout コンポーネントを指定するだけ
省略したときのデフォルトの設定が `layout: 'default'` の為、default.vue を記述するだけで基本的に反映される仕組み

```js
export default {
  layout: 'blog'
  // ...
}
```

### pages 以下に vue ファイルを作成すると自動的にルーティング(routs.js)を生成しマッピングしてくれる

また、user 詳細画面などを表示する際に URL に userId が埋め込まれることがある。
このような動的なパラメータによって作成されるページは \_(アンダースコア)をファイルのプレフィックスに付与することで作成することが出来る

https://ja.nuxtjs.org/guide/routing/

```plain
pages/
\ user/
 - index.vue
 - detail.vue
 - _id.vue
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
    },
    {
      name: 'user-id',
      path: '/user/:id',
      component: 'pages/user/_id.vue'
    }
  ]
}
```
