import React, { useState } from 'react';
import axios from 'axios';

export const UserContext = React.createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function UserProvider(props) {
  const initState = {
    user: JSON.parse(localStorage.getItem('user')) || {},
    token: localStorage.getItem('token') || '',
  };

  const [userState, setUserState] = useState(initState);
  const storeUser = ({ userObj: user, token }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('likedPosts', JSON.stringify([]));
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
      .then((response) => {
        storeUser(response.data);
        getUsersLikedPosts().then((response) => {
          localStorage.setItem('likedPosts', JSON.stringify(response));
        });
      })
      .catch((err) => console.dir(err.response.data.errorMessage));
  };

  const signout = () => {
    setUserState({ user: {}, token: '' });
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('likedPosts');
  };

  const getUsersLikedPosts = () => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const { _id } = currentUser;
    return userAxios
      .get(`/api/posts?likes=${_id}`)
      .then((response) => response.data);
  };

  return (
    <UserContext.Provider value={{ ...userState, signup, login, signout }}>
      {props.children}
    </UserContext.Provider>
  );
}
