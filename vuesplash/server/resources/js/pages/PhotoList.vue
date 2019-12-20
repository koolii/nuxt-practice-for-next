<template>
  <div class="photo-list">
    <div class="grid">
      <Photo class="grid__item" v-for="photo in photos" :key="photo.id" :item="photo" />
    </div>
    <Pagination :current-page="currentPage" :last-page="lastPage" />
  </div>
</template>

<script>
import Pagination from "../components/Pagination.vue";
import Photo from "../components/Photo.vue";
import { PHOTO, CODE } from "../util";

export default {
  components: {
    Pagination,
    Photo
  },
  props: {
    page: {
      type: Number,
      required: false,
      default: 1
    }
  },
  data() {
    return {
      photos: [],
      currentPage: 0,
      lastPage: 0
    };
  },
  methods: {
    async fetchPhotos() {
      const limit = 6;
      const wait = sec =>
        new Promise(resolve => {
          setTimeout(resolve, sec * 1000);
        });

      await wait(0.5);

      // double -> int
      this.lastPage = Math.floor(PHOTO.length / limit + 1);
      this.currentPage = this.page;
      this.photos = [];

      const start = (this.currentPage - 1) * limit;
      for (let i = start; i < start + limit; i++) {
        if (i < PHOTO.length) {
          this.photos.push(PHOTO[i]);
        }
      }
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