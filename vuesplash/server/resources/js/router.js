import Vue from 'vue';
import VueRouter from 'vue-router';

import PhotoList from './pages/PhotoList.vue'
import Login from './pages/Login.vue'
import SystemError from './pages/errors/System'
import PhotoDetail from './pages/PhotoDetail.vue'
import NotFound from './pages/errors/NotFound.vue'

import store from './store';

Vue.use(VueRouter);

const routes = [{
    path: '*',
    component: NotFound,
  }, {
    path: '/',
    component: PhotoList,
    // propsとしてクエリパラメータのpageが渡される
    props: route => {
      const page = route.query.page;
      console.log(`Query Parameter page: ${page}`);

      return {
        // [1-9]が1個
        // [0-9]が0個以上
        page: /^[1-9][0-9]*$/.test(page) ? page * 1 : 1
      };
    }
  },
  {
    path: '/500',
    component: SystemError
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
  },
  {
    // :idが変数部分と言うことで、props:trueを追加
    path: '/photos/:id',
    component: PhotoDetail,
    props: true
  }
]

// mode: 'history'を追加すると、/#/からの管理から外れる
// 元々はURL文字列内のハッシュの変化では画面遷移しないブラウザ仕様利用したもの
const router = new VueRouter({
  mode: 'history',
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    };
  },
  routes
});

export default router;
