// sendAppointmentData.js
import firebase from "./firebaseConfig"; // Ensure this is correctly set up

const sendAppointmentData = async (appointmentData) => {
  try {
    // Save the appointment data to Firestore
    await firebase.firestore().collection("appointments").add(appointmentData);
    return true; // Return true to indicate success
  } catch (error) {
    console.error("Error saving appointment:", error);
    throw error; // Re-throw error to handle it in the caller
  }
};

export default sendAppointmentData;
