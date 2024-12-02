<template>
  <div id="map" style="height: 100vh; width: 100%;"></div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader";
import { collection, getDocs } from "firebase/firestore"; // Firestoreからデータ取得用
import { db } from "../firebaseConfig"; // Firebase設定ファイル

export default {
  name: "MapComponent",
  mounted() {
    const loader = new Loader({
      apiKey: "AIzaSyA8P-JJwpR-JVZqzBBtdN7lx-TvRs1M-Hw", // Google Maps APIキーを設定
      version: "weekly",
    });

    loader.load().then(() => {
      // Google Mapsを初期化
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 33.4672, lng: 135.7775 }, // 串本町を中心に設定
        zoom: 13.5, // ズームレベル
      });

      // マーカーを地図に追加
      this.addMarkers(map);
    });
  },
  methods: {
    // Firestoreからスポット情報を取得
    async fetchSpots() {
      try {
        const spotsCollection = collection(db, "spots");
        const snapshot = await getDocs(spotsCollection);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error("スポット情報の取得に失敗しました: ", error);
        return []; // エラー時は空の配列を返す
      }
    },

    // 地図にマーカーを追加
    async addMarkers(map) {
      try {
        const spots = await this.fetchSpots(); // スポット情報を取得
        spots.forEach((spot) => {
          if (spot.location && spot.location.lat && spot.location.lng) {
            // マーカーを地図上に配置
            const marker = new google.maps.Marker({
              position: { lat: spot.location.lat, lng: spot.location.lng },
              map: map,
              title: spot.name, // スポット名をツールチップに表示
            });

            // マーカークリック時のイベント
            marker.addListener("click", () => {
              // マーカークリック時の処理
              this.$router.push(`/spot/${spot.id}`); // 投稿一覧画面に遷移
            });
          } else {
            console.warn("無効なスポット情報が含まれています: ", spot);
          }
        });
      } catch (error) {
        console.error("マーカーの追加中にエラーが発生しました: ", error);
      }
    },
  },
};
</script>

