import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Navigation.scss';
import auth from '../API/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';

const Navigation = () => {
  const [currentUser, setCurrentUser] = useState('');
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setCurrentUser(true);
      } else {
        setCurrentUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []); // Empty dependency array means this effect runs once on mount and clean up on unmount
  const navigate = useNavigate();
  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate('/');
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      <div className='main-nav'>
        <div className='navigation'>
          <div className='logo-left'>
            <Link to='/' className='link'>
              Home
            </Link>
          </div>
          {currentUser !== '' && (
            <div className='items-right'>
              {!currentUser && (
                <>
                  {' '}
                  <Link to='/login' className='link'>
                    Login
                  </Link>
                  <Link to='/register' className='link'>
                    Register
                  </Link>{' '}
                </>
              )}
              {currentUser && (
                <Link onClick={signOutHandler} className='link'>
                  Log Out
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
