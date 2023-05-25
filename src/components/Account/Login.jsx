import { Link } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../API/firebase';
const Login = () => {
  const [formContents, setFormContents] = useState({ email: '', password: '' });
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

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();

    if (isFormValid) {
      setErrors({ email: '', password: '' });
      signInWithEmailAndPassword(
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
          if (errorMessage === 'Firebase: Error (auth/user-not-found).') {
            setErrors({
              general: 'This user does not exist. Please try again.',
            });
            setFormContents({ email: '', password: '' });
          }
          if (errorMessage === 'Firebase: Error (auth/wrong-password).') {
            setErrors({
              general: 'Incorrect password. Please try again.',
            });
            setFormContents({ password: '' });
          }
        });
    }
  };
  return (
    <div className='login-container'>
      <div className='login'>
        <p>Welcome back!</p>

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
              d='M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z'
            />
          </svg>
        </div>
        <form onSubmit={handleSubmit} className='form'>
          <input
            type='email'
            name='email'
            value={formContents.email}
            placeholder='Email'
            onChange={handleInputChange}
          ></input>
          <label className='error'>{errors.email && errors.email}</label>
          <label className='error'>{errors.general && errors.general}</label>

          <input
            type='password'
            name='password'
            placeholder='Password'
            onChange={handleInputChange}
            value={formContents.password}
          ></input>
          <label className='error'>{errors.password && errors.password}</label>

          <button className='button'>Log In</button>
          <span>
            No account yet?{' '}
            <Link to='/register' className='link'>
              {' '}
              Register now.
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
