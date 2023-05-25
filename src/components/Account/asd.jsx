import React, { useState } from 'react';

const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = { email: '', password: '' };

    // check email
    if (!form.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email is not valid.';
    }

    // check password
    if (!form.password) {
      newErrors.password = 'Password is required.';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password should be at least 6 characters long.';
    }

    setErrors(newErrors);

    // if there are no errors, return true, else false
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isFormValid = validateForm();

    if (isFormValid) {
      // submit form
      console.log('Submitting form...');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type='email'
          name='email'
          value={form.email}
          onChange={handleInputChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type='password'
          name='password'
          value={form.password}
          onChange={handleInputChange}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default LoginForm;
