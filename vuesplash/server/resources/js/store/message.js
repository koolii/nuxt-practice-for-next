const state = {
  content: ''
};

const mutations = {
  setContent(state, {
    content,
    timeout
  }) {
    state.content = content;

    if (typeof time === 'undefined') {
      timeout = 3000;
    }

    // mutationに非同期処理を入れてもいいのね。
    // actionではなく
    // content disappers next timeout
    setTimeout(() => (state.content = ''), timeout);
  }
};


export default {
  namespaced: true,
  state,
  mutations,
}
