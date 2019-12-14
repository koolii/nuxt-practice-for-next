// 認証関係のデータが入るストア

const state = {};
const getters = {}
const mutations = {}
const actions = {}

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
