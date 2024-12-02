<template>
  <div class="spot-posts">
    <h2>{{ spotName }} の投稿一覧</h2>

    <!-- 投稿一覧の表示 -->
    <div v-if="posts.length" class="posts-list">
      <div v-for="post in posts" :key="post.id" class="post-card">
        <img :src="post.photoUrl" alt="投稿写真" class="post-image" />
        <div class="post-content">
          <p class="post-comment">{{ post.comment }}</p>
          <small class="post-date">{{ post.createdAt.toDate().toLocaleString() }}</small>
        </div>
      </div>
    </div>
    <p v-else>投稿がまだありません。</p>

    <!-- 投稿するボタン -->
    <button @click="goToPostForm" class="post-button">投稿する</button>
  </div>
</template>

<script>
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default {
  name: "SpotPosts",
  props: ["id"], // スポットIDを受け取る
  data() {
    return {
      spotName: "", // スポット名
      posts: [], // 投稿データ
    };
  },
  async created() {
    try {
      // スポット名を取得（オプション: Firestoreに保存されている場合）
      const spotsCollection = collection(db, "spots");
      const spotSnapshot = await getDocs(spotsCollection);
      const spot = spotSnapshot.docs.find((doc) => doc.id === this.id);
      this.spotName = spot?.data()?.name || "不明なスポット";

      // 投稿データを取得
      const postsCollection = collection(db, "posts");
      const q = query(
        postsCollection,
        where("spotId", "==", this.id), // スポットIDで絞り込み
        orderBy("createdAt", "desc")   // 作成日時で降順並べ替え
      );
      
      const snapshot = await getDocs(q);
      this.posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("投稿データの取得中にエラーが発生しました: ", error);
    }
  },
  methods: {
    // 投稿画面に遷移
    goToPostForm() {
      this.$router.push(`/spot/${this.id}/new-post`);
    },
  },
};
</script>

<style scoped>
.spot-posts {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.post-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.post-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.post-content {
  padding: 15px;
}

.post-comment {
  font-size: 16px;
  margin: 10px 0;
  color: #555;
}

.post-date {
  font-size: 12px;
  color: #888;
}

.post-button {
  display: block;
  width: 100%;
  max-width: 200px;
  margin: 20px auto;
  padding: 10px 20px;
  background: #007bff;
  color: #fff;
  text-align: center;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.post-button:hover {
  background: #0056b3;
}
</style>
