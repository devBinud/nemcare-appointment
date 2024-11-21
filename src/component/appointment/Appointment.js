import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";
import sendAppointmentData from "./firebase"; // Import the function to send data
import "./Appointment.css"; // Import the CSS file
import doctorsAPI from "./doctorsAPI"; // Import the doctors and schedule data
import doctorImage from "../../assets/1.jpg";

const Appointment = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [isWhatsappAvailable, setIsWhatsappAvailable] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // Modal state

  const timeSlots =
    department && doctor ? doctorsAPI[department][doctor] || [] : [];

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    if (/^\d{0,10}$/.test(input)) {
      setPhone(input);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phone.length < 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    setIsSubmitting(true);

    const appointmentData = {
      name,
      phone,
      email: email || null,
      department,
      doctor,
      date,
      timeSlot,
      isWhatsappAvailable,
    };

    try {
      // Simulate sending data with a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await sendAppointmentData(appointmentData);
      setIsSubmitting(false);

      // Animate and show success modal
      setTimeout(() => {
        setIsSuccessModalOpen(true);
      }, 300); // Slight delay for smooth transition
      resetForm();
    } catch (error) {
      setIsSubmitting(false);
      alert("Something went wrong. Please try again.");
    }
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setDepartment("");
    setDoctor("");
    setDate("");
    setTimeSlot("");
    setIsWhatsappAvailable("");
  };

  return (
    <div className="container">
      <div className="row align-items-center">
        {/* Left Side */}
        <div className="col-lg-6 text-center d-none d-lg-block">
          <img
            src={doctorImage}
            alt="Doctor Consultation"
            className="img-fluid"
            style={{ maxHeight: "400px", marginBottom: "20px" }}
          />
          <Typography variant="h5" gutterBottom>
            Book Your Appointment Easily!
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Get quick and easy access to the best doctors in their field.
            Schedule your appointment now for a hassle-free experience.
          </Typography>
        </div>

        {/* Right Side */}
        <div className="col-lg-6">
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              background: "#fff",
              borderRadius: 2,
              padding: 4,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h6" mb={2}>
              Book an Appointment
            </Typography>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              id="phone"
              label="Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
              value={phone}
              onChange={handlePhoneChange}
              required
            />
            <TextField
              id="department"
              select
              label="Department"
              variant="outlined"
              fullWidth
              margin="normal"
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setDoctor("");
              }}
              required
            >
              {Object.keys(doctorsAPI).map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="doctor"
              select
              label="Doctor"
              variant="outlined"
              fullWidth
              margin="normal"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              disabled={!department}
              required
            >
              {department &&
                Object.keys(doctorsAPI[department]).map((doc) => (
                  <MenuItem key={doc} value={doc}>
                    {doc}
                  </MenuItem>
                ))}
            </TextField>
            <TextField
              id="date"
              label="Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              margin="normal"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              inputProps={{
                min: new Date().toISOString().split("T")[0], // Set the minimum date to today's date
              }}
            />

            {doctor && (
              <Box mt={2}>
                <Typography variant="body2" mb={1}>
                  Select a Time Slot
                </Typography>
                {timeSlots.map((slot) => (
                  <Button
                    key={slot}
                    variant={timeSlot === slot ? "contained" : "outlined"}
                    sx={{ margin: "5px" }}
                    onClick={() => setTimeSlot(slot)}
                  >
                    {slot}
                  </Button>
                ))}
              </Box>
            )}
            <Box mt={2}>
              <Typography variant="body2" mb={1}>
                Is WhatsApp available on this number?
              </Typography>
              <div>
                <Button
                  variant={
                    isWhatsappAvailable === "yes" ? "contained" : "outlined"
                  }
                  sx={{ marginRight: "10px" }}
                  onClick={() => setIsWhatsappAvailable("yes")}
                >
                  Yes
                </Button>
                <Button
                  variant={
                    isWhatsappAvailable === "no" ? "contained" : "outlined"
                  }
                  onClick={() => setIsWhatsappAvailable("no")}
                >
                  No
                </Button>
              </div>
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="py-2"
              style={{ letterSpacing: 3.4 }}
              fullWidth
              sx={{ marginTop: 3 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Submit Appointment"
              )}
            </Button>
          </Box>
        </div>
      </div>

      {/* Success Modal with Animation */}
      <Dialog
        open={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        TransitionComponent={Fade}
        transitionDuration={{ enter: 500, exit: 300 }}
      >
        <DialogContent>
          <Typography>
            Thank you for appointment booking. You will get a Confirmation
            message on your registered whatsapp No
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsSuccessModalOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Appointment;
