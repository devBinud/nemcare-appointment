import React, { useState } from 'react';
import './Appointment.css';

function Appointment() {
  const [formData, setFormData] = useState({
    specialization: '',
    doctor: '',
    name: '',
    email: '',
    phone: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="appointment-container">
      <div className="appointment-card">
        <h2 className="appointment-title">Book Your Appointment</h2>
        <form
          name="appointment" // Name of the form
          method="POST"
          data-netlify="true" // Enable Netlify Forms
          netlify-honeypot="bot-field" // Add spam protection
        >
          {/* Hidden field required by Netlify */}
          <input type="hidden" name="form-name" value="appointment" />

          <div hidden>
            <label>
              Don’t fill this out:{' '}
              <input name="bot-field" onChange={handleChange} />
            </label>
          </div>

          <div className="form-group">
            <label>Specialization</label>
            <select
              name="specialization"
              className="form-control"
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Specialization
              </option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Orthopedics">Orthopedics</option>
            </select>
          </div>

          <div className="form-group">
            <label>Doctor</label>
            <select
              name="doctor"
              className="form-control"
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Doctor
              </option>
              <option value="Dr. John Smith">Dr. John Smith</option>
              <option value="Dr. Emily Carter">Dr. Emily Carter</option>
            </select>
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Appointment Date</label>
            <input
              type="date"
              name="appointmentDate"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Appointment Time</label>
            <input
              type="time"
              name="appointmentTime"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Reason for Visit</label>
            <textarea
              name="reason"
              className="form-control"
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn-submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Appointment;
