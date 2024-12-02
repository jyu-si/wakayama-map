import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyDTP2PDWSXVpL-BnKcocXv1bnphPdLRvy0",
  authDomain: "wakayama-app-991cb.firebaseapp.com",
  projectId: "wakayama-app-991cb",
  storageBucket: "wakayama-app-991cb.firebasestorage.app",
  messagingSenderId: "231723373613",
  appId: "1:231723373613:web:b505d781a7421b6ec8d4a4",
  measurementId: "G-RHZ39CTKC5"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export { db, auth, storage };

