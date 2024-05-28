// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCa3vmt-ZhtXxpM1zOviDXoTxmqSda-xoY",
  authDomain: "assignment-7c553.firebaseapp.com",
  projectId: "assignment-7c553",
  storageBucket: "assignment-7c553.appspot.com",
  messagingSenderId: "989855043078",
  appId: "1:989855043078:web:daf8bd7683341327107d87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
