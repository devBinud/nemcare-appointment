import React, { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { initializeApp } from "firebase/app";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { FaFilter, FaWhatsapp, FaDownload } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Button } from "@mui/material";
import * as XLSX from "xlsx";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import "./AppointmentTable.css"; // Optional: Add your custom CSS for further styling


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

  console.log(
    doctors,
    setDoctors,
    timeSlots,
    setTimeSlots,
    setSelectedDoctor,
    setSelectedTimeSlot
  );

  // Fetch appointments from Firebase
  const fetchAppointments = async () => {
    try {
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

        const departmentsList = [
          ...new Set(appointmentsList.map((appt) => appt.department)),
        ];
        setDepartments(departmentsList);
      } else {
        console.warn("No appointments found in the database.");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Filter logic
  const applyFilters = () => {
    let filtered = appointments;

    if (selectedDepartment) {
      filtered = filtered.filter(
        (appt) => appt.department === selectedDepartment
      );
    }
    if (selectedDoctor) {
      filtered = filtered.filter((appt) => appt.doctor === selectedDoctor);
    }
    if (selectedTimeSlot) {
      filtered = filtered.filter((appt) => appt.timeSlot === selectedTimeSlot);
    }
    if (startDate) {
      filtered = filtered.filter(
        (appt) => new Date(appt.date) >= new Date(startDate)
      );
    }
    if (endDate) {
      filtered = filtered.filter(
        (appt) => new Date(appt.date) <= new Date(endDate)
      );
    }
    setFilteredAppointments(filtered);
    setCurrentPage(1); // Reset to first page
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Filtered Appointments", 10, 10);
    doc.autoTable({
      head: [
        [
          "Sl. No.",
          "Patient Name",
          "Doctor",
          "Department",
          "Date",
          "Time Slot",
        ],
      ],
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

  // Export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredAppointments.map((appt, index) => ({
        "Sl. No.": index + 1,
        "Patient Name": appt.name,
        Doctor: appt.doctor,
        Department: appt.department,
        Date: appt.date,
        "Time Slot": appt.timeSlot,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Appointments");
    XLSX.writeFile(wb, `appointments_${new Date().toISOString()}.xlsx`);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container py-3">
      <h3 className="mb-4" style={{ letterSpacing: 0.3, fontSize: "17px" }}>
        All Appointments
      </h3>

      {/* Export Buttons */}
      <div className="mb-3">
        <div className="row">
          <div className="col-md-6">
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<FaDownload />}
              onClick={exportToPDF}
              className="me-2"
            >
              Export to PDF
            </Button>
          </div>
          <div className="col-md-6 mt-3 mt-lg-0">
            <Button
              variant="contained"
              color="warning"
              startIcon={<FaDownload />}
              onClick={exportToExcel}
            >
              Export to Excel
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-3 my-1">
          <TextField
            id="date"
            label="Start Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            margin="normal"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="col-md-3 my-1">
          <TextField
            id="date"
            label="End Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            margin="normal"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div className="col-md-3 my-1">
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="department-label">Department</InputLabel>
            <Select
              labelId="department-label"
              id="department"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              label="Department"
            >
              <MenuItem value="">
                <em>Select Department</em>
              </MenuItem>
              {departments.map((dept, index) => (
                <MenuItem key={index} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Apply Filters Button */}
        <div className="col-md-3 d-flex align-items-end mt-2 mt-lg-0">
          <Button
            variant="contained"
            color="success"
            startIcon={<FaFilter />}
            onClick={applyFilters}
            className="mb-2 mb-lg-4 py-2 py-lg-2 w-100 w-lg-none"
          >
            Apply Filters
          </Button>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <p>Loading...</p>
      ) : paginatedAppointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        <div className="table-responsive">
          <TableContainer
            component={Paper}
            sx={{ boxShadow: 3, borderRadius: 2 }}
          >
            <Table className="table table-bordered" sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Sl. No.
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Patient Name
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Phone
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Doctor
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Department
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Date
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Time Slot
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    WhatsApp
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedAppointments.map((appt, index) => (
                  <TableRow key={appt.id} hover>
                    <TableCell align="center">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </TableCell>
                    <TableCell align="center">{appt.name}</TableCell>
                    <TableCell align="center">{appt.phone}</TableCell>
                    <TableCell align="center">{appt.doctor}</TableCell>
                    <TableCell align="center">{appt.department}</TableCell>
                    <TableCell align="center">{appt.date}</TableCell>
                    <TableCell align="center">{appt.timeSlot}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<FaWhatsapp />}
                        href={`https://wa.me/+91${appt.phone}?text=Dear%20*${appt.name}*%2C%20Your%20appointment%20is%20confirmed%20with%20*${appt.doctor}*%20on%20${appt.date}%20at%20${appt.timeSlot}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          textTransform: "none",
                          fontWeight: "bold",
                          "&:hover": {
                            backgroundColor: "white", // Maintains the same color as the base
                            boxShadow: "none", // Optional: Removes any hover shadow effect
                          },
                        }}
                      >
                        Send Confirmation
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => changePage(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, i) => (
            <li
              key={i}
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => changePage(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => changePage(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AppointmentTable;
