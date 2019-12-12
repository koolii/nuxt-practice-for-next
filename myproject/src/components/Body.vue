<template>
  <div>
    <h2>{{ title }}</h2>
    <p>{{ text }}</p>
    <p>
      <button v-on:click="increment">+1</button>
      {{ count }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Body",
      text: "Have a good day",
      count: 0
    };
  },
  methods: {
    increment() {
      this.count += 1;
      this.$emit("add", this.count);
    }
  }
};
</script>

<style scoped>
div {
  border: 1px solid red;
}
h2 {
  color: red;
}
p {
  color: red;
}
</style>