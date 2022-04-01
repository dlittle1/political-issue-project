import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { UserContext } from './context/UserProvider';

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
        <Route path='/home' element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
