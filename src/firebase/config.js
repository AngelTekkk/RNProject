import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmvMfH4LxAOlNoFh_qeY84GkiqfJ3jCJs",
  authDomain: "rnproject-73397.firebaseapp.com",
  projectId: "rnproject-73397",
  storageBucket: "rnproject-73397.appspot.com",
  messagingSenderId: "727744977603",
  appId: "1:727744977603:web:70e8bf7811bcf5f1286076",
  storageBucket: "gs://rnproject-73397.appspot.com",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
