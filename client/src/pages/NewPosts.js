import React from 'react';
import Posts from '../components/Posts';

const NewPosts = () => {
  return (
    <>
      <Posts title='New Posts' apiMethod={'getNewPosts'} />
    </>
  );
};

export default NewPosts;
