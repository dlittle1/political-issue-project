import React from 'react';
import '../styles/landingPage.css';
import LoginSignupForm from '../components/LoginSignupForm';

const LandingPage = () => {
  return (
    <div className='landing-page-body'>
      <div className='landing-page-image'></div>
      <div className='landing-page-content-container'>
        <div className='landing-page-text'>
          <p>welcome to</p>
          <h1 className='landing-page-title'>Rock The Vote</h1>
        </div>
        <div className='landing-page-form'>
          <LoginSignupForm />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
