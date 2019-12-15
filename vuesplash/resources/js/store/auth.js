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
    try {
      const response = await axios.post('/api/register', data);
      context.commit('setUser', response.data);
    } catch (e) {
      console.error(JSON.stringify(e));
      throw new Error(e);
    }
  },
  async login(context, data) {
    try {
      const response = await axios.post('/api/login', data)
      context.commit('setUser', response.data)
    } catch (e) {
      console.log(JSON.stringify(e));
      throw new Error(e);
    }
  },
  async logout(context) {
    const response = await axios.post('/api/logout');
    context.commit('setUser', null);
  }
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
