<template>
  <div class="container--small">
    <ul class="tab">
      <!-- :classの値を修正すると、クラスの付与等ができるようになる -->
      <!-- ここは tab === 1なら tab__item--activeクラスが付与される -->
      <li class="tab__item" :class="{ 'tab__item--active': tab === 1 }" @click="tab = 1">Login</li>
      <li class="tab__item" :class="{ 'tab__item--active': tab === 2 }" @click="tab = 2">Register</li>
    </ul>
    <div class="panel" v-show="tab === 1">
      <!-- event.prevent()を呼び出しつつsubmitハンドラをlogin()として紐付け -->
      <form class="form" @submit.prevent="login">
        <div v-if="loginErrors" class="errors">
          <ul v-if="loginErrors.email">
            <li v-for="msg in loginErrors.email" :key="msg">{{ msg }}</li>
          </ul>
          <ul v-if="loginErrors.password">
            <li v-for="msg in loginErrors.password" :key="msg">{{ msg }}</li>
          </ul>
        </div>
        <label for="login-email">Email</label>
        <input type="text" class="form__item" id="login-email" v-model="loginForm.email" />
        <label for="login-password">Password</label>
        <input type="password" class="form__item" id="login-password" v-model="loginForm.password" />
        <div class="form__button">
          <button type="submit" class="button button--inverse">login</button>
        </div>
      </form>
    </div>
    <div class="panel" v-show="tab === 2">
      <form class="form" @submit.prevent="register">
        <label for="username">Name</label>
        <input type="text" class="form__item" id="username" v-model="registerForm.name" />
        <label for="email">Email</label>
        <input type="text" class="form__item" id="email" v-model="registerForm.email" />
        <label for="password">Password</label>
        <input type="password" class="form__item" id="password" v-model="registerForm.password" />
        <label for="password-confirmation">Password (confirm)</label>
        <input
          type="password"
          class="form__item"
          id="password-confirmation"
          v-model="registerForm.password_confirmation"
        />
        <div class="form__button">
          <button type="submit" class="button button--inverse">register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      tab: 1,
      loginForm: {
        email: "",
        password: ""
      },
      registerForm: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      }
    };
  },
  computed: {
    // apiStatus() {
    //   // ログインが成功したかどうかを取得
    //   return this.$store.state.auth.apiStatus;
    // },
    // loginErrors() {
    //   return this.$store.state.auth.loginErrorMessages;
    // }
    // vuexのmapStateを使うと更に書きやすくなる
    // コンポーネントの算出プロパティとストアのステートをマッピングする関数
    // 中身は同じだから好きな使い方で
    ...mapState({
      apiStatus: state => state.auth.apiStatus,
      loginErrors: state => state.auth.loginErrorMessages
    })
  },
  methods: {
    // ログインエラーを消すリクエスト
    clearError() {
      this.$store.commit("auth/setLoginErrorMessages", null);
    },
    async login() {
      await this.$store.dispatch("auth/login", this.loginForm);

      // ログイン成功したときだけ、トップページに遷移する
      if (this.apiStatus) {
        this.$router.push("/");
      }
    },
    async register() {
      // Vuexをuse()しているのでthis.$storeでStoreを参照することが出来る
      // dispatch()で登録したアクションを呼び出せる
      // "auth/" がプレフィックスになっているが、これはauth.jsの "namspaced:true" にしているから
      await this.$store.dispatch("auth/register", this.registerForm);
      // /に移動する
      this.$router.push("/");
    }
  },
  created() {
    // 今のままだと一度別ページへ移動し、元に戻るとまだエラーが表示されたまま
    // なので、 `created` ライフサイクルフックでエラーを消す
    this.clearError();
  }
};
</script>
