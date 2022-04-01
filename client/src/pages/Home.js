import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import '../styles/home.css';
import { RequestContext } from '../context/RequestProvider';

const Home = () => {
  const requestContext = useContext(RequestContext);
  return (
    <div className='home-container'>
      <div className='home-left-sidebar'>
        <ul>
          <li>Create New Post</li>
          <li>View Your Posts</li>
          <li></li>
        </ul>
      </div>
      <div className='home-posts-container'>Posts</div>
      <div className='home-right-sidebar'>tags</div>
    </div>
  );
};

export default Home;
