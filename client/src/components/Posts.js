import React, { useState, useEffect, useContext } from 'react';
import Post from './Post';
import './componentStyles/posts.css';
import { RequestContext } from '../context/RequestProvider';

const Posts = (props) => {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);
  const context = useContext(RequestContext);

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

  const handleDelete = (postId) => {
    context
      .deletePost(postId)
      .then((response) => console.log(response))
      .catch((error) => console.dir(error));

    setPosts((prevState) => prevState.filter((post) => post._id !== postId));
  };

  return (
    <div>
      {!loading && (
        <>
          <div className='posts-heading'>
            <h1>{props.title}</h1>
          </div>
          {posts.map((post, index) => (
            <Post
              {...post}
              index={index}
              key={post._id}
              handleDelete={handleDelete}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Posts;
