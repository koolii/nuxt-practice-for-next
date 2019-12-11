# Vuejs の学習 (nuxt へ向けて)

https://jp.vuejs.org/v2/guide/

## mustache 構文

`{{ xxx }}` と言うように中括弧で変数などを文字列化させて HTML に埋め込むこと

ただ、HTML タグ内部に直接これを使用できない
なので、 `<div v-bind:TAG_NAME="dynamicId" />` のようにする

a タグ等も同様に href タグなどに引数として値を渡すことが可能で
その場合は、 v-bind:href="url"とするこうすると、式 url の値を a タグに束縛することを伝える
(上の dynamicId も同じ)

結論 v-bind ディレクティブと紐付け先をペアとして使う

## ディレクティブ

`v-`から始まる特別な属性で、求める値は `単一のJavaScript式` (v-for 以外)

属性値の式が変化した時に、副作用を DOM に適用することが期待されている

## 動的引数(< 2.6.0) 比較的新しい仕様

角カッコ(`[]`) を使用することでディレクティブの引数に使用可能、下記参照

```html
<a v-bind:[attributeName]="url">...</a>
<a v-on:[eventName]="doSomething">...</a>
```

attribute や eventName の値によって、url や doSomething が変化する
例えば attribute が href,eventName が focus の時は

v-bind:href だし、v-on:focus となる
ただし、これらの値に string 以外や、null を渡すと危険。null はバインドを削除することになる

また、今回は attributeName/eventName としているが in-DOM テンプレート中では大文字は全て小文字化するので注意

## 高頻度の v-bind の省略記法 => `:`

`:` を使う

```html
<a v-bind:href="url">...</a>
<a :href="url">...</a>
<a :[key]="url">...</a>
```

## 高頻度の v-on の省略記法 => `@`

`@`を使う

```html
<a v-on:click="doSomething">...</a>
<a @click="doSomething">...</a>
<a @[event]="doSomething">...</a>
```
