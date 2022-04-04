import React, { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import './componentStyles/navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faUser,
  faRightFromBracket,
} from '@fortawesome/pro-solid-svg-icons';

const Navbar = () => {
  const userContext = useContext(UserContext);

  const handleSignout = () => {
    userContext.signout();
  };

  return (
    <>
      <nav className='navbar'>
        <li className='nav-logo'>
          <Link to='/popular' style={{ color: '#2c2c2c' }}>
            Rock the Vote
          </Link>
        </li>

        <ul className='nav-item-container'>
          {/* <li className='nav-item'>
            <Link to='/popular' style={{ color: '#2c2c2c' }}>
              <FontAwesomeIcon icon={faHouse} />
            </Link>
          </li> */}
          {/* <li className='nav-item'>
            <FontAwesomeIcon icon={faUser} />
          </li> */}
          <li className='nav-item' onClick={handleSignout}>
            <p style={{ display: 'inline', marginRight: '10px' }}>Sign Out</p>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </li>
        </ul>
      </nav>
      <div className='nav-spacer'></div>
      <Outlet />
    </>
  );
};

export default Navbar;
