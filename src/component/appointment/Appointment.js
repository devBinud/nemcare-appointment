import React, { useState } from "react";
import sendAppointmentData from "./firebase"; // Import the function to send data
import "./Appointment.css"; // Import the CSS file
import doctorsAPI from "./doctorsAPI"; // Import the doctors and schedule data

const Appointment = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [isWhatsappAvailable, setIsWhatsappAvailable] = useState("");

  // Dynamically fetch time slots based on the selected department and doctor
  const timeSlots =
    department && doctor ? doctorsAPI[department][doctor] || [] : [];

  // Handle phone input validation
  const handlePhoneChange = (e) => {
    const input = e.target.value;
    if (/^\d{0,10}$/.test(input)) {
      setPhone(input);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (phone.length < 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    // Prepare appointment data
    const appointmentData = {
      name,
      phone,
      email: email || null, // Email is optional
      department,
      doctor,
      date,
      timeSlot,
      isWhatsappAvailable,
    };

    // Log all form data in the console
    console.log("Submitted Appointment Data:", appointmentData);

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
        <div className="appointmentBooking__formContainer">
          <h2 className="appointmentBooking__heading">Book an Appointment</h2>
          <form
            className="appointmentBooking__formStyle"
            onSubmit={handleSubmit}
          >
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
                onChange={handlePhoneChange}
                required
                placeholder="Enter 10-digit phone number"
              />
            </div>
            <div>
              <label className="appointmentBooking__label">
                Is WhatsApp available on this number?
              </label>
              <div className="appointmentBooking__radioGroup mt-2">
                <label className="me-3">
                  <input
                    type="radio"
                    className="me-1"
                    name="isWhatsappAvailable"
                    value="yes"
                    
                    onChange={(e) => setIsWhatsappAvailable(e.target.value)}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="isWhatsappAvailable"
                    className="me-1"
                    value="no"
                    onChange={(e) => setIsWhatsappAvailable(e.target.value)}
                  />
                  No
                </label>
              </div>
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
                {Object.keys(doctorsAPI).map((dept) => (
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
                disabled={!department}
              >
                <option value="">Select Doctor</option>
                {department &&
                  Object.keys(doctorsAPI[department]).map((doc) => (
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
              {doctor && ( // Conditionally render only if a doctor is selected
                <>
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
                </>
              )}
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
