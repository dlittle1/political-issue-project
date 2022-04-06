import React from 'react';
import './componentStyles/leftSidebar.css';
import { NavLink } from 'react-router-dom';
const LeftSidebar = (props) => {
  const { handleMenuClick } = props;
  return (
    <div className='left-sidebar'>
      <div className='left-sidebar-items'>
        <ul>
          <NavLink to='/popular' onClick={handleMenuClick}>
            <li>Home</li>
          </NavLink>
          <NavLink to='/new' onClick={handleMenuClick}>
            <li>Newest</li>
          </NavLink>
          <NavLink to='/likes' onClick={handleMenuClick}>
            <li>My Likes</li>
          </NavLink>
          <NavLink to='/user/posts' onClick={handleMenuClick}>
            <li>My Posts</li>
          </NavLink>
          <NavLink to='/posts/new' onClick={handleMenuClick}>
            <li style={{ marginTop: '30px' }}>Create New Post</li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
