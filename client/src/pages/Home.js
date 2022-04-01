import React, { useEffect, useContext, useState } from 'react';
import '../styles/home.css';
import { RequestContext } from '../context/RequestProvider';
import Post from '../components/Post';

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
            <div className='home-heading'>
              <h1>Top Posts</h1>
            </div>
            {posts.map((post, index) => (
              <Post {...post} index={index} key={post._id} />
            ))}
          </div>
          <div className='home-right-sidebar'>tags</div>
        </>
      )}
    </div>
  );
};

export default Home;
