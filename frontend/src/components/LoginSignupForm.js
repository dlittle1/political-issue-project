import React from 'react';
import './componentStyles/loginSignupForm.css';
import { Link, useParams } from 'react-router-dom';

const LoginSignupForm = () => {
  const slug = window.location.href.substring(
    window.location.href.lastIndexOf('/')
  );
  const onSignupPage = slug === '/signup';

  return (
    <form className='login-signup-form'>
      {onSignupPage ? (
        <p>
          please sign up using the form below or <Link to='/'>login</Link>
        </p>
      ) : (
        <p>
          please login or <Link to='/signup'>sign up</Link> to continue
        </p>
      )}
      <input type='text' name='email' placeholder='Email' />
      <br />
      <input type='text' name='password' placeholder='password' />
      <br />
      {onSignupPage ? <button>Sign Up</button> : <button>Login</button>}
    </form>
  );
};

export default LoginSignupForm;
