# イベント処理

## イベント修飾子

イベントハンドラ内での `event.preventDefault()` / `event.stopPropagation()` の呼び出しは Vue が `v-on`のために下記を提供している

- `.stop`
- `.prevent`
- `.capture`
- `.self`
- `.once`
- `.passive`

### 必要に応じて確認するのが良さそう

```html
<!-- クリックイベントの伝搬が止まります -->
<a v-on:click.stop="doThis"></a>

<!-- submit イベントによってページがリロードされません -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修飾子は繋げることができます -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 値を指定せず、修飾子だけ利用することもできます -->
<form v-on:submit.prevent></form>

<!-- イベントリスナーを追加するときにキャプチャモードで使います -->
<!-- 言い換えれば、内部要素を対象とするイベントは、その要素によって処理される前にここで処理されます -->
<div v-on:click.capture="doThis">...</div>

<!-- event.target が要素自身のときだけ、ハンドラが呼び出されます -->
<!-- 言い換えると子要素のときは呼び出されません -->
<div v-on:click.self="doThat">...</div>
```

## キー修飾子

イベント修飾子と同じくキー入力に関しても `v-on` で修飾子を追加することができる

キーは[ここ](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)のものをケバブケース(ハイフン繋ぎ)にすることで置換可能

```html
<input v-on:keyup.enter="submit" />
```

### 使用可能キーコード

- `.enter`
- `.tab`
- `.delete`
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`
- `.ctrl`
- `.alt`
- `.shift`
- `.meta`
