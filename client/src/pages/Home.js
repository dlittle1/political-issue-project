import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import '../styles/home.css';
import { RequestContext } from '../context/RequestProvider';

const Home = () => {
  const requestContext = useContext(RequestContext);
  const { getPopularPosts } = requestContext;
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPopularPosts().then((response) => setPosts(response));
  }, []);

  useEffect(() => {
    if (posts) {
      setLoading(false);
    }
  }, [posts]);
  return (
    <div className='home-container'>
      {!loading && (
        <>
          <div className='home-left-sidebar'>
            <ul>
              <li>Create New Post</li>
              <li>View Your Posts</li>
              <li></li>
            </ul>
          </div>
          <div className='home-posts-container'>
            {posts.map((post, index) => (
              <div key={index}>
                <h1>{post.title}</h1>
                <h2>{post.description}</h2>
                <p>{post.likes.length}</p>
                {post.tags.map((tag, index) => (
                  <li key={index + tag}>{tag}</li>
                ))}
              </div>
            ))}
          </div>
          <div className='home-right-sidebar'>tags</div>
        </>
      )}
    </div>
  );
};

export default Home;
