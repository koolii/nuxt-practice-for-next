import {
  CODE
} from '../util'

const state = {
  user: null,
  apiStatus: null,
  loginErrorMessages: null,
}

const getters = {
  check: state => !!state.user,
  username: state => state.user ? state.user.name : ''
}

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setApiStatus(state, code) {
    state.apiStatus = code;
  },
  setLoginErrorMessages(state, messages) {
    state.loginErrorMessages = messages;
  },
}

// アクション->ミューテーション->コミットでステートを更新
// contextは必ず第一引数になり、ここからミューテーションを呼び出すことが出来る
const actions = {
  async register(context, data) {
    const response = await axios.post('/api/register', data);
    context.commit('setUser', response.data);
  },
  async login(context, data) {
    context.commit('setApiStatus', null);

    // /500ページに遷移を検証できる
    // throw new Error('api test');

    // 成功失敗に関わらず全てにおいてresponseに値を代入
    const response = await axios
      .post('/api/login', data)

    if (response.status === CODE.OK) {
      context.commit('setApiStatus', true);
      context.commit('setUser', response.data)
      return false;
    }

    context.commit('setApiStatus', false);

    if (response.status === CODE.UNPROCESSABLE_ENTITY) {
      // ログイン画面にエラーメッセージを表示するので画面遷移はしない
      context.commit('setLoginErrorMessages', response.data.errors);
    } else {
      // 通信失敗した場合はerrorストアのsetCode()ミューテーションをcommitする
      // だが、ここはauthストアなので、別のストアのミューテーションを呼び出す時は
      // 第三引数に `{ root: true }` を追加する必要がある
      context.commit('error/setCode', response.status, {
        root: true
      });
    }
  },
  async logout(context) {
    await axios.post('/api/logout');
    context.commit('setUser', null);
  },
  async currentUser(context) {
    const response = await axios.get('/api/user');
    const user = response.data || null;
    context.commit('setUser', user);
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
