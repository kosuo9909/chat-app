import { Link, Outlet } from 'react-router-dom';
import './Navigation.scss';

const Navigation = () => {
  return (
    <div className='navigation'>
      <div className='logo-left'>Logo</div>
      <div className='items-right'>
        <Link className='link'>Login</Link>
        <Link className='link'>Register</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Navigation;
