// 認証関係のデータが入るストア

const state = {
  user: null
}

const getters = {}

const mutations = {
  setUser(state, user) {
    state.user = user;
  }
}

// アクション->ミューテーション->コミットでステートを更新
// contextは必ず第一引数になり、ここからミューテーションを呼び出すことが出来る
const actions = {
  async register(context, data) {
    const response = await axios.post('/api/register', data);
    // console.log(JSON.stringify(response));
    context.commit('setUser', response.data);
  },
  login() {},
  logout() {}
}

export default {
  // モジュール毎にストアを分けるので、
  // ステートやミューテーションの名前が被っても
  // モジュール名で区別できるようにする
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
