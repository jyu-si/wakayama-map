<template>
  <div class="post-detail">
    <h2>{{ post?.comment || "投稿詳細" }}</h2>
    <img :src="post?.photoUrl" alt="投稿写真" class="post-image" />
    <small>{{ post?.createdAt?.toDate().toLocaleString() }}</small>
    <p v-if="post">{{ post.comment }}</p>

    <h3>コメント一覧</h3>
    <div v-if="comments.length" class="comments-list">
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <p>{{ comment.comment }}</p>
        <small>{{ comment.createdAt.toDate().toLocaleString() }}</small>
      </div>
    </div>
    <p v-else>コメントがまだありません。</p>

    <h3>コメントを追加</h3>
    <textarea v-model="newComment" placeholder="コメントを入力してください"></textarea>
    <button @click="addComment">コメントを投稿</button>
  </div>
</template>

<script>
import { collection, doc, getDoc, addDoc, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default {
  name: "PostDetail",
  props: ["id"], // 投稿IDをURLから受け取る
  data() {
    return {
      post: null, // 投稿データ
      comments: [], // コメント一覧
      newComment: "", // 新しいコメント
      unsubscribe: null, // リアルタイムリスナー解除用
    };
  },
  created() {
    try {
      // 投稿データを取得
      const postDoc = doc(db, "posts", this.id);
      getDoc(postDoc).then(postSnapshot => {
        this.post = postSnapshot.exists() ? { id: postSnapshot.id, ...postSnapshot.data() } : null;
      });

      // コメントのリアルタイムリスナーを設定
      const commentsCollection = collection(db, "comments");
      const commentsQuery = query(
        commentsCollection,
        where("postId", "==", this.id), // postId に一致するコメントを取得
        orderBy("createdAt", "desc")  // 投稿日時で降順ソート
      );

      // onSnapshot でリアルタイム更新を設定
      this.unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
        this.comments = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
      });
    } catch (error) {
      console.error("リアルタイムリスナーの設定中にエラーが発生しました:", error);
    }
  },
  beforeUnmount() {
    // リアルタイムリスナーを解除
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  },
  methods: {
    async addComment() {
      if (!this.newComment) {
        alert("コメントを入力してください");
        return;
      }

      try {
        const commentsCollection = collection(db, "comments");
        await addDoc(commentsCollection, {
          postId: this.id, // 関連付ける投稿ID
          comment: this.newComment, // 新しいコメント
          createdAt: new Date(), // 現在時刻
        });

        this.newComment = ""; // 入力フォームをリセット
      } catch (error) {
        console.error("コメントの投稿中にエラーが発生しました:", error);
      }
    },
  },
};
</script>

<style scoped>
.post-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h2, h3 {
  color: #333;
}

.post-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.comments-list {
  margin-top: 20px;
}

.comment-item {
  background: #f9f9f9;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

textarea {
  width: 100%;
  height: 80px;
  margin-top: 10px;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}
</style>
