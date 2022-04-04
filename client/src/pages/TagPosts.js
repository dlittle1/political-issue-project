import React from 'react';
import { useParams } from 'react-router-dom';
import Posts from '../components/Posts';

const TagPosts = () => {
  const params = useParams();

  return (
    <>
      <Posts
        title={`#${params.tagId}`}
        apiMethod={'getPostsByTag'}
        params={params.tagId}
      />
    </>
  );
};

export default TagPosts;
