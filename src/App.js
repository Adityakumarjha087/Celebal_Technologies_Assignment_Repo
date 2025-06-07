import { useState } from "react";
import "./App.css";

export default function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    showPassword: false,
    phone: "",
    countryCode: "+91",
    country: "",
    city: "",
    pan: "",
    aadhar: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const countries = ["India", "USA", "UK"];
  const cities = {
    India: ["Delhi", "Mumbai", "Bangalore"],
    USA: ["New York", "Los Angeles"],
    UK: ["London", "Manchester"],
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const err = {};
    if (!formData.firstName.trim()) err.firstName = "First name is required";
    if (!formData.lastName.trim()) err.lastName = "Last name is required";
    if (!formData.username.trim()) err.username = "Username is required";
    if (!formData.email.includes("@")) err.email = "Invalid email";
    if (formData.password.length < 6) err.password = "Min 6 chars";
    if (!formData.countryCode || !formData.phone) err.phone = "Phone required";
    if (!formData.country) err.country = "Select a country";
    if (!formData.city) err.city = "Select a city";
    if (formData.pan.length !== 10) err.pan = "PAN must be 10 characters";
    if (formData.aadhar.length !== 12) err.aadhar = "Aadhar must be 12 digits";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="success fade-in">
        <h2>🎉 Form Submitted Successfully!</h2>
        <div className="result-box">
          {Object.entries(formData).map(
            ([key, value]) =>
              key !== "showPassword" && (
                <p key={key}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                </p>
              )
          )}
        </div>
        <button onClick={() => setSubmitted(false)}>New Registration</button>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input name="firstName" value={formData.firstName} onChange={handleChange} required />
        {errors.firstName && <span className="error">{errors.firstName}</span>}

        <label>Last Name</label>
        <input name="lastName" value={formData.lastName} onChange={handleChange} required />
        {errors.lastName && <span className="error">{errors.lastName}</span>}

        <label>Username</label>
        <input name="username" value={formData.username} onChange={handleChange} required />
        {errors.username && <span className="error">{errors.username}</span>}

        <label>Email</label>
        <input name="email" type="email" value={formData.email} onChange={handleChange} required />
        {errors.email && <span className="error">{errors.email}</span>}

        <label>Password</label>
        <div className="password-container">
          <input
            name="password"
            type={formData.showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="password-checkbox">
          <input
            type="checkbox"
            name="showPassword"
            checked={formData.showPassword}
            onChange={handleChange}
          />
          <label>Show</label>
        </div>
        {errors.password && <span className="error">{errors.password}</span>}

        <label>Phone No.</label>
        <div className="phone-container">
          <input
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            placeholder="+91"
            required
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
        </div>
        {errors.phone && <span className="error">{errors.phone}</span>}

        <label>Country</label>
        <select name="country" value={formData.country} onChange={handleChange} required>
          <option value="">--Select--</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errors.country && <span className="error">{errors.country}</span>}

        <label>City</label>
        <select name="city" value={formData.city} onChange={handleChange} required>
          <option value="">--Select--</option>
          {(cities[formData.country] || []).map((ct) => (
            <option key={ct} value={ct}>{ct}</option>
          ))}
        </select>
        {errors.city && <span className="error">{errors.city}</span>}

        <label>PAN No.</label>
        <input name="pan" value={formData.pan} onChange={handleChange} required />
        {errors.pan && <span className="error">{errors.pan}</span>}

        <label>Aadhar No.</label>
        <input name="aadhar" value={formData.aadhar} onChange={handleChange} required />
        {errors.aadhar && <span className="error">{errors.aadhar}</span>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
