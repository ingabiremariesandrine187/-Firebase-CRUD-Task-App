// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNV3zBemrcxqnpHATOMC0E5Z4siuuY3FY",
  authDomain: "fir-todo-app-e0a55.firebaseapp.com",
  projectId: "fir-todo-app-e0a55",
  storageBucket: "fir-todo-app-e0a55.firebasestorage.app",
  messagingSenderId: "640191751479",
  appId: "1:640191751479:web:1392c9f0aa2671f5c866b2",
  measurementId: "G-ZG8RFSPE58"
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);


export const auth = getAuth(app);



