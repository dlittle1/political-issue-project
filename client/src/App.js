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
import PostForm from './pages/PostForm';
import TagPosts from './pages/TagPosts';

function App() {
  const { token } = useContext(UserContext);
  return (
    <Routes>
      <Route
        path='/login'
        element={token ? <Navigate replace to='/popular' /> : <LandingPage />}
      />
      <Route
        path='/signup'
        element={token ? <Navigate replace to='/popular' /> : <LandingPage />}
      />
      <Route element={<Navbar />}>
        <Route
          path='/'
          element={!token ? <Navigate replace to='/login' /> : <Home />}
        >
          <Route path='/popular' element={<Popular />} />
          <Route path='/new' element={<NewPosts />} />
          <Route path='/user/posts' element={<UserPosts />} />
          <Route path='/likes' element={<UsersLikedPosts />} />
          <Route path='/posts/new' element={<PostForm />} />
          <Route path='/posts/edit/:postId' element={<PostForm />} />
          <Route path='/posts/:postId' element={<PostPage />} />
          <Route path='/posts/tags/:tagId' element={<TagPosts />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
