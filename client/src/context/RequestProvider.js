import React from 'react';
import { UserContext } from './UserProvider';
import axios from 'axios';

export const RequestContext = React.createContext();

const userRequestAxios = axios.create();

userRequestAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function RequestProvider(props) {
  // Get all posts
  const getAllPosts = () => {
    userRequestAxios
      .get('/api/posts')
      .then((response) => console.log(response))
      .catch((err) => console.dir(err));
  };

  // Get One Post
  const getOnePost = (postId) => {
    userRequestAxios
      .get(`/api/posts/${postId}`)
      .then((response) => console.log(response))
      .catch((err) => console.dir(err));
  };

  // Get popular posts
  const getPopularPosts = () => {
    return userRequestAxios
      .get(`/api/posts/popular`)
      .then((response) => response.data);
  };

  // Get new posts
  const getNewPosts = () => {
    return userRequestAxios
      .get(`/api/posts/new`)
      .then((response) => response.data);
  };
  // Get posts by current user
  const getCurrentUserPosts = () => {
    return userRequestAxios
      .get('/api/posts/user')
      .then((response) => response.data);
  };

  // Create a new post
  const createPost = (post) => {
    userRequestAxios
      .post('/api/posts/', post)
      .then((response) => console.log(response))
      .catch((err) => console.dir(err));
  };

  // Update post
  const updatePost = (post) => {
    userRequestAxios
      .put('/api/posts', post)
      .then((response) => console.log(response))
      .catch((err) => console.dir(err));
  };

  // Delete post
  const deletePost = (postId) => {
    userRequestAxios
      .delete(`/api/posts/${postId}`)
      .then((response) => console.log(response))
      .catch((err) => console.dir(err));
  };

  // POST COMMENTS

  // Get post with comments and comment authors
  const getPostAndComments = (postId) => {
    userRequestAxios
      .get(`/api/posts/${postId}/comments`)
      .then((response) => console.log(response))
      .catch((err) => console.dir(err));
  };

  // Create comment for post
  const createCommentOnPost = (postId, comment) => {
    userRequestAxios
      .post(`/api/posts/${postId}/comments`, comment)
      .then((response) => console.log(response))
      .catch((err) => console.dir(err));
  };

  // Like ost
  const likePost = (postId) => {
    return userRequestAxios
      .put(`/api/posts/${postId}/like`)
      .then((response) => response.data);
  };

  // Delete Like
  const deleteLike = (postId) => {
    return userRequestAxios
      .put(`/api/posts/${postId}/like/delete`)
      .then((response) => response.data);
  };

  const getLikePost = (postId) => {
    return userRequestAxios
      .get(`/api/posts/${postId}/like`)
      .then((response) => response.data);
  };

  return (
    <RequestContext.Provider
      value={{
        getPopularPosts,
        getNewPosts,
        getCurrentUserPosts,
        likePost,
        deleteLike,
        getLikePost,
      }}
    >
      {props.children}
    </RequestContext.Provider>
  );
}
