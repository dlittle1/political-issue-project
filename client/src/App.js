import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Popular from './pages/PopularPosts';
import { UserContext } from './context/UserProvider';
import NewPosts from './pages/NewPosts';
import UserPosts from './pages/UserPosts';

function App() {
  const { token } = useContext(UserContext);
  return (
    <Routes>
      <Route
        path='/'
        element={token ? <Navigate replace to='/home' /> : <LandingPage />}
      />
      <Route
        path='/signup'
        element={token ? <Navigate replace to='/home' /> : <LandingPage />}
      />
      <Route element={<Navbar />}>
        <Route
          path='/home'
          element={!token ? <Navigate replace to='/' /> : <Home />}
        >
          <Route path='/home/popular' element={<Popular />} />
          <Route path='/home/new' element={<NewPosts />} />
          <Route path='/home/user/posts' element={<UserPosts />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
