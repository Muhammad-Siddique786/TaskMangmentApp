import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC9H954lFeZj54WpSq7GuKEtrMTcNMgw0M",
  authDomain: "taskmanegment-app.firebaseapp.com",
  projectId: "taskmanegment-app",
  storageBucket: "taskmanegment-app.firebasestorage.app",
  messagingSenderId: "258430116591",
  appId: "1:258430116591:web:1f81cf8667f4184c78711a",
  measurementId: "G-6NXQ0663NB"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);