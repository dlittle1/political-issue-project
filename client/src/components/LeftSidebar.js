import React from 'react';
import './componentStyles/leftSidebar.css';
import { NavLink } from 'react-router-dom';
const LeftSidebar = () => {
  return (
    <div className='left-sidebar'>
      <div className='left-sidebar-items'>
        <ul>
          <NavLink to='/popular'>
            <li>Home</li>
          </NavLink>
          <NavLink to='/new'>
            <li>Newest</li>
          </NavLink>
          <NavLink to='/likes'>
            <li>My Likes</li>
          </NavLink>
          <NavLink to='/user/posts'>
            <li>My Posts</li>
          </NavLink>
          <NavLink to='/posts/new'>
            <li style={{ marginTop: '30px' }}>Create New Post</li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
