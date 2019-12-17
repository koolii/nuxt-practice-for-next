const state = {
  code: null
}

const mutations = {
  setCode(state, code) {
    state.code = code;
  }
}

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
