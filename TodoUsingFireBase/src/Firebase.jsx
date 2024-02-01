import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9aNcIXAzseBcUtz4mhnpWLJwwhD9Rf_A",
  authDomain: "todo-using-firebase-bfe7f.firebaseapp.com",
  projectId: "todo-using-firebase-bfe7f",
  storageBucket: "todo-using-firebase-bfe7f.appspot.com",
  messagingSenderId: "630626279961",
  appId: "1:630626279961:web:ad7bad6ce5f84d21830088"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);