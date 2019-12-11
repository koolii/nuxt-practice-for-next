# Vue コンポーネント

- el オプションは必要ない。ルートオブジェクトのみで必要
- data オプションは関数化(インスタンス毎で管理するため)
- props オプションで外部からの変数を受ける
- template オプションにはルートとなる DOM が必要
- 子コンポーネントから親のイベントを実行する際は `$emit('event-name')`で実行させる
- 子コンポーネントから引数付きで親イベントを実行する時は methods で関数を定義し、その関数をまるごと渡す

```js
Vue.component("blog-post", {
  // el: '#none',
  data: function() {
    return {
      id: 1,
      date: "2019-12-11"
    };
  },
  props: ["post"],
  template: `
    <div class="blog-post">
      <h3>{{ post.date }}: {{ post.title }}</h3>
      <div v-html="post.content"></div>
    </div>
  `
});

<blog-post title="My first blog post"></blog-post>;
```
