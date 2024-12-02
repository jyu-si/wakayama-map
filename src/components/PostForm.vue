<template>
  <div class="post-form">
    <h2>新しい投稿を追加</h2>

    <!-- 写真選択 -->
    <div>
      写真:
      <input type="file" @change="handleFileChange" />
    </div>

    <!-- コメント入力 -->
    <div>
      コメント:
      <textarea v-model="comment" placeholder="コメントを入力してください"></textarea>
    </div>

    <!-- エラーメッセージ表示 -->
    <div v-if="error" class="error">{{ error }}</div>

    <!-- 投稿ボタン -->
    <button @click="submitPost">投稿する</button>
  </div>
</template>

<script>
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage用
import { addDoc, collection } from "firebase/firestore"; // Firestore用
import { db, storage } from "../firebaseConfig"; // Firebase設定ファイルをインポート

export default {
  name: "PostForm",
  props: ["id"], // URLからスポットIDを受け取る
  data() {
    return {
      photo: null, // 選択された写真
      comment: "", // コメント
      error: null, // エラーメッセージ
      uploading: false, // アップロード中の状態
    };
  },
  methods: {
    handleFileChange(event) {
      // 写真ファイルが選択されたときに呼び出される
      this.photo = event.target.files[0];
      console.log("選択された写真:", this.photo);
    },
    async submitPost() {
      // 写真またはコメントが未入力の場合
      if (!this.photo || !this.comment) {
        this.error = "写真とコメントを入力してください。";
        return;
      }

      this.uploading = true;
      this.error = null;

      try {
        // Firebase Storage に写真をアップロード
        const storageRef = ref(storage, `posts/${Date.now()}_${this.photo.name}`);
        const snapshot = await uploadBytes(storageRef, this.photo);
        const photoUrl = await getDownloadURL(snapshot.ref);

        // Firestore に投稿データを保存
        await addDoc(collection(db, "posts"), {
          spotId: this.id, // スポットID
          photoUrl, // 写真URL
          comment: this.comment, // コメント
          createdAt: new Date(), // 投稿日時
        });

        alert("投稿が完了しました！");
        this.$router.push(`/spot/${this.id}`);
      } catch (error) {
        console.error("投稿中にエラーが発生しました:", error);
        this.error = "投稿に失敗しました。もう一度試してください。";
      } finally {
        this.uploading = false;
      }
    },
  },
};
</script>

<style>
.error {
  color: red;
}
</style>
