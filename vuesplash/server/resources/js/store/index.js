import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import error from './error'

Vue.use(Vuex)

// ストアは種類に応じてモジュールとして分けて作成可能
// 種類によってストアを分けると情報の複雑化を防げる
const store = new Vuex.Store({
  modules: {
    auth,
    error
  }
})

export default store
