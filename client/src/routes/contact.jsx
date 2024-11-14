import { useState } from "react";
import axios from "axios";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("api/contact", formData);
      console.log("Form submitted:", response.data);
      setSubmitStatus("Success! Your message has been sent.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("There was an error submitting the form:", error);
      setSubmitStatus("Error! There was an issue sending your message.");
    }
  };

  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="form-textarea"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Send Message
        </button>
      </form>
      {submitStatus && <p>{submitStatus}</p>}
    </div>
  );
}

export default ContactUs;
