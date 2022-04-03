import { Outlet } from 'react-router-dom';
import '../styles/home.css';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
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
        <div className='home-right-sidebar'>
          <RightSidebar />
        </div>
      </>
    </div>
  );
};

export default Home;
