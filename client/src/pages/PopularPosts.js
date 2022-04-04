import React from 'react';
import Posts from '../components/Posts';

const Popular = (props) => {
  return (
    <>
      <Posts title='Popular Posts' apiMethod={'getPopularPosts'} />
    </>
  );
};
export default Popular;
