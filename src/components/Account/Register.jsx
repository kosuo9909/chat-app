import { Link } from 'react-router-dom';
import './Register.scss';
import auth from '../API/firebase';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
const Register = () => {
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
  };
  return (
    <div className='login-container'>
      <div className='login'>
        <p>Let's get you started.</p>
        <div className='login-icon'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='login-svg'
            viewBox='0 0 16 16'
          >
            <path d='M8 5a1 1 0 0 1 1 1v1H7V6a1 1 0 0 1 1-1zm2 2.076V6a2 2 0 1 0-4 0v1.076c-.54.166-1 .597-1 1.224v2.4c0 .816.781 1.3 1.5 1.3h3c.719 0 1.5-.484 1.5-1.3V8.3c0-.627-.46-1.058-1-1.224zM6.105 8.125A.637.637 0 0 1 6.5 8h3a.64.64 0 0 1 .395.125c.085.068.105.133.105.175v2.4c0 .042-.02.107-.105.175A.637.637 0 0 1 9.5 11h-3a.637.637 0 0 1-.395-.125C6.02 10.807 6 10.742 6 10.7V8.3c0-.042.02-.107.105-.175z' />
            <path d='M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z' />
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
            <Link to='/register' className='link'>
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
