import React, { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { initializeApp } from "firebase/app";
import { FaFilter, FaWhatsapp, FaDownload } from "react-icons/fa"; // Import icons
import { jsPDF } from "jspdf"; // Import jsPDF
import "jspdf-autotable"; // Import jsPDF autotable plugin

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
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [departments, setDepartments] = useState([]); // Departments list
  const [doctors, setDoctors] = useState([]); // Doctors list
  const [timeSlots, setTimeSlots] = useState([]); // Time slots list
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch appointments from Firebase
  const fetchAppointments = async () => {
    setIsLoading(true);
    const appointmentsRef = ref(database, "appointments");
    const snapshot = await get(appointmentsRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const appointmentsList = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setAppointments(appointmentsList);
      setFilteredAppointments(appointmentsList);

      // Extract unique departments, doctors, and time slots
      const departmentsList = [...new Set(appointmentsList.map((appt) => appt.department))];
      setDepartments(departmentsList);
    }
    setIsLoading(false);
  };

  // Handle department selection and update doctors dropdown
  const handleDepartmentChange = (department) => {
    setSelectedDepartment(department);
    const filteredDoctors = appointments
      .filter((appt) => appt.department === department)
      .map((appt) => appt.doctor);
    setDoctors([...new Set(filteredDoctors)]); // Unique doctors
    setSelectedDoctor(""); // Reset doctor
    setTimeSlots([]); // Reset time slots
  };

  // Handle doctor selection and update time slots dropdown
  const handleDoctorChange = (doctor) => {
    setSelectedDoctor(doctor);
    const filteredSlots = appointments
      .filter((appt) => appt.doctor === doctor)
      .map((appt) => appt.timeSlot);
    setTimeSlots([...new Set(filteredSlots)]); // Unique time slots
    setSelectedTimeSlot(""); // Reset time slot
  };

  // Filter appointments
  const applyFilters = () => {
    let filtered = appointments;

    if (selectedDepartment) {
      filtered = filtered.filter((appt) => appt.department === selectedDepartment);
    }
    if (selectedDoctor) {
      filtered = filtered.filter((appt) => appt.doctor === selectedDoctor);
    }
    if (selectedTimeSlot) {
      filtered = filtered.filter((appt) => appt.timeSlot === selectedTimeSlot);
    }
    setFilteredAppointments(filtered);
  };

  // Export filtered data to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Filtered Appointments", 10, 10);
    doc.autoTable({
      head: [["Sl. No.", "Patient Name", "Doctor", "Department", "Date", "Time Slot"]],
      body: filteredAppointments.map((appt, index) => [
        index + 1,
        appt.name,
        appt.doctor,
        appt.department,
        appt.date,
        appt.timeSlot,
      ]),
    });
    doc.save(`appointments_${new Date().toISOString()}.pdf`);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="container py-5">
      <h3 className="mb-5">Appointments</h3>

      {/* Filter Dropdowns */}
      <div className="row mb-4">
        <div className="col-md-4">
          <label>Department</label>
          <select
            className="form-control"
            value={selectedDepartment}
            onChange={(e) => handleDepartmentChange(e.target.value)}
          >
            <option value="">Select Department</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label>Doctor</label>
          <select
            className="form-control"
            value={selectedDoctor}
            onChange={(e) => handleDoctorChange(e.target.value)}
            disabled={!selectedDepartment}
          >
            <option value="">Select Doctor</option>
            {doctors.map((doc, index) => (
              <option key={index} value={doc}>
                {doc}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label>Time Slot</label>
          <select
            className="form-control"
            value={selectedTimeSlot}
            onChange={(e) => setSelectedTimeSlot(e.target.value)}
            disabled={!selectedDoctor}
          >
            <option value="">Select Time Slot</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter and Export Buttons */}
      <div className="mb-3">
        <button className="btn btn-primary me-3" onClick={applyFilters}>
          <FaFilter /> Apply Filters
        </button>
        <button className="btn btn-success" onClick={exportToPDF}>
          <FaDownload /> Export to PDF
        </button>
      </div>

      {/* Responsive Table */}
      {isLoading ? (
        <p>Loading...</p>
      ) : filteredAppointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Sl. No.</th>
                <th>Patient Name</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Date</th>
                <th>Time Slot</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appt, index) => (
                <tr key={appt.id}>
                  <td>{index + 1}</td>
                  <td>{appt.name}</td>
                  <td>{appt.doctor}</td>
                  <td>{appt.department}</td>
                  <td>{appt.date}</td>
                  <td>{appt.timeSlot}</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() =>
                        window.open(`https://wa.me/?text=Appointment+Details:+${appt.name}`, "_blank")
                      }
                    >
                      <FaWhatsapp /> Send WhatsApp
                    </button>
                  </td>
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
