import React, { useContext } from 'react';
import Posts from '../components/Posts';
import { RequestContext } from '../context/RequestProvider';
const UserPosts = () => {
  const requestContext = useContext(RequestContext);
  const { getUsersLikedPosts } = requestContext;

  return (
    <>
      <Posts title={`Your Liked Posts`} apiMethod={getUsersLikedPosts} />
    </>
  );
};
export default UserPosts;
