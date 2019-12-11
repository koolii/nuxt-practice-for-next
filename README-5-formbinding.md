# フォーム入力用の Vue 提供 `v-model` を利用

v-model は任意の form 要素にある value、checked または selected 属性の初期値を無視します。input または textarea は常に、信頼できる情報源として Vue インスタンスを扱います。コンポーネントの data オプションの中で JavaScript 側で初期値を宣言する必要があります。

## テキスト

```html
<input v-model="message" placeholder="edit me" />
<p>Messaage is: {{ message }}</p>
```

## テキストエリア

```html
<span>Multiline message is:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<br />

<textarea v-model="message"></textarea>
```

## チェックボックス

```html
<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>
```

複数のチェックボックスは、同じ配列になる

```html
<div id="example-3">
  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
  <label for="jack">Jack</label>
  <input type="checkbox" id="john" value="John" v-model="checkedNames" />
  <label for="john">John</label>
  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
  <label for="mike">Mike</label>
  <br />
  <span>Checked names: {{ checkedNames }}</span>
</div>
```

## ラジオ

```html
<input type="radio" id="one" value="One" v-model="picked" />
<label for="one">One</label>
<br />
<input type="radio" id="two" value="Two" v-model="picked" />
<label for="two">Two</label>
<br />
<span>Picked: {{ picked }}</span>
```

## セレクトボックス

v-model の式の初期値がオプションのどれとも一致しない場合、`<select>` 要素は “未選択” の状態で描画されます。iOS ではこの場合、iOS が change イベントを発生させないため、最初のアイテムを選択できなくなります。したがって、例に示すように、disabled な空の値のオプションを追加しておくことをおすすめします。

```html
<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
<span>Selected: {{ selected }}</span>
```

## 値のバインディング

通常は値は文字列や boolean なのだが、`v-bind:value` でオブジェクト等を渡すことが可能

だが、これは特殊なので、出来ることだけを認知しておいて、必要になった時に調べるくらいで良さそう

## 修飾子

### `.lazy`

デフォルトでは、 v-model は各 input イベント (上記の IME 確定前を除いて) 後に、データと入力を同期します。 change イベント後に同期するように変更するために lazy 修飾子を追加することができます:

```html
<!-- "input" の代わりに "change" 後に同期します -->
<input v-model.lazy="msg" />
```

### `.number`

ユーザの入力を数値として自動的に型変換したいとき、 v-model に管理された入力に number 修飾子を追加することができます:

```html
<input v-model.number="age" type="number" />
```

これは、しばしば有用です。なぜなら、 type=number と書いたときでさえ、 HTML の input 要素の value は常に文字列を返すからです。もし値が parseFloat() で解釈できない場合は、もとの値が返却されます。

### `.trim`

ユーザの入力から空白を自動的に取り除きたいときは、 v-model に管理された入力に trim 修飾子を追加することができます:

```html
<input v-model.trim="msg" />
```
