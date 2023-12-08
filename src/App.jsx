import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Unauthorized from './pages/Unauthorized';
import Home from './pages/Home';
import EditPost from './pages/EditPost';
import ErrorPage from './pages/ErrorPage';
import NewPost from './pages/NewPost';
import DeletePost from './pages/DeletePost';
import ImageUpload from './pages/ImageUpload';
import ManageComments from './pages/ManageComments';
import { useEffect, useState } from 'react';
import useAuth from './hooks/useAuth';

function App() {
  const { setAuth } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      const foundUser = JSON.parse(storedUser);
      const accessToken = storedToken.replace('Bearer', '');
      setAuth({ user: foundUser, accessToken: accessToken });
    }
    setLoading(false);
  }, [setAuth]);

  // Prevents issue with redirecting to login page on page refresh
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Public routes */}
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='unauthorized' element={<Unauthorized />} />
        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path='/' element={<Home />} />
          <Route path='/edit/:slug' element={<EditPost />} />
          <Route path='/delete/:slug' element={<DeletePost />} />
          <Route path='/new' element={<NewPost />} />
          <Route path='/:slug/comments' element={<ManageComments />} />
          <Route path='/:slug/image' element={<ImageUpload />} />
        </Route>
        {/* Catch all */}
        <Route path='*' element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
