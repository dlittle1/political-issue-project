import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Popular from './pages/PopularPosts';
import { UserContext } from './context/UserProvider';
import NewPosts from './pages/NewPosts';
import UserPosts from './pages/UserPosts';
import UsersLikedPosts from './pages/UsersLikedPosts';
import PostPage from './pages/PostPage';

function App() {
  const { token } = useContext(UserContext);
  return (
    <Routes>
      <Route
        path='/'
        element={
          token ? <Navigate replace to='/home/popular' /> : <LandingPage />
        }
      />
      <Route
        path='/signup'
        element={
          token ? <Navigate replace to='/home/popular' /> : <LandingPage />
        }
      />
      <Route element={<Navbar />}>
        <Route
          path='/home'
          element={!token ? <Navigate replace to='/' /> : <Home />}
        >
          <Route path='/home/popular' element={<Popular />} />
          <Route path='/home/new' element={<NewPosts />} />
          <Route path='/home/user/posts' element={<UserPosts />} />
          <Route path='/home/likes' element={<UsersLikedPosts />} />
          <Route path='/home/posts/:postId' element={<PostPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
