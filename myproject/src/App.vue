<template>
  <div>
    <Header :username="name" v-model="InputData.condition">
      <!-- 子コンポーネント名のタグ名内にtemplateを書くとコレを渡すことが出来る -->
      <!-- 今回はスロット名はmessage -->
      <!-- 複数のスロットを用意すればいくつもtemplateを渡せる -->
      <template v-slot:message>
        <p>Let's enjoy programming :)</p>
      </template>
    </Header>
    <Body v-on:add="add1"></Body>
    <Body v-on:add="add2"></Body>
    <p>total: {{ totalcount }}</p>
    <p>condition: {{ InputData.condition }}</p>

    <button @click="componentName = 'Header'">Header</button>
    <button @click="componentName = 'Body'">Body</button>
    <!-- is=[コンポーネント]を書くと、使用するコンポーネントを指定可能 -->
    <!-- ただ、これだと切り替わるたびに初期化される -->
    <!-- それを回避するために keep-aliveタグを使う -->
    <!-- これを使うと状態を保持したまま切り替えることが可能 -->
    <keep-alive>
      <component :is="componentName"></component>
    </keep-alive>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Body from "./components/Body.vue";

// 親から子へデータの伝搬についてはカスタムタグから渡す(:username)
// そして子は受け取り方としてpropsのオブジェクトに受け付けるカスタムタグを定義する

export default {
  data() {
    return {
      name: "kiyokiyo",
      count1: 0,
      count2: 0,
      totalcount: 0,
      InputData: {
        condition: ""
      },
      componentName: "Header"
    };
  },
  components: {
    Header,
    Body
  },
  methods: {
    add1(count) {
      this.count1 = count;
      this.totalcount = this.count1 + this.count2;
    },
    add2(count) {
      this.count2 = count;
      this.totalcount = this.count1 + this.count2;
    }
  }
};
</script>

<style scoped>
/* スタイル情報も子に渡しても親の情報を元にしているので、文字は緑のまま */
p {
  color: green;
}
</style>