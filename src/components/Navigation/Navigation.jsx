import { Link, Outlet } from 'react-router-dom';
import './Navigation.scss';

const Navigation = () => {
  return (
    <>
      <div className='main-nav'>
        <div className='navigation'>
          <div className='logo-left'>
            <Link to='/' className='link'>
              Logo
            </Link>
          </div>
          <div className='items-right'>
            <Link to='/login' className='link'>
              Login
            </Link>
            <Link to='/register' className='link'>
              Register
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
