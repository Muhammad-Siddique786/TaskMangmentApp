import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC9H954lFeZj54WpSq7GuKEtrMTcNMgw0M",
  authDomain: "taskmanegment-app.firebaseapp.com",
  projectId: "taskmanegment-app",
  storageBucket: "taskmanegment-app.appspot.com", // ⚠️ FIXED
  messagingSenderId: "258430116591",
  appId: "1:258430116591:web:1f81cf8667f4184c78711a",
  measurementId: "G-6NXQ0663NB"
};

// ✅ STEP 1: initialize app
const app = initializeApp(firebaseConfig);

// ✅ STEP 2: services export
export const auth = getAuth(app);
export const db = getFirestore(app);