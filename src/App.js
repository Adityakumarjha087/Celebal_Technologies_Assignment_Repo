import React, { useState } from 'react';
import './App.css';

function RegistrationForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    showPassword: false,
    phone: '',
    countryCode: '+91',
    country: '',
    city: '',
    pan: '',
    aadhar: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const countryList = ['India', 'USA', 'UK', 'Canada'];
  const citiesByCountry = {
    India: ['Mumbai', 'Delhi', 'Bangalore'],
    USA: ['New York', 'Los Angeles', 'Chicago'],
    UK: ['London', 'Manchester', 'Birmingham'],
    Canada: ['Toronto', 'Vancouver', 'Montreal']
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!form.username.trim()) newErrors.username = 'Username is required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Enter a valid email';
    if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!/^\d{10}$/.test(form.phone)) newErrors.phone = 'Phone must be 10 digits';
    if (!form.country) newErrors.country = 'Select a country';
    if (!form.city) newErrors.city = 'Select a city';
    if (!/^[A-Z]{5}\d{4}[A-Z]$/.test(form.pan)) newErrors.pan = 'PAN format invalid (e.g. ABCDE1234F)';
    if (!/^\d{12}$/.test(form.aadhar)) newErrors.aadhar = 'Aadhar must be 12 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
    }
  };

  const renderFieldValue = (key, value) => {
    const label = key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
    return (
      <div key={key} className="data-row">
        <span className="field-name">{label}</span>
        <span className="field-value">{value || 'Not provided'}</span>
      </div>
    );
  };

  if (submitted) {
    return (
      <div className="success-container">
        <div className="success-card">
          <h2>Registration Successful</h2>
          <div className="data-display">
            {Object.entries(form).map(([key, value]) => (
              key !== 'showPassword' && renderFieldValue(key, value)
            ))}
          </div>
          <button onClick={() => setSubmitted(false)} className="return-button">
            Register Another User
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="form-card">
        <header className="form-header">
          <h1>User Registration</h1>
          <p>Please complete all required fields</p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="input-row">
            {["firstName", "lastName"].map(field => (
              <div key={field} className={`input-group ${errors[field] ? 'has-error' : ''}`}>
                <label>{field === 'firstName' ? 'First Name' : 'Last Name'}</label>
                <input type="text" name={field} value={form[field]} onChange={handleInputChange} />
                {errors[field] && <span className="error-text">{errors[field]}</span>}
              </div>
            ))}
          </div>

          {["username", "email"].map(field => (
            <div key={field} className={`input-group ${errors[field] ? 'has-error' : ''}`}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input type={field === 'email' ? 'email' : 'text'} name={field} value={form[field]} onChange={handleInputChange} />
              {errors[field] && <span className="error-text">{errors[field]}</span>}
            </div>
          ))}

          <div className={`input-group ${errors.password ? 'has-error' : ''}`}>
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={form.showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleInputChange}
              />
              <label className="toggle-password">
                <input
                  type="checkbox"
                  name="showPassword"
                  checked={form.showPassword}
                  onChange={handleInputChange}
                />
                Show
              </label>
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className={`input-group ${errors.phone ? 'has-error' : ''}`}>
            <label>Phone Number</label>
            <div className="phone-wrapper">
              <select name="countryCode" value={form.countryCode} onChange={handleInputChange}>
                <option value="+91">+91 (IN)</option>
                <option value="+1">+1 (US)</option>
                <option value="+44">+44 (UK)</option>
              </select>
              <input type="tel" name="phone" maxLength="10" value={form.phone} onChange={handleInputChange} />
            </div>
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          <div className="input-row">
            <div className={`input-group ${errors.country ? 'has-error' : ''}`}>
              <label>Country</label>
              <select name="country" value={form.country} onChange={handleInputChange}>
                <option value="">Select Country</option>
                {countryList.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.country && <span className="error-text">{errors.country}</span>}
            </div>

            <div className={`input-group ${errors.city ? 'has-error' : ''}`}>
              <label>City</label>
              <select
                name="city"
                value={form.city}
                onChange={handleInputChange}
                disabled={!form.country}
              >
                <option value="">Select City</option>
                {(citiesByCountry[form.country] || []).map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              {errors.city && <span className="error-text">{errors.city}</span>}
            </div>
          </div>

          <div className="input-row">
            {["pan", "aadhar"].map(field => (
              <div key={field} className={`input-group ${errors[field] ? 'has-error' : ''}`}>
                <label>{field === 'pan' ? 'PAN Number' : 'Aadhar Number'}</label>
                <input
                  type="text"
                  name={field}
                  value={form[field]}
                  onChange={handleInputChange}
                  maxLength={field === 'pan' ? 10 : 12}
                  placeholder={field === 'pan' ? 'ABCDE1234F' : '123456789012'}
                />
                {errors[field] && <span className="error-text">{errors[field]}</span>}
              </div>
            ))}
          </div>

          <button type="submit" className="submit-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;