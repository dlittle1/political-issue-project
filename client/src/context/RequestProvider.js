import React, { useContext } from 'react';
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
  const userContext = useContext(UserContext);

  userRequestAxios.interceptors.response.use(
    (res) => {
      if (res.data.errorMessage === 'jwt expired') {
        return userContext.signout();
      }
      if (res.data.errorMessage === 'invalid signature') {
        return userContext.signout();
      }
      return res;
    },
    (err) => {
      console.log(err);
    }
  );

  // Get all posts
  const getAllPosts = () => {
    userRequestAxios
      .get('/api/posts')
      .then((response) => console.log(response))
      .catch((err) => console.dir(err));
  };

  // Get One Post
  const getOnePost = (postId) => {
    return userRequestAxios
      .get(`/api/posts/${postId}`)
      .then((response) => response.data);
  };

  // Get popular posts
  const getPopularPosts = () => {
    return userRequestAxios
      .get(`/api/posts?sort=-upvotes`)
      .then((response) => response.data);
  };

  // Get new posts
  const getNewPosts = () => {
    return userRequestAxios
      .get(`/api/posts?sort=-createdAt`)
      .then((response) => response.data);
  };
  // Get posts by current user
  const getCurrentUserPosts = () => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const { _id } = currentUser;
    return userRequestAxios
      .get(`/api/posts?createdBy=${_id}`)
      .then((response) => response.data);
  };

  //Get posts user has liked
  const getUsersLikedPosts = () => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const { _id } = currentUser;
    return userRequestAxios
      .get(`/api/posts?likes=${_id}`)
      .then((response) => response.data);
  };

  // Create a new post
  const createPost = (post) => {
    return userRequestAxios
      .post('/api/posts/', post)
      .then((response) => response.data);
  };

  // Update post
  const updatePost = (postId, updatedPost) => {
    return userRequestAxios
      .put(`/api/posts/${postId}`, updatedPost)
      .then((response) => response.data);
  };

  // Delete post
  const deletePost = (postId) => {
    return userRequestAxios
      .delete(`/api/posts/${postId}`)
      .then((response) => response.data);
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
    return userRequestAxios
      .post(`/api/posts/${postId}/comments`, comment)
      .then((response) => response.data);
  };

  // Like post
  const likePost = (postId) => {
    return userRequestAxios
      .put(`/api/posts/${postId}/like`)
      .then((response) => response.data);
  };

  // Delete Like
  const deleteLike = (postId) => {
    return userRequestAxios
      .delete(`/api/posts/${postId}/like`)
      .then((response) => response.data);
  };

  const getLikePost = (postId) => {
    return userRequestAxios
      .get(`/api/posts/${postId}/like`)
      .then((response) => response.data);
  };

  const getTags = () => {
    return userRequestAxios.get(`/api/tags/`).then((response) => response.data);
  };

  const getPostsByTag = (tag) => {
    return userRequestAxios
      .get(`/api/posts?tags[regex]=${tag}`)
      .then((response) => response.data);
  };

  return (
    <RequestContext.Provider
      value={{
        getPopularPosts,
        getNewPosts,
        getCurrentUserPosts,
        getUsersLikedPosts,
        createPost,
        likePost,
        deleteLike,
        getLikePost,
        getTags,
        getOnePost,
        createCommentOnPost,
        deletePost,
        updatePost,
        getPostsByTag,
      }}
    >
      {props.children}
    </RequestContext.Provider>
  );
}
