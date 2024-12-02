<template>
  <!-- ヘッダー -->
  <v-app-bar color="orange darken-2" app dense class="custom-app-bar">
    <div class="menu-button" @click="drawer = !drawer">
      <span class="menu-text">串本町</span> <!-- 「mdi-menu」を「串本町」に変更 -->
    </div>
    <v-toolbar-title class="app-title">和歌山マップアプリ</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
  }),
  methods: {
    onGiftClick() {
      console.log("Gift clicked");
      this.$router.push("/mogilist1116");
    },
    onMapClick() {
      console.log("Map clicked");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
/* ヘッダーのカスタムスタイル */
.custom-app-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center; /* 水平方向に中央揃え */
  align-items: center; /* 垂直方向に中央揃え */
  padding: 0 16px;
  background-color: orange; /* 背景色を明示的に設定 */
}

/* メニューアイコンのスタイル */
.menu-button {
  position: absolute; /* 左側に固定配置 */
  left: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.menu-text {
  font-size: 16px;
  color: white;
  font-weight: bold;
}

.app-title {
  font-size: 22px;
  color: white;
  font-weight: bold;
  text-align: center;
}
</style>
