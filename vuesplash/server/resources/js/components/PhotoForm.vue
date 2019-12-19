<template>
  <!-- フォームを表示するかどうかを示す変数を v-model で管理 -->
  <!-- v-showで管理 -->
  <div v-show="value" class="photo-form">
    <h2 class="title">Subimit a photo</h2>
    <form class="form" @submit.prevent="submit">
      <div class="errors" v-if="errors">
        <ul v-if="errors.photo">
          <li v-for="msg in errors.photo" :key="msg">{{ msg }}</li>
        </ul>
      </div>
      <input class="form__item" type="file" @change="onFileChange" />
      <output class="form__output" v-if="preview">
        <img :src="preview" alt />
      </output>
      <div class="form__button">
        <button type="submit" class="button button--inverse">submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import { CODE } from "../util";

export default {
  // valueを受け取れるようにpropsを追加
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      preview: null,
      photo: null,
      errors: null
    };
  },
  methods: {
    onFileChange(event) {
      if (event.target.files.length === 0) {
        this.reset();
        return false;
      }

      // csvは `text/csv`
      const file = event.target.files[0];
      console.log(`this file type is ${file.type}`);

      // if a file is not image file
      if (!file.type.match("image.*")) {
        this.reset();
        return false;
      }

      const reader = new FileReader();

      // define what reader does after finishing reading the file
      reader.onload = e => {
        // previewに読み込み結果のデータURLが代入される
        // previewに値が入ると<output>のv-ifがtrue判定に
        // <img>のsrc属性はpreviewの値なので、画像が表示
        this.preview = e.target.result;
      };

      // read the file
      reader.readAsDataURL(file);

      this.photo = file;
    },
    reset() {
      this.preview = "";
      this.photo = null;
      // this.$elはコンポーネントそのもののDOM
      this.$el.querySelector('input[type="file"]').value = null;
    },
    submit() {
      // Ajaxでファイル送信にHTML5のFormDataAPIを利用
      const formData = new FormData();
      formData.append("photo", this.photo);

      // 今回はファイルアップロード自体は必要ない(API用意してない)ので
      // const response = await axios.post("/api/photos", formData);

      this.reset();
      // inputイベントを発生させてフォームを閉じる。
      // らしいが、なんでinputイベントでフォームが閉じる？？？？
      this.$emit("input", false);

      // 一応errorハンドラだけは用意
      // 後から見直した時に参考にできるように
      const test = 1000;
      if (test === CODE.UNPROCESSABLE_ENTITY) {
        this.$store.commit("eror/setCode", test);
        return false;
      }

      // 固定でページ遷移するようにした
      this.$router.push("/photos/1");
    }
  }
};
</script>