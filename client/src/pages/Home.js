import React, { useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  useEffect(() => {
    axios
      .get('/api/posts')
      .then((response) => console.log(response.data))
      .catch((err) => console.dir(err));
  }, []);
  return <div>Home</div>;
};

export default Home;
