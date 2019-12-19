<template>
  <!-- フォームを表示するかどうかを示す変数を v-model で管理 -->
  <!-- v-showで管理 -->
  <div v-show="value" class="photo-form">
    <h2 class="title">Subimit a photo</h2>
    <form class="form">
      <input class="form__item" type="file" />
      <div class="form__button">
        <button type="submit" class="button button--inverse">submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  // valueを受け取れるようにpropsを追加
  props: {
    value: {
      type: Boolean,
      required: true
    }
  }
};
</script>