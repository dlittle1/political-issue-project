import { Outlet } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  return (
    <div className='home-container'>
      <>
        <div className='home-left-sidebar'>
          <ul className='home-left-sidebar-user-options'>
            <li className='home-left-sidebar-post-option'>Top Posts</li>
            <li className='home-left-sidebar-post-option'>New Posts</li>
            <li className='home-left-sidebar-post-option'>Filter Posts</li>
            <hr />
            <li>Create New Post</li>
            <li>View Your Posts</li>
            <li></li>
          </ul>
        </div>
        <div className='home-posts-container'>
          <Outlet />
        </div>
        <div className='home-right-sidebar'>tags</div>
      </>
    </div>
  );
};

export default Home;
