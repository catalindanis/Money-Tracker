import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  browserLocalPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA6U8uifo6W_9lDeq2XuHCbvEaHexGQdXw",
  authDomain: "moneytracker-7950c.firebaseapp.com",
  projectId: "moneytracker-7950c",
  storageBucket: "moneytracker-7950c.appspot.com",
  messagingSenderId: "26470506488",
  appId: "1:26470506488:web:e7cb8e881bf03f4306c00d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const database = {
  firebaseConfig,
  app,
  auth,
};

export default database;




