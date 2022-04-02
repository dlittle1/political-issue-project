import React from 'react';
import './componentStyles/leftSidebar.css';
import { NavLink } from 'react-router-dom';
const LeftSidebar = () => {
  return (
    <div className='left-sidebar'>
      <div className='left-sidebar-items'>
        <ul>
          <NavLink to='/home/popular'>
            <li>Home</li>
          </NavLink>
          <NavLink to='/home/new'>
            <li>Newest</li>
          </NavLink>
          <NavLink to='/home/likes'>
            <li>My Likes</li>
          </NavLink>
          <NavLink to='/home/user/posts'>
            <li>My Posts</li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
