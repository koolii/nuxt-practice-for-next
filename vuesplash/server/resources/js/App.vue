<template>
  <div>
    <header>
      <Navbar />
    </header>
    <main>
      <div class="container">
        <RouterView />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import { CODE } from "./util";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer
  },
  computed: {
    // 算出プロパティでerrorCodeの参照を得る
    errorCode() {
      return this.$store.state.error.code;
    }
  },
  watch: {
    // 参照プロパティをwatchで監視する
    errorCode: {
      handler(val) {
        if (val === CODE.INTERNAL_SERVER_ERROR) {
          this.$router.push("/500");
        }
      },
      immediate: true
    },
    $route() {
      this.$store.commit("error/setCode", null);
    }
  }
};
</script>
