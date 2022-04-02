import { Outlet } from 'react-router-dom';
import '../styles/home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMemo } from '@fortawesome/pro-solid-svg-icons';
import LeftSidebar from '../components/LeftSidebar';
const Home = () => {
  return (
    <div className='home-container'>
      <>
        <div className='home-left-sidebar '>
          <LeftSidebar />
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
