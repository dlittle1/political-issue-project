import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import '../styles/home.css';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import PopularPosts from './PopularPosts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/pro-solid-svg-icons';

function getWindowWidth() {
  const { innerWidth: width } = window;
  return width;
}

const Home = () => {
  const [sidebarHidden, setSidebarHidden] = useState(true);
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  useEffect(() => {
    function handleResize() {
      setWindowWidth(getWindowWidth());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuClick = () => {
    if (windowWidth < 900) {
      setSidebarHidden((prevState) => !prevState);
    }
  };

  return (
    <div className='home-container'>
      <>
        <div
          className={
            sidebarHidden ? 'home-menu-button' : 'home-menu-button-active'
          }
          onClick={handleMenuClick}
        >
          <FontAwesomeIcon icon={faBars} size='xl' />
        </div>
        <div className={sidebarHidden ? 'home-left-sidebar' : 'home-left-menu'}>
          <LeftSidebar handleMenuClick={handleMenuClick} />
        </div>
        <div className='home-posts-container'>
          {window.location.pathname === '/' ? <PopularPosts /> : <Outlet />}
        </div>
        <div className='home-right-sidebar'>
          <RightSidebar />
        </div>
      </>
    </div>
  );
};

export default Home;
