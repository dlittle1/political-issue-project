import React, { useState, useEffect } from 'react';
import Post from './Post';
import './componentStyles/posts.css';
const Posts = (props) => {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    props
      .apiMethod()
      .then((response) => setPosts(response))
      .catch((error) => console.dir(error));
  }, [props]);

  useEffect(() => {
    if (posts) {
      setLoading(false);
    }
  }, [posts]);

  return (
    <div>
      {!loading && (
        <>
          <div className='posts-heading'>
            <h1>{props.title}</h1>
          </div>
          {posts.map((post, index) => (
            <Post {...post} index={index} key={post._id} />
          ))}
        </>
      )}
    </div>
  );
};

export default Posts;
