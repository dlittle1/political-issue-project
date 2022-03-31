import React, { useState } from 'react';
import axios from 'axios';

export const UserContext = React.createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use((config) => {});

export default function UserProvider(props) {
  const initState = { user: '', token: '' };

  const [userState, setUserState] = useState(initState);

  const signup = (credentials) => {
    axios
      .post('/auth/signup', credentials)
      .then((response) => console.log(response))
      .catch((err) => console.dir(err.response.data.errorMessage));
  };

  const login = (credentials) => {
    axios
      .post('/auth/login', credentials)
      .then((response) => console.log(response))
      .catch((err) => console.dir(err.response.data.errorMessage));
  };

  return (
    <UserContext.Provider value={{ ...userState, signup, login }}>
      {props.children}
    </UserContext.Provider>
  );
}
