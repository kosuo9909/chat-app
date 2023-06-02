import { Link, useNavigate } from 'react-router-dom';
import './Account.scss';
import auth from '../API/firebase';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
const Register = () => {
  const navigate = useNavigate();
  const [formContents, setFormContents] = useState({
    email: '',
    password: '',
    password2: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: '',
  });
  const handleInputChange = (e) => {
    setFormContents({ ...formContents, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = { email: '', password: '' };

    if (!formContents.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formContents.email)) {
      newErrors.email = 'Email is not valid.';
    }

    if (!formContents.password) {
      newErrors.password = 'Password is required';
    } else if (formContents.password.length < 6) {
      newErrors.password = `Password should be at least 6 characters long, yours is ${formContents.password.length}`;
    }

    if (formContents.password !== formContents.password2) {
      newErrors.password2 = 'The passwords do not match';
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();

    if (isFormValid) {
      setErrors({ email: '', password: '' });
      createUserWithEmailAndPassword(
        auth,
        formContents.email,
        formContents.password
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
            setErrors({
              general: 'This email address already exists.',
            });
            setFormContents({
              email: '',
              password: '',
              password2: '',
            });
          }
        });
    }
    navigate('/');
  };
  return (
    <div className='login-container'>
      <div className='login'>
        <p>Let's get you started.</p>
        <div className='login-icon'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='login-svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z'
            />
          </svg>
        </div>
        <form onSubmit={handleSubmit} className='form'>
          <input
            type='email'
            placeholder='Email'
            name='email'
            onChange={handleInputChange}
          ></input>
          <label className='error'>{errors.email && errors.email}</label>
          <label className='error'>{errors.general && errors.general}</label>
          <input
            type='password'
            placeholder='Password'
            name='password'
            onChange={handleInputChange}
          ></input>
          <label className='error'>{errors.password && errors.password}</label>
          <label className='error'>
            {errors.password2 && errors.password2}
          </label>

          <input
            type='password'
            placeholder='Repeat password'
            name='password2'
            onChange={handleInputChange}
          ></input>
          <button className='button'>Register</button>
          <span>
            You already have an account?{' '}
            <Link to='/login' className='link'>
              {' '}
              Log in.
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
