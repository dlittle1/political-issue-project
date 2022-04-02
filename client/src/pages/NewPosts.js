import React, { useContext } from 'react';
import Posts from '../components/Posts';
import { RequestContext } from '../context/RequestProvider';

const NewPosts = () => {
  const requestContext = useContext(RequestContext);
  const { getNewPosts } = requestContext;

  return (
    <>
      <Posts title='New Posts' apiMethod={getNewPosts} />
    </>
  );
};

export default NewPosts;
