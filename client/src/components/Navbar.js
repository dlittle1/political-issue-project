import React from 'react';
import { Outlet } from 'react-router-dom';
import './componentStyles/navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMemo,
  faHouse,
  faUser,
  faRightFromBracket,
} from '@fortawesome/pro-solid-svg-icons';

const Navbar = () => {
  return (
    <>
      <nav className='navbar'>
        <li className='nav-logo'>Rock the Vote</li>
        <input type='text' className='nav-search' placeholder='search...' />
        <ul className='nav-item-container'>
          <li className='nav-item'>
            <FontAwesomeIcon icon={faHouse} />
          </li>
          <li className='nav-item'>
            <FontAwesomeIcon icon={faMemo} />
          </li>
          <li className='nav-item'>
            <FontAwesomeIcon icon={faUser} />
          </li>
          <li className='nav-item'>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
