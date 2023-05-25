import { Link } from 'react-router-dom';
import './Login.scss';
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
