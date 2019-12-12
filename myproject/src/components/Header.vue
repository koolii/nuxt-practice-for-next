<template>
  <header>
    <h1>{{ title }}</h1>
    <p>{{ text }}</p>
    <!-- 親から渡されたhtmlはslotタグとname属性で場所を特定できる -->
    <slot name="message"></slot>
    <p>Welcome! {{ username }}</p>

    <label for="condition">How are you?</label>
    <!-- コンポーネント間の双方向データバインディングの場合、$emitの中身のイベント名inputと、propsで受け取る変数名valueは必ずこの名前にしないといけないので注意です。 -->
    <!-- v-modelは内部的にinputイベントを保持しており、inputイベントが発火するたびに引数として渡されたデータ（今回で言うと$event.target.value）で、
    指定した変数（今回で言うとInputData.condition）を更新するようになっています。
    また、v-modelはv-bind:valueを内部的に保持しているため、指定した変数が親コンポーネント側の処理で書き換わった場合、
    その内容が即時に子コンポーネントにも反映されるようになります。
    子コンポーネントで必ずinput及びvalueを使わないといけなかったのは、
    親コンポーネントのv-modelで内部保持している名称に合わせる必要があったから-->
    <input id="condition" type="text" :value="value" @input="$emit('input', $event.target.value)" />
  </header>
</template>

<script>
export default {
  props: {
    username: String,
    // 親側でv-modelで指定した属性(InputData.condition)が渡される
    value: String
  },
  data() {
    return {
      title: "Header",
      text: "Hello Vue.js"
    };
  }
};
</script>

<style scoped>
/* scopedはこのコンポーネントのみにstyleを適用するという意味 */
header {
  border: 1px solid blue;
}
h1 {
  color: blue;
}
p {
  color: blue;
}
</style>