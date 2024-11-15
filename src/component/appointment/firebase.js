// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push } from "firebase/database";

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXbYmqrI0b-qM3DnpOgX2Doai52L60kqk",
  authDomain: "nemcare-appointment.firebaseapp.com",
  databaseURL: "https://nemcare-appointment-default-rtdb.firebaseio.com",
  projectId: "nemcare-appointment",
  storageBucket: "nemcare-appointment.firebasestorage.app",
  messagingSenderId: "1057832397371",
  appId: "1:1057832397371:web:c1ac85dea5bc1770320a1e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to send appointment data to Firebase
const sendAppointmentData = (appointmentData) => {
  const appointmentsRef = ref(database, 'appointments');
  const newAppointmentRef = push(appointmentsRef);
  set(newAppointmentRef, appointmentData);
};

// Export the function as a default export
export default sendAppointmentData;
