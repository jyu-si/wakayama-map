<template>
  <div id="app">
    <!-- トップバーをインポートして配置 -->
    <TopBar />
    <!-- メインコンテンツ -->
    <router-view />
  </div>
</template>

<script>
import TopBar from "./layout/TopBar.vue";

export default {
  components: {
    TopBar,
  },
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
