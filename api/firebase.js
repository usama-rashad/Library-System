// Firebase
import { getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

// FIREBASE
export const firebaseConfig = {
  apiKey: "AIzaSyA2J1nE21KpCOgT0FT9hDEe2O0vavulO38",
  authDomain: "modernlibrary-9bd2c.firebaseapp.com",
  projectId: "modernlibrary-9bd2c",
  storageBucket: "modernlibrary-9bd2c.appspot.com",
  messagingSenderId: "529839535757",
  appId: "1:529839535757:web:73a3a3d0b557462c1f94c4",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage();
