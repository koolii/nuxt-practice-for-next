import Vue from 'vue';
import VueRouter from 'vue-router';

import PhotoList from './pages/PhotoList.vue'
import Login from './pages/Login.vue'

import store from './store';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    component: PhotoList
  },
  {
    path: '/login',
    component: Login,
    // 次のページを制御できる
    // ページコンポーネントが切り替わる直前に呼び出される関数
    // next()ならそのまま順当に次ページへ行く
    beforeEnter(to, from, next) {
      // storeにuser変数があるか
      if (store.getters['auth/check']) {
        next('/');
      } else {
        next();
      }
    }
  }
]

// mode: 'history'を追加すると、/#/からの管理から外れる
// 元々はURL文字列内のハッシュの変化では画面遷移しないブラウザ仕様利用したもの
const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
