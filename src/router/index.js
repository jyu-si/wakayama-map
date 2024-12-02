import { createRouter, createWebHistory } from "vue-router";
import MapComponent from "@/components/MapComponent.vue"; // 地図コンポーネントをインポート
import SpotPosts from "@/components/SpotPosts.vue"; // 投稿一覧画面のコンポーネントをインポート
import PostForm from "@/components/PostForm.vue";
import PostDetail from "../components/PostDetail.vue";

const routes = [
  {
    path: "/", // 地図画面をトップページとして設定
    component: MapComponent,
  },
  {
    path: "/auth-test", // テスト用のルート
    component: () => import("@/components/AuthTest.vue"), // 動的インポートに変更（軽量化のため）
  },
  {
    path: "/spot/:id", // スポットごとの投稿一覧画面へのルート
    component: SpotPosts,
    props: true, // URLパラメータをコンポーネントに渡す
  },
  // 新しい投稿画面
  { path: "/spot/:id/new-post",
    component: PostForm, 
    props: true 
  },
  {
    path: "/post/:id", // PostDetail へのルート
    name: "PostDetail",
    component: PostDetail,
    props: true, // URL パラメータを props として渡す
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
