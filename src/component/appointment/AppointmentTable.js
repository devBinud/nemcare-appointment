import React, { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { initializeApp } from "firebase/app";

// Firebase configuration
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
const database = getDatabase(app);

function AppointmentTable() {
  const [appointments, setAppointments] = useState([]); // To store fetched data
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Function to fetch appointments from Firebase
  const fetchAppointments = async () => {
    setIsLoading(true); // Start loading
    const appointmentsRef = ref(database, "appointments");
    const snapshot = await get(appointmentsRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const appointmentsList = Object.keys(data).map((key) => ({
        id: key, // Firebase unique key for each appointment
        ...data[key], // The appointment details
      }));
      setAppointments(appointmentsList); // Update the state with the fetched data
    } else {
      setAppointments([]); // No data found
    }
    setIsLoading(false); // Stop loading
  };

  // Use effect to call fetchAppointments when component mounts
  useEffect(() => {
    fetchAppointments();
  }, []); // Empty dependency array to run once on component mount

  return (
    <div className="container py-5">
      <h3 className="mb-5">Appointments</h3>

      {isLoading ? ( // Show a loading indicator while fetching data
        <p>Loading...</p>
      ) : appointments.length === 0 ? ( // Check if no appointments
        <p>No data found</p>
      ) : (
        <div className="table-responsive"> {/* Make the table responsive */}
          <table className="table table-bordered table-hover">
            <thead style={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
              <tr>
                <th scope="col">Sl. No.</th> {/* Serial Number Column */}
                <th scope="col">Patient Name</th>
                <th scope="col">Doctor</th>
                <th scope="col">Date</th>
                <th scope="col">Time Slot</th> {/* Changed from Time to Time Slot */}
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={appointment.id}>
                  <td>{index + 1}</td> {/* Serial Number */}
                  <td>{appointment.name}</td> {/* Patient Name */}
                  <td>{appointment.doctor}</td> {/* Doctor Name */}
                  <td>{appointment.date}</td> {/* Appointment Date */}
                  <td>{appointment.timeSlot}</td> {/* Display the Time Slot */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AppointmentTable;
