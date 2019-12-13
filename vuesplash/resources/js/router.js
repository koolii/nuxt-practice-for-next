import Vue from 'vue';
import VueRouter from 'vue-router';

import PhotoList from './pages/PhotoList.vue'
import Login from './pages/Login.vue'

Vue.use(VueRouter);

const routes = [{
    path: '/',
    component: PhotoList
  },
  {
    path: '/login',
    component: Login
  }
]

// mode: 'history'を追加すると、/#/からの管理から外れる
// 元々はURL文字列内のハッシュの変化では画面遷移しないブラウザ仕様利用したもの
const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
