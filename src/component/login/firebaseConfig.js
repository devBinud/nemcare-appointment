// Import the Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAXbYmqrI0b-qM3DnpOgX2Doai52L60kqk",
    authDomain: "nemcare-appointment.firebaseapp.com",
    databaseURL: "https://nemcare-appointment-default-rtdb.firebaseio.com",
    projectId: "nemcare-appointment",
    storageBucket: "nemcare-appointment.firebasestorage.app",
    messagingSenderId: "1057832397371",
    appId: "1:1057832397371:web:c1ac85dea5bc1770320a1e",
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
