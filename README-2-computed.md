# 算出プロパティ(computed)とウォッチャー(watch)

## computed プロパティ

テンプレート内で Javascript を書けるのだが、そこで色々やりすぎると
全体の見通しも悪し、中身の理解に時間がかかる

しかも式しかかけないので、一度処理したものを複数回使用する際には同じことをしなければならなくて嫌

そんな時に算出プロパティ

```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

```javascript
const vm = new Vue({
  el: "#example",
  data: {
    message: "Hello"
  },
  computed: {
    reversedMessage: function() {
      // this === vm
      return this.message
        .split("")
        .reverse()
        .join();
    }
  }
});
```

reversedMessage は常に message 変数に依存しているので、値を変更すると
reversedMessage の値も変化することになる

他の場所で同じような仕組みを作成しても良いが、算出プロパティではキャッシュの仕組みがあるので、より高速に作用する。今回だと message 変数が変わらない限りキャッシュされる

また、Vue には他に監視プロパティ(watched property)があり、
データの変更を監視し反応させることが出来るが、多くの場合で computed の方が良い場面が多い(らしい)

### setter

フルネームを入れた際に first/last で分ける setter を作成

```javascript
const vm = new Vue({
  el: "#example",
  data: {
    first: "takashi",
    last: "yamada"
  },
  computed: {
    fullname: {
      get: function() {
        return this.first + " " + this.last;
      },
      set: function(newValue) {
        // ここのコードの有用性は検証していない
        [this.first, this.last] = newValue.split(" ");
      }
    }
  }
});
```

## watch プロパティ

データの変更に対して反応する、より汎用的な処理を watch オプションで実現できる

データが変わるのに応じて*非同期やコストの高い処理を実行したい時に最も便利*

```html
<div id="example">
  <p>
    Ask a yes/no question:
    <input v-model="question" />
  </p>
  <p>{{ answer }}</p>
</div>
<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
```

```js
const vm = new Vue({
  el: '#example',
  data: {
    question: '',
    answer: 'I cannnot give you an answer until you ask a question'
  },
  watch: {
    question: function (newQuestion, oldOne) {
      this.answer = 'Waiting for you to stop typing';
      this.debouncedGetAnswer();
    }
  },
  created: function() {
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500);
  },
  methods: {
    getAnswer: function() {
      if (this.question.indexOf('?') != -1) {
        this.answer = 'Questions usually contain this mark \'?\';
        return();
      }
      this.answer = 'Thinking...';

      tmp = this;
      axios.get('https://yesno.wtf/api')
        .then(function(response) {
          tmp.answer = _.capitalize(response.data.answer);
        })
        .catch(function(err) {
          tmp.answer = 'Could not reach the API ' + error;
        });
    }
  }
})
```
