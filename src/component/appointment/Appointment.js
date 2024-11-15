import React, { useState } from "react";
import sendAppointmentData from "./firebase"; // Import the function to send data
import "./Appointment.css"; // Import the CSS file

const Appointment = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  // Departments and their respective doctors
  const departments = {
    Cardiology: ["Dr. John", "Dr. Sarah", "Dr. Emily"],
    Neurology: ["Dr. Robert", "Dr. Jane", "Dr. Steve"],
    Pediatrics: ["Dr. Alice", "Dr. Thomas", "Dr. Nancy"],
    Orthopedics: ["Dr. David", "Dr. Sophie", "Dr. Paul"],
  };

  // Predefined time slots
  const timeSlots = ["5:00 - 5:30", "5:30 - 6:00", "6:00 - 6:30", "6:30 - 7:00"];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare appointment data
    const appointmentData = {
      name,
      phone,
      email: email || null, // Make email optional
      department,
      doctor,
      date,
      timeSlot,
    };

    // Send appointment data to Firebase
    sendAppointmentData(appointmentData);

    // Clear the form after submission
    setName("");
    setPhone("");
    setEmail("");
    setDepartment("");
    setDoctor("");
    setDate("");
    setTimeSlot("");

    alert("Appointment successfully submitted!");
  };

  return (
    <div className="appointmentBooking__form">
      <div className="appointmentBooking__container">
        {/* Right Column with Form */}
        <div className="appointmentBooking__formContainer">
          <h2 className="appointmentBooking__heading">Book an Appointment</h2>
          <form className="appointmentBooking__formStyle" onSubmit={handleSubmit}>
            <div>
              <label className="appointmentBooking__label">Name</label>
              <input
                className="appointmentBooking__input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="appointmentBooking__label">Phone</label>
              <input
                className="appointmentBooking__input"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="appointmentBooking__label">Email (Optional)</label>
              <input
                className="appointmentBooking__input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="appointmentBooking__label">Department</label>
              <select
                className="appointmentBooking__select"
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  setDoctor(""); // Reset doctor when department changes
                }}
                required
              >
                <option value="">Select Department</option>
                {Object.keys(departments).map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="appointmentBooking__label">Doctor</label>
              <select
                className="appointmentBooking__select"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                required
                disabled={!department} // Disable if no department selected
              >
                <option value="">Select Doctor</option>
                {department &&
                  departments[department].map((doc) => (
                    <option key={doc} value={doc}>
                      {doc}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="appointmentBooking__label">Date</label>
              <input
                className="appointmentBooking__input"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="appointmentBooking__label">Time Slot</label>
              <div className="appointmentBooking__timeSlots">
                {timeSlots.map((slot) => (
                  <div key={slot}>
                    <input
                      type="radio"
                      id={slot}
                      name="timeSlot"
                      value={slot}
                      checked={timeSlot === slot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      required
                    />
                    <label htmlFor={slot}>{slot}</label>
                  </div>
                ))}
              </div>
            </div>
            <button className="appointmentBooking__button" type="submit">
              Submit Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
