import React, { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { initializeApp } from "firebase/app";
import { FaFilter, FaWhatsapp, FaDownload } from "react-icons/fa";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

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
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
    setDoctors([...new Set(filteredDoctors)]);
    setSelectedDoctor("");
    setTimeSlots([]);
  };

  // Handle doctor selection and update time slots dropdown
  const handleDoctorChange = (doctor) => {
    setSelectedDoctor(doctor);
    const filteredSlots = appointments
      .filter((appt) => appt.doctor === doctor)
      .map((appt) => appt.timeSlot);
    setTimeSlots([...new Set(filteredSlots)]);
    setSelectedTimeSlot("");
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
    if (startDate) {
      filtered = filtered.filter((appt) => new Date(appt.date) >= new Date(startDate));
    }
    if (endDate) {
      filtered = filtered.filter((appt) => new Date(appt.date) <= new Date(endDate));
    }
    setFilteredAppointments(filtered);
    setCurrentPage(1); // Reset to first page
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

  // Export filtered data to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredAppointments.map((appt, index) => ({
        "Sl. No.": index + 1,
        "Patient Name": appt.name,
        "Doctor": appt.doctor,
        "Department": appt.department,
        "Date": appt.date,
        "Time Slot": appt.timeSlot,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Appointments");
    XLSX.writeFile(wb, `appointments_${new Date().toISOString()}.xlsx`);
  };

  // Send confirmation message on WhatsApp
  const sendWhatsappConfirmation = (phone, name, doctor, date, timeSlot) => {
    const message = `Dear ${name}, your appointment has been scheduled with Dr. ${doctor} on ${date}. Please report between ${timeSlot}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container py-3">
      <h3 className="mb-3">Appointments</h3>

      {/* Filter and Export Buttons */}
      <div className="mb-3">
        <button className="btn btn-primary me-3" onClick={exportToExcel}>
          <FaDownload /> Export to Excel
        </button>
        <button className="btn btn-success" onClick={exportToPDF}>
          <FaDownload /> Export to PDF
        </button>
      </div>

      {/* Filter Dropdowns */}
      <div className="row mb-4">
        {/* Date Range */}
        <div className="col-md-3">
          <label>Start Date</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label>End Date</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        {/* Department */}
        <div className="col-md-3">
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
        {/* Doctor */}
        <div className="col-md-3">
          <label>Doctor</label>
          <select
            className="form-control"
            value={selectedDoctor}
            onChange={(e) => handleDoctorChange(e.target.value)}
            disabled={!selectedDepartment} // Disable if no department selected
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor, index) => (
              <option key={index} value={doctor}>
                {doctor}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary mt-4" onClick={applyFilters}>
            Apply Filters
          </button>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <p>Loading...</p>
      ) : paginatedAppointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        <div>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Sl. No.</th>
                  <th>Patient Name</th>
                  <th>Phone</th>
                  <th>Doctor</th>
                  <th>Department</th>
                  <th>Date</th>
                  <th>Time Slot</th>
                  <th>WhatsApp</th>
                </tr>
              </thead>
              <tbody>
                {paginatedAppointments.map((appt, index) => (
                  <tr key={appt.id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{appt.name}</td>
                    <td>{appt.phone}</td>
                    <td>{appt.doctor}</td>
                    <td>{appt.department}</td>
                    <td>{appt.date}</td>
                    <td>{appt.timeSlot}</td>
                    <td>
                      <a className="btn btn-success"
                        href={`https://wa.me/${appt.phone}?text=Dear%20${appt.name}%2C%20Your%20appointment%20has%20been%20scheduled%20with%20Dr.%20${appt.doctor}%20on%20${appt.date}%20between%20${appt.timeSlot}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaWhatsapp /> Send Confirmation Message
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <nav>
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => changePage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>  
        </div>
      )}
    </div>
  );
}

export default AppointmentTable;
