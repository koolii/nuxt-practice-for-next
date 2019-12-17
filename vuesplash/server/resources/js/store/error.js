const state = {
  code: null
}

const mutations = {
  setCode(code) {
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
