import React, { useEffect, useContext, useState } from 'react';
import Posts from '../components/Posts';
import { RequestContext } from '../context/RequestProvider';
const Popular = (props) => {
  const requestContext = useContext(RequestContext);
  const { getPopularPosts } = requestContext;

  return (
    <>
      <Posts title='Popular Posts' apiMethod={getPopularPosts} />
    </>
  );
};
export default Popular;
