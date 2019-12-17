# idk

## v-if vs v-show

v-if は、より"リアル"な条件レンダリングです。

v-if は 遅延描画 (lazy) です。 初期表示において false の場合、何もしません。条件付きブロックは、条件が最初に true になるまで描画されません。

一方で、v-show はとてもシンプルです。要素は初期条件に関わらず常に描画され、シンプルな CSS ベースの切り替えとして保存されます。

一般的に、v-if はより高い切り替えコストを持っているのに対して、 v-show はより高い初期描画コストを持っています。 そのため、とても頻繁に何かを切り替える必要があれば v-show を選び、条件が実行時に変更することがほとんどない場合は、v-if を選びます。

## v-for (配列)

v-for ブロック内では、親スコープのプロパティへの完全なアクセスを持っています

可能な限り(繰り返される DOM の内容が単純な場合や、性能控除のために標準の動作に意図的に頼る場合を除いて) _key 属性_ を付与することが推奨される

```html
<div v-for="item in items" v-bind:key="item.id">
  <!-- content -->
</div>
```

```html
<ul id="example-1">
  <!-- <li v-for="item in items"> -->
  <!-- <li v-for="item of items"> -->
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
    <!-- {{ item.message }} -->
  </li>
</ul>
```

```js
const example1 = new Vue({
  el: "#example-1",
  data: {
    parentMessage: "Parent",
    items: [{ message: "Foo" }, { message: "Bar" }]
  }
});
```

Vue は画面の更新もトリガするために、監視された配列の変更メソッドを wrap している

- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()

Vue は再利用を最大化するためにヒューリスティックを実装しているので、
配列のリストをまるごと入れ替えても、処理はとても効率的となる

```js
example1.items = example1.items.filter(item => item.message.match(/Foo/));
```

### 注意点:Vue が気づけない配列の変更(リアクティブでない)

1. インデックスでアイテムを直接設定する時 `vm.items[0] = newValue`
2. 配列の長さを変更する時 `vm.items.length = newLength`

#### 対処

```js
// 1番の対処
Vue.set(vm.items, 0, newValue);
// ↑と同じ、エイリアス
vm.$set(vm.items, 0, newValue);
vm.items.splice(0, 1, newValue);

// 2番の対処
vm.items.splice(newLength);
```

## v-for (オブジェクト)

オブジェクトを反復処理する時は、順序は `Object.keys()` の順序です
全ての JavaScript エンジンで一貫性があるわけではないので注意

```html
<ul id="v-for-obj">
  <!-- <li v-for="value in object"> -->
  <li v-for="(value, name) in object">
    {{ index }}. {{ name }}: {{ value }}
    <!-- {{ value }} -->
  </li>
</ul>
```

```js
const vm = new Vue({
  el: "#v-for-obj",
  data: {
    object: {
      title: "How to do lists in Vue",
      author: "Jane Doe",
      publishedAt: "2016-04-10"
    }
  }
});
```

### 注意点:Vue が気づけないオブジェクトの変更(リアクティブでない)

Vue はプロパティの直接的な追加や削除を検出出来ない

```js
const vm = new Vue({
  el: "#example",
  data: {
    userProfile: {
      name: "Anika"
    }
  }
});
```

#### 対処

```js
// vm.$set()も全く同じ
Vue.set(vm.userProfile, "age", 27);
vm.userProfile = Object.assign({}, vm.userProfile, {
  age: 27,
  favoriteColor: "Vue Green"
});
```

## v-for と v-if (v-for > v-if)

この 2 つを同時に利用することは推奨されない
同時に利用した場合、v-if がループの書く繰り返しで実行されることになる。

なので、いくつかの要素のみをレンダリングする場合には使用できる
が、リストそのものをレンダリングするしないの判定では、ラッパーや親要素で v-if を使って判定すべき

```html
<ul v-if="todos.length">
  <li v-for="item in todos">
    {{ item }}
  </li>
</ul>
<p v-else>No todos left</p>
```
