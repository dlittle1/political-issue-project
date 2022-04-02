import React, { useState } from 'react';
import axios from 'axios';

export const UserContext = React.createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use((config) => {});

export default function UserProvider(props) {
  const initState = {
    user: JSON.parse(localStorage.getItem('user')) || {},
    token: localStorage.getItem('token') || '',
  };

  const [userState, setUserState] = useState(initState);

  console.log(userState);
  const storeUser = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    setUserState((prevUserState) => ({ ...prevUserState, user, token }));
  };

  const signup = (credentials) => {
    axios
      .post('/auth/signup', credentials)
      .then((response) => {
        storeUser(response.data);
      })
      .catch((err) => console.dir(err.response.data.errorMessage));
  };

  const login = (credentials) => {
    axios
      .post('/auth/login', credentials)
      .then((response) => storeUser(response.data))
      .catch((err) => console.dir(err.response.data.errorMessage));
  };

  return (
    <UserContext.Provider value={{ ...userState, signup, login }}>
      {props.children}
    </UserContext.Provider>
  );
}
