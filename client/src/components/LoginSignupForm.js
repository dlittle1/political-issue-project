import { useContext, useState } from 'react';
import './componentStyles/loginSignupForm.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

const LoginSignupForm = () => {
  const { signup, login } = useContext(UserContext);

  const [inputs, setInputs] = useState({
    email: '',
    username: '',
    password: '',
  });

  const slug = window.location.href.substring(
    window.location.href.lastIndexOf('/')
  );
  const onSignupPage = slug === '/signup';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (onSignupPage) {
      signup(inputs);
    } else {
      login(inputs);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='login-signup-form'>
      {onSignupPage ? (
        <p>
          please sign up using the form below or <Link to='/'>login</Link>
        </p>
      ) : (
        <>
          <p>
            please login or <Link to='/signup'>sign up</Link> to continue
          </p>
          <p style={{ margin: '5px' }}>forgot password?</p>
        </>
      )}
      {onSignupPage && (
        <>
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={inputs.username}
            onChange={handleChange}
          />
          <br />
        </>
      )}

      <input
        type='text'
        name='email'
        placeholder='Email'
        value={inputs.email}
        onChange={handleChange}
      />
      <br />
      <input
        type='password'
        name='password'
        placeholder='password'
        value={inputs.password}
        onChange={handleChange}
      />
      <br />

      {onSignupPage ? <button>Sign Up</button> : <button>Login</button>}
    </form>
  );
};

export default LoginSignupForm;
