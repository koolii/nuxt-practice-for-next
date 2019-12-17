import './bootstrap';
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store';
import './bootstrap';

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

const createApp = async () => {
  // * 起動時にログインチェック
  // ブラウザをリロードしたりするとstateの情報が全て空になってしまう
  // なので、APIサーバではログイン中のセッションを持つが、ブラウザはログアウト状態になってしまう
  // 自分自身が現在ログイン中なのかどうかチェックする
  await store.dispatch('auth/currentUser');

  new Vue({
    el: "#app",
    router,
    store,
    components: {
      App
    },
    template: "<App />"
  });
};

createApp();
