import React, { useContext } from 'react';
import Posts from '../components/Posts';
import { UserContext } from '../context/UserProvider';
const UserPosts = () => {
  const userContext = useContext(UserContext);
  const { user } = userContext;

  return (
    <>
      <Posts
        title={`${user.username}'s Posts`}
        apiMethod={'getCurrentUserPosts'}
      />
    </>
  );
};
export default UserPosts;
