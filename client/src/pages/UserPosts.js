import React, { useContext } from 'react';
import Posts from '../components/Posts';
import { RequestContext } from '../context/RequestProvider';
import { UserContext } from '../context/UserProvider';
const UserPosts = () => {
  const requestContext = useContext(RequestContext);
  const userContext = useContext(UserContext);
  const { getCurrentUserPosts } = requestContext;
  const { username } = userContext;

  return (
    <>
      <Posts title={`${username}'s Posts`} apiMethod={getCurrentUserPosts} />
    </>
  );
};
export default UserPosts;