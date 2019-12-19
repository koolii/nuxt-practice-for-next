<template>
  <div class="photo-list">
    <div class="grid">
      <Photo class="grid__item" v-for="photo in photos" :key="photo.id" :item="photo" />
    </div>
  </div>
</template>

<script>
import Photo from "../components/Photo";
import { PHOTO } from "../util";

export default {
  components: {
    Photo
  },
  data() {
    return {
      photos: []
    };
  },
  methods: {
    async fetchPhotos() {
      const wait = sec =>
        new Promise(resolve => {
          setTimeout(resolve, sec * 1000);
        });

      await wait(0.5);

      this.photos = PHOTO;
    }
  },
  watch: {
    // ページがココに切り替わった時に、fetchPhotos()が実行される
    // immediate:trueなのでコンポーネントが生成されたタイミングでも実行される
    // created()で呼ぶとVueのコンポーネントを使い回す性質から次ページからfetchPhotos()が呼ばれない
    $route: {
      // これだけだと初めて <PhotoList> をレンダリングする時に実行されない
      async handler() {
        await this.fetchPhotos();
      },
      // 初回レンダリング用に immedaite: true を設定する
      immediate: true
    }
  }
};
</script>