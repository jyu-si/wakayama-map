import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0", // 外部アクセスを許可
    port: 5173, // ポート番号
    strictPort: true, // ポートが使用中の場合にエラーを出す（他のポートに移らない）
    open: false, // サーバー起動時に自動でブラウザを開かない
  },
});
