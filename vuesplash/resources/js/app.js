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

new Vue({
  el: "#app",
  router,
  store,
  components: {
    App
  },
  template: "<App />"
});
