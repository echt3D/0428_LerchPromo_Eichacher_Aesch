import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import Alert from "@mui/material/Alert";

import ContactPerson from "../contact-person/contactPerson.component";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(
        "https://your-app-name.herokuapp.com/api/send-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            recipient: "recipient@example.com",
          }),
        }
      );

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send email");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setError(null);
    setSuccess(false);
  };

  return (
    <>
      <ContactPerson />
      {/* <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h5">Kontakt</Typography>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={submitting}
        >
          {submitting ? <CircularProgress size={24} /> : "Send"}
        </Button>

        <Snackbar open={error || success} onClose={handleClose}>
          {error ? (
            <Alert severity="error" onClose={handleClose}>
              {error}
            </Alert>
          ) : (
            <Alert severity="success" onClose={handleClose}>
              Email sent successfully!
            </Alert>
          )}
        </Snackbar>
      </Box> */}
    </>
  );
};

export default ContactForm;
