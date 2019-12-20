<template>
  <div v-if="photo" class="photo-detail" :class="{ 'photo-detail--column': fullWidth }">
    <figure class="photo-detail__pane photo-detail__image" @click="fullWidth = ! fullWidth">
      <img :src="photo.url" alt />
      <figcaption>Posted by {{ photo.owner.name }}</figcaption>
    </figure>
    <div class="photo-detail__pane">
      <button class="button button--like" title="Like photo">
        <i class="icon ion-md-heart"></i>12
      </button>
      <a :href="`/photos/${photo.id}/download`" class="button" title="Download photo">
        <i class="icon ion-md-arrow-round-down"></i>Download
      </a>
      <h2 class="photo-detail__title">
        <i class="icon ion-md-chatboxes"></i>Comments
      </h2>
    </div>
  </div>
</template>

<script>
import { CODE, PHOTO } from "../util";

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      photo: null,
      fullWidth: false
    };
  },
  methods: {
    async fetchPhoto() {
      const wait = sec =>
        new Promise(resolve => {
          setTimeout(resolve, sec * 1000);
        });

      await wait(0.5);

      const photos = PHOTO.filter(photo => +photo.id === +this.id);
      if (photos.length > 1) {
        this.$store.commit("error/setCode", CODE.INTERNAL_SERVER_ERROR);
        return false;
      }

      this.photo = photos[0];
    }
  },
  watch: {
    $route: {
      async handler() {
        await this.fetchPhoto();
      },
      immediate: true
    }
  }
};
</script>