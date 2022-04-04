import React from 'react';
import Posts from '../components/Posts';

const UserPosts = () => {
  return (
    <>
      <Posts title={`Your Liked Posts`} apiMethod={'getUsersLikedPosts'} />
    </>
  );
};
export default UserPosts;
